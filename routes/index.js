var express = require('express');
var multer=require('multer');
var cloudinary = require('../config/cloudinary');
var router = express.Router();
var shemauser=require('../model/ShemaUsuario');
var shemarticulo=require('../model/ShemaArticulo');
var shemacoment=require('../model/ShemaComentario');
var entra=true;
var html="";
var value="";
var datacoments="";
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var nameimage="" ;
var titlePage=
{
  Inicio:"BLOGJS",
  Login:"Login",
  LoginUp:"loginup",
  count:"Admin BlogJS",
  listall:"Articulos",
  articlenew:"Nuevo Articulo",
  articledown:"Articulos inactivos",
  updateart:"Actualizar Articulo",
  about:"About",
  Contacto:"Contacto"
}


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
     var tipo=file.mimetype;
     console.log(file.originalname);
 if(tipo=='image/png' || tipo=='image/jpg' || tipo=='image/jpeg')
 {
  /*console.log(file.originalname);*/
    callback(null, './public/uploads/');
 }

     
    
  },
  filename: function (req, file, callback) {
      nameimage=file;
    callback(null, file.originalname);
  }
});

function getFecha(Art,meses) {
   for (var i = 0; i <Art.length; i++) 
   {
    /*
  1/1/2016
  1/11/2016
  15/1/2016
  15/11/2016
*/

          var dia=Art[i].Fecha.substring(0,2);
          var mes=Art[i].Fecha.substring(3,5);
          var anio=Art[i].Fecha.substring(6,10);
          if(dia.substring(1,2)=="/")
          {
            dia=dia.substring(0,1);
            if(mes.substring(3,4)!="/")
            {
            mes=Art[i].Fecha.substring(2,3);
            anio=Art[i].Fecha.substring(4,8);
            }
            else
            {
            mes=Art[i].Fecha.substring(2,4);
            anio=Art[i].Fecha.substring(5,9);
            }
            
          }
          
          else if(mes.substring(3,4)!="/")
          {
            dia=dia.substring(0,2);
            mes=Art[i].Fecha.substring(3,4);
            anio=Art[i].Fecha.substring(5,9);
          }


          var Fecha=dia+" de "+meses[mes-1]+" del "+anio
          Art[i].Fecha=Fecha;
   }

}
/* GET home page. */
router.get('/', function(req, res, next) {
      var sessions=req.session.iduser;

      if(sessions)
      {
        shemarticulo.Articulo.find({Usuario:sessions,Estado:0},function(err,Art) {

          shemauser.Usuario.find({_id:sessions},function(err,User){
            getFecha(Art,meses);
            res.render('articulo/listall', { title: titlePage.Inicio,Articulos:Art,valse:sessions,Usuario:User});
          });
           
        });
      }
      else
      {
        shemarticulo.Articulo.find({Estado:0}, function(err,Art) {
           getFecha(Art,meses);
         res.render('welcome/index', { title: titlePage.Inicio,Articulos:Art,valse:sessions});

        });
      }
});

//Ruta de Login
router.get('/login', function(req, res, next) {
  var sessions=req.session.iduser;
          shemauser.Usuario.find({_id:sessions},function(err,User){
            res.render('usuario/login', { title: titlePage.Login,valse:sessions,User:User});
          });
});

//Ruta de Logout
router.get('/logouts', function(req, res, next) {

  req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
      shemarticulo.Articulo.find({Estado:0}, function(err,Art) {
            res.render('usuario/login', { title: titlePage.Inicio,Articulos:Art});

     });
  }
});

 
});

//Logeando usuario
router.post('/login/count', function(req, res, next) {
 var sessions=req.session.iduser;

  shemauser.Usuario.find({Usuario:req.body.user,Password:req.body.pasword},function(err,usuario) {
     if(usuario.length!=0)
     {

     	//console.log(usuario);
     req.session.iduser=usuario[0]._id;
     var sessions=req.session.iduser; 
     var iduser=req.session.iduser;
     if(sessions)
      {
       
      shemarticulo.Articulo.find({Usuario:iduser,Estado:0},function(err,Art) {

        shemauser.Usuario.find({_id:iduser},function(err,User){
          getFecha(Art,meses);
            res.render('articulo/listall', { title: titlePage.count,Articulos:Art,valse:sessions,Usuario:User});
          });
      });
     	 
      }
      else
       {
          shemauser.Usuario.find({_id:iduser},function(err,User){
              getFecha(Art,meses);
            res.render('/', { title: titlePage.count,valse:sessions,User:User});
          });
       }
     }
     else{
          shemauser.Usuario.find({_id:sessions},function(err,User){
             //getFecha(Art,meses);
            res.render('usuario/login', { title: titlePage.Login,valse:sessions,User:User});
          });
         }

  });
 
});


//Ruta de LoginUp
router.get('/login/new', function(req, res, next) {
  var sessions=req.session.iduser; 
    shemauser.Usuario.find({_id:sessions},function(err,User){
    res.render('usuario/loginup', { title: titlePage.LoginUp,valse:sessions,User:User});
  });

});

router.post('/login/save',multer({ storage : storage}).single('PhotoUser'), function(req, res, next) {
var datass="./public/uploads/"+nameimage.originalname;

var sessions=req.session.iduser; 

 cloudinary.uploader.upload(datass, function(result) { 
  var data={
	Nombre:req.body.nombre,
  	Apellido:req.body.apellido,
  	Usuario:req.body.usuario,
  	Password:req.body.pasword,
    Photo:result.url //"../../images/Photo.jpg" /*Falta Cargar la Foto desde el controlador*/
  }
  console.log(result);

  var Usuariodata=new shemauser.Usuario(data);


  Usuariodata.save(function(err)
  {
  	if(!err)
  	{
		console.log(Usuariodata);
     shemauser.Usuario.find({_id:sessions},function(err,User){
       res.render('usuario/login', { title: titlePage.Login,valse:sessions,User:User});
     });
  	}
  	else
  	{
     shemauser.Usuario.find({_id:sessions},function(err,User){
       res.render('usuario/loginup', { title: titlePage.LoginUp,valse:sessions,User:User});
     });
  	}
  		
  });

});
  
});

//Find by id Articulo
router.get('/article/design/:id', function(req, res, next) {


var sessions=req.session.iduser; 

   
  shemarticulo.Articulo.find({_id:req.params.id,Estado:0},function(err,Art) {
  getFecha(Art,meses);
    
  shemacoment.Comentario.find({Articulo:req.params.id},function(err,coment) {

       
        //var fecha=f.getDay() + " de " + (f.getMonth() + 1) + "/" + f.getFullYear();

        if(sessions)
        {
         shemauser.Usuario.find({_id:sessions},function(err,User){
          var datahtml=iterahtml(coment,User,req);
          console.log(User);
         res.render('articulo/design1', { title: titlePage.listall,Article: Art,coment: datahtml,valse:sessions,Usuario:User});
       });

        }
        else
        {
         shemauser.Usuario.find({_id:Art[0].Usuario},function(err,User){
          var datahtml=iterahtml(coment,User,req);

         res.render('articulo/design1', { title: titlePage.listall,Article: Art,coment: datahtml,valse:sessions,Usuario:User});

        });
        }

      html="";
     });

         // getFecha(Art,meses);
  

  });



   



  
});


   var iterahtml= function (Comentarios,Usarios,request)
   {
    
    Comentarios.forEach(function(com) {
      var id="";


      html=html+"<div id='comentarios'>";
      html=html+"<div class='row'>";
      html=html+"<div class='col-md-1'></div>";
      html=html+"<div class='col-md-4'>";
      html=html+"<div class='row'>";
      html=html+"<div class='col-sm-3 contsmall'>";
      html=html+"<img class='imagautor' src='http://res.cloudinary.com/gedgonz/image/upload/v1457199149/iconcoment3_ht4e4a.png'>";
      html=html+"</div>";
      html=html+"<div class='col-sm-6'>";
      html=html+"<h4 id='nucoment'> "+com.Nombre+"</h4>";
      html=html+"</div>";
      html=html+"</div>";
      html=html+"<div class='row'>";
      html=html+"<div class='col-sm-3'>";
      html=html+"</div>";
      html=html+"<div class='col-sm-6'>";
      html=html+"<p id='formatcoment'>"+com.Comentario+"</p>";
      html=html+"</div>";
      html=html+"<div class='col-sm-3'>";
      html=html+"<p class='linkhide' onClick=\"imprimir('"+com._id+"');\" type='submit'> <span id='iconchange"+com._id+"' class='glyphicon glyphicon-menu-down'></span></p>";
      html=html+"</div>";
      html=html+"<br>";
      html=html+"<br>";
      html=html+"</div>";
      html=html+"<div id='Formcoment"+com._id+"' class='Formcoment'>";
      html=html+"<div class='row'>";
      html=html+"<form (action='/articulo/#{Articulo[0]._id}/coment/save/0/0' method='post')>";
      html=html+"<div class='col-md-12'>";
      html=html+"<div class='form-group'>";
      if(request.session.iduser)
      {
       html=html+"<input name='nombre' class='form-control' type='text' readonly='readOnly' placeholder='Nombre' value='"+Usarios[0].Nombre+" "+Usarios[0].Apellido+"' />";
      }
      else
      {
       html=html+"<input name='nombre' class='form-control' type='text' placeholder='Nombre'/>";
      }  

      html=html+"<textarea name='comentario' class='form-control' type='text' placeholder='Comentario'/>";
      html=html+"</div>";
      html=html+"<div class='form-group'>";
      html=html+"<button class='btn btn-default' onClick='imprimir();'> Enviar</button>";
      html=html+"</div>";
      html=html+"</div>";
      html=html+"</div>";
      html=html+"</div></div>";
      html=html+"<div class='col-md-4'></div>";
      html=html+"<div class='col-md-3'></div>";  
      html=html+"</form>";  
      html=html+"</div>";
      html=html+"<hr style='color: black; background-color: black; width:100%;'/>";

      var datos="";

      /*
      shemacoment.Comentario.find({Articulo:'56e83116d6b61a482b607676',Padre:com.id},function(err,coment) {

        if(coment.length>0)
        {  console.log("cantidad: "+coment.length);

          iterahtml(coment);
        }
       
      });
*/
      html=html+"</div>";

    });


   return html;
   }

   function subcoment(idcoment)
   {
    
    shemacoment.Comentario.find({_id:idcoment},function(err,coment) {
      datacoments=coment

     
   });
     return datacoments;
   }

//save coment
router.post('/articulo/:id/coment/save/:padre/:tipo', function(req, res, next) {

    var sessions=req.session.iduser; 
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    var f=new Date();
    
    var fecha=f.getDay() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    console.log("Fecha: "+fecha);
//shemacoment
    var data={
      Nombre: req.body.nombre,
      Comentario: req.body.comentario,
      Fecha: fecha,
      Padre: req.params.padre,
      Tipo: req.params.tipo,
      Articulo: req.params.id
    }

    var Comentdata=new shemacoment.Comentario(data);

    Comentdata.save(function(err)
    {
       console.log(Comentdata);
        if(!err)
        {

            shemarticulo.Articulo.find({_id:req.params.id,Estado:0},function(err,Art) {
                getFecha(Art,meses);
                  
                shemacoment.Comentario.find({Articulo:req.params.id},function(err,coment) {

                     
                      //var fecha=f.getDay() + " de " + (f.getMonth() + 1) + "/" + f.getFullYear();

                      if(sessions)
                      {
                       shemauser.Usuario.find({_id:sessions},function(err,User){
                        var datahtml=iterahtml(coment,User,req);
                       res.render('articulo/design1', { title: titlePage.listall,Article: Art,coment: datahtml,valse:sessions,usuario:User});
                     });

                      }
                      else
                      {
                       shemauser.Usuario.find({_id:Art[0].Usuario},function(err,User){
                        var datahtml=iterahtml(coment,User,req);

                       res.render('articulo/design1', { title: titlePage.listall,Article: Art,coment: datahtml,valse:sessions,usuario:User});

                      });
                      }

                    html="";
                   });

                       // getFecha(Art,meses);
                

                });



           
           


        }
        else
        {
           shemauser.Usuario.find({_id:sessions},function(err,User){
            res.render('welcome/index', { title: titlePage.Login,valse:sessions,User:User});
           });
        }
    });




  
});


//New Articulo
router.get('/articulo/new', function(req, res, next) {
  var sessions=req.session.iduser; 
  if(req.session.iduser)
  {
    shemauser.Usuario.find({_id:sessions},function(err,User){
      res.render('articulo/new', { title: titlePage.articlenew,valse:sessions,Usuario:User});
     });

  }
  else
  {
     shemauser.Usuario.find({_id:sessions},function(err,User){
      res.render('usuario/login', { title: titlePage.articlenew,valse:sessions,Usuario:User});
     });
  }
  
});

//save Articulo
router.post('/articulo/save',multer({ storage : storage}).single('portada'), function(req, res, next) {

  
  var date=new Date();
  var fecha=date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear()
  var idusuario=req.session.iduser;
  var datass="./public/uploads/"+nameimage.originalname;
  cloudinary.uploader.upload(datass, function(result) { 
  console.log(result.url) 
  
  var data={
  	Titulo:req.body.Titulo,
  	Autor:req.body.Autor,
  	Descripcion:req.body.Descripcion,
  	Cuerpo:req.body.Cuerpo.replace(new RegExp('\n','g'), '<br />').replace(new RegExp('\r','g'), ''),
  	Fecha:fecha,
  	Portada:result.url,
    Estado:0,
  	Usuario:idusuario
  }

  var Articulodata=new shemarticulo.Articulo(data);
  var valupdate=req.body.updateart;
  //console.log(Articulodata);
   if(valupdate)
   {
    shemarticulo.Articulo.find({_id:valupdate,Estado:0},function(err,Art) {

            Art[0].Titulo=req.body.Titulo;
            Art[0].Autor=req.body.Autor;
            Art[0].Descripcion=req.body.Descripcion;
            Art[0].Cuerpo=req.body.Cuerpo.replace(new RegExp('\n','g'), '<br />').replace(new RegExp('\r','g'), '').replace(new RegExp('<br/>','g'),'');
            Art[0].Fecha=fecha;
            console.log(result.url);
            if(result.url)
            {
              console.log("Entra en Condicion");
              Art[0].Portada=result.url;//Falta agregar de Cloudynari
            }
            Art[0].Estado=0;
            Art[0].Usuario=idusuario;
            Art[0].save(function(err)
            {
              if(!err)
              {
              //console.log(Articulodata);
                   shemauser.Usuario.find({_id:idusuario},function(err,User){

                res.render('articulo/new', { title: titlePage.articlenew,valse:idusuario ,Usuario:User});
               });

              }
              else
              {
                     shemauser.Usuario.find({_id:idusuario},function(err,User){
                res.render('welcome/index', { title: titlePage.count,valse:idusuario,Usuario:User});
               });
              }
                
             });
    });
   }
   else
   {
  
      Articulodata.save(function(err)
      {
        if(!err)
        {
        //console.log(Articulodata);
          shemauser.Usuario.find({_id:idusuario},function(err,User){

          res.render('articulo/new', { title: titlePage.articlenew,valse:idusuario ,Usuario:User});

         });

        }
        else
        {
               shemauser.Usuario.find({_id:idusuario},function(err,User){
          res.render('welcome/index', { title: titlePage.count,valse:idusuario,Usuario:User});
         });
        }
          
        });
   }

  });
  datass="";
  nameimage="";
  console.log("Se limpiaron las variables");
});


//Update Articulo
router.get('/articulo/update/:id', function(req, res, next) {
  var idusuario=req.session.iduser;
  shemarticulo.Articulo.find({_id:req.params.id,Estado:0},function(err,Art) {
      shemauser.Usuario.find({_id:idusuario},function(err,User){
        console.log(Art[0].Cuerpo);
        Art[0].Cuerpo=Art[0].Cuerpo.replace(new RegExp('\n','g'), '<br />').replace(new RegExp('\r','g'), '').replace(new RegExp('<br />','g'),'');
        console.log(Art[0].Cuerpo);
        res.render('articulo/new', { title: titlePage.articlenew,Articulo: Art,valse:idusuario,Usuario:User});
     });

  });
  
});


//below Articulo
router.get('/articulo/below/:id/:estado', function(req, res, next) {
  var idusuario=req.session.iduser;
  shemarticulo.Articulo.find({_id:req.params.id,Estado:req.params.estado},function(err,Art) {

      if(req.params.estado > 0)
      {
        Art[0].Estado=0;
      }
      else
      {
        Art[0].Estado=1;
      }
      

      shemauser.Usuario.find({_id:idusuario},function(err,User){

            Art[0].save(function(err)
            {
              if(!err)
              {
              //console.log(Articulodata);
              shemarticulo.Articulo.find({Usuario:idusuario,Estado:0},function(err,Arts) {
                   shemauser.Usuario.find({_id:idusuario},function(err,User){
               res.render('articulo/listall', { title: titlePage.listall,Articulos:Arts,valse:idusuario,Usuario:User});     

               });
              });
              }
              else
              {
                     shemauser.Usuario.find({_id:idusuario},function(err,User){
                res.render('/', { title: titlePage.count,Articulos:Art,valse:sessions,Usuario:User});      
               });
              }
                
            });     

     });

  });
  
});

//inactivos Articulo
router.get('/articulo/inactivos', function(req, res, next) {
  var idusuario=req.session.iduser;
  shemarticulo.Articulo.find({Usuario:idusuario,Estado:1},function(err,Art) {


      shemauser.Usuario.find({_id:idusuario},function(err,User){
          
            res.render('articulo/listall', { title: titlePage.listall,Articulos:Art,valse:idusuario,Usuario:User,estado:true});     

     });

  });
  
});


//About
router.get('/welcome/about', function(req, res, next) {
  res.render('welcome/about', { title: titlePage.about});     

});


//About
router.get('/welcome/contacto', function(req, res, next) {
  res.render('welcome/contacto', { title: titlePage.Contacto});     

});
entra=true;
module.exports = router;
