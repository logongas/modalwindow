ModalWindow
===========

Ampliación del widget de JQuery UI Dialog. 

Funcionalidades:
  * Carga de página HTML completas mediante un iframe
  * Paso de paŕametros a la ventana modal
  * Valores de retorno de la ventana modal
  * Establecimiento del tamaño de la ventana desde la propia ventana modal
  * Soporte de varias ventanas anidadas

¿Porqué aumentar la funcionalidad del componente Dialog de JQuery UI?
El componente Dialog está pensado para crear ventanas modales usando un div del própio código HTML de la página. 
Esta opción tiene la desventaja de ser más complicado que dos personas trabajen a la vez en la página original y en la ventana modal. 

Las desventajas de usar un div como ventana modal son:
  * Es necesario que el documento original incluya el JavaScript que necesita la ventana modal
  * Es necesario que el documento original incluya el CSS que necesita la ventana modal
  * Es necesario sincronizar los id de los tag html para que no se repitan en el documento original y la ventana modal
  * Es necesario sincronizar las clases CSS para que no se repitan en el documento original y la ventana modal
  * Es necesario sincronizar el código JavaScript para que no haya variables, funciones ,etc repetidas en el documento original y la ventana modal 
  * El código suele estar en la misma página lo que dificulta la reutilización de la ventana modal en otras páginas

Todos estas desventajas pueden mas o menos solucionarse pero aun así resulta un engorro el hacerlo.

Si tenemos dos páginas HTML independientes como documento original y como ventana modal se solucionan todas las desventajas anteriores aunque se generan nuevos problemas:
  * Desde una ventana modal si lanzamos otra, se queda *dentro* de ella
  * Desde la ventana modal es complejo compartir datos JavaScript con el documento original.
  * Desde un iframe hay controles que no funcionan correctamente.

Para solucionar los 2 primeros problemas se ha creado éste proyecto.

Documentación
-------------

Para usar la ventana modal deberemos crear un objeto ModalWindow y llamar a su método "load".
```javascript
var modalwindow=new ModalWindow("modal1.html","dato a enviar",function(success,returnValue) {
  if (success==true) {
      alert("La ventana se cerró con el botón de Aceptar y retornó el valor de \n"+returnValue);
  } else {
      alert("La ventana se cerró con el botón de Cancelar");
  }
});
modalwindow.load();
```

Como vemos estamos creando una ventana modal a partir de la página "modal1.html", le estamos pasando como parámetro a dicha ventana modal el valor "dato a enviar" y hemos creado una función anónima para saber cuando se ha cerrado la ventana.

La función de callback que se llama cuando se cierra la ventana tiene dos argumentos:
  * success: Booleano que valdrá `true` si la ventana se cerró con el botón "Aceptar" o false si se cerró con el botón "Cancelar" o el aspa de la ventana.
  * returnValue: En caso de que la ventana retorne `true` , este argumento contendrá la información que quiere devolver la ventana modal a la ventana original.

Desde la ventana modal deberemos incluir el siguiente código JavaScript
```javascript
$(function() {
    var currentModalWindow=ModalWindow.getCurrent();
    alert("La ventana que nos llamó nos pasó el valor:\n"+currentModalWindow.getParam());

    currentModalWindow.show({
        title:"Título de la ventana modal1.html con id="+Math.random(),
        width:600,
        height:200
    });


    jQuery("#btnAceptar").on("click",function() {
        currentModalWindow.close(true,"Valor a retornar a la ventana que nos llamó");
    })
    jQuery("#btnCancelar").on("click",function() {
        currentModalWindow.close(false);
    })

})
```

Obtenemos la información de nuestra ventana modal usando el método `ModalWindow.getCurrent()` una vez tenemos la variable a la ventana modal usaremos los siguiente métodos:
  * show: Se debe llamar en el evento "onload" de la página para que se muestre la ventana modal. Le pasaremos un objeto con las siguientes propiedades:
    * title: String con el título de la ventana modal
    * width: Entero con el ancho de la ventana modal
    * height: Entero con el alto de la ventana modal.
  * close: Se llamará para cerrar la ventana modal. Este método tiene 2 argumentos:
    * success: Booleano para indicar si la ventana ventana modal se cierra con el botón *Aceptar* o *Cancelar*. La aplicación es la responsable de decidir cuando retornar un valor u otro. 
    * returnValue: Es el valor que queremos devolver a la ventana que nos llamó.

Dependencias
------------
ModalWindow necesita de [jQuery](http://jquery.com/) y [jQuery UI](http://jqueryui.com/) para funcionar.
En caso de tener una versión personalizada de [jQuery UI](http://jqueryui.com/) será necesario que esté incluido al menos lo siguiente:
  * Interacción *"Draggable"*
  * Widget *"Dialog"*
  * Core *"Position"*

Instalación
-----------
Para funcionar la ventana modal deberemos cargar el fichero JavsScript `Modalwindow.js` junto a [jQuery](http://jquery.com/) y [jQuery UI](http://jqueryui.com/)
```
<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.9.2.js"></script>  
<script type="text/javascript" src="js/modalwindow.js"></script>  
```

Tambien será necesario incluir el tema de [jQuery UI](http://jqueryui.com/) cargando el css correspondiente.
