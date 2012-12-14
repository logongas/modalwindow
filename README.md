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
