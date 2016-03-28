var express = require('express');
var router = express.Router();
var shemauser=require('../model/ShemaUsuario');
var shemarticulo=require('../model/ShemaArticulo');
var shemacoment=require('../model/ShemaComentario');
var html="";
var value="";
var datacoments="";

/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('welcome/index', { title: 'BlogJS' });
});

//Ruta de Login
router.get('/login', function(req, res, next) {
  res.render('usuario/login', { title: 'BlogJS' });
});

//Logeando usuario
router.post('/login/count', function(req, res, next) {


  shemauser.Usuario.find({Usuario:req.body.user,Password:req.body.pasword},function(err,usuario) {
     if(usuario.length!=0)
     {

     	//console.log(usuario);
     req.session.iduser=usuario[0]._id;
     var iduser=req.session.iduser;
     if(iduser)
      {
       
      shemarticulo.Articulo.find({Usuario:iduser},function(err,Art) {
         res.render('articulo/listall', { title: 'BlogJS',Articulos:Art });
      });
     	 
      }
      else
       {
       res.render('/', { title: 'BlogJS' });
       }
     }
     else{res.render('usuario/login', { title: 'BlogJS' });}

  });
 
});


//Ruta de LoginUp
router.get('/login/new', function(req, res, next) {
  res.render('usuario/loginup', { title: 'BlogJS' });
});

router.post('/login/save', function(req, res, next) {


  var data={
	Nombre:req.body.nombre,
  	Apellido:req.body.apellido,
  	Usuario:req.body.usuario,
  	Password:req.body.pasword
  }

  var Usariodata=new shemauser.Usuario(data);


  Usariodata.save(function(err)
  {
  	if(!err)
  	{
		console.log(Usariodata);
  		res.render('usuario/login', { title: 'BlogJS' });
  	}
  	else
  	{
  		res.render('usuario/loginup', { title: 'BlogJS' });
  	}
  		
  });


  
});

//Find by id Articulo
router.get('/articulo/design/:id', function(req, res, next) {
  
	 //console.log(req.params.id);
   //var html=html();
	shemarticulo.Articulo.find({_id:req.params.id},function(err,Art) {

  shemacoment.Comentario.find({Articulo:req.params.id},function(err,coment) {

    var datahtml=iterahtml(coment);
    res.render('articulo/design1', { Articulo: Art, comentarios: datahtml});
    html="";
   });

  });



  
});


   var iterahtml= function (Comentarios)
   {
    
    Comentarios.forEach(function(com) {
      var id="";
     
       console.log("Entra con id: "+com.Nombre);
      
      html=html+"<div id='comentarios'>";
      html=html+"<div class='row'>";
      html=html+"<div class='col-md-1'></div>";
      html=html+"<div class='col-md-4'>";
      html=html+"<div class='row'>";
      html=html+"<div class='col-sm-3 contsmall'>";
      html=html+"<img class='imagautor' src='https://platzi.com/blog/wp-content/authors/Juan%20Castro-95.jpg'>";
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
      html=html+"<input name='nombre' class='form-control' type='text' placeholder='Nombre'/>";
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
          
          res.render('articulo/design1', {title: 'BlogJS'});
        }
        else
        {
          res.render('welcome/index', { title: 'BlogJS' });
        }
    });




  
});


//New Articulo
router.get('/articulo/new', function(req, res, next) {
  if(req.session.iduser)
  {
    res.render('articulo/new', { title: 'BlogJS', title: 'BlogJS' });
  }
  else
  {
     res.render('usuario/login');
  }
  
});

//save Articulo
router.post('/articulo/save', function(req, res, next) {
  

  var date=new Date();
  var fecha=date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear()
  var idusuario=req.session.iduser;
  var data={
  	Titulo:req.body.Titulo,
  	Autor:req.body.Autor,
  	Descripcion:req.body.Descripcion,
  	Cuerpo:req.body.Cuerpo.replace(new RegExp('\n','g'), '<br />').replace(new RegExp('\r','g'), ''),
  	Date:fecha,
  	Portada:"Portada.png",
  	Usuario:idusuario
  }

  var Articulodata=new shemarticulo.Articulo(data);

  console.log(Articulodata);

  Articulodata.save(function(err)
  {
  	if(!err)
  	{
		console.log(Articulodata);
  		res.render('articulo/new', { title: 'BlogJS' });
  	}
  	else
  	{
  		res.render('welcome/index', { title: 'BlogJS' });
  	}
  		
  });

  
});

module.exports = router;
