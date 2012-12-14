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
=============

Para usar la ventana modal deberemos crear un objeto ModalWindow y llamar a su método "load".
```
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
