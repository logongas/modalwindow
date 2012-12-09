/*
 * Copyright 2012 Lorenzo González.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Crea una nueva instancia de la ventana modal
 * @param {String} url La URL con la página a cargar en la ventana modal
 * @param {Object} param Parametro a pasar a la ventana modal
 * @param {Function} onCloseCallback Función que se llamará al cerrar la ventana.
 * La función se llamará con los parámetros <code>success</code> y <code>returnValue</code>
 * @constructor
 */
function  ModalWindow(url,param,onCloseCallback) {
    this.url=url;
    this.param=param;
    this.onCloseCallback=onCloseCallback;
    this.success=false;
    this.returnValue=null;
}

/**
 * Carga el contenido de la ventana modal pero no la muestra. 
 * Es obligatorio llamar a este método para que se carge la página de la ventana.
 * Al llamar a este método no se muestra la página.
 * Para mostrar la página se debe llamar al método <code>show</code>
 */
ModalWindow.prototype.load=function() {
    var jQueryRealWindow = ModalWindow._getJQueryRealWindow();
    
    var iframe=jQueryRealWindow('<iframe/>',{
        frameBorder:0,
        src:this.url
    }).css({
        //overflow:"hidden",
        padding:"0px"
    }).data({
        myModalWindow:this
    });

    

    var callBack=this.onCloseCallback;

    this.widget=jQueryRealWindow(iframe).dialog({
        resizable: false,
        draggable: true,
        closeOnEscape: true,
        modal:true,
        autoOpen: false,
        close: function( event, ui ) {
            var iframe=ModalWindow._getJQueryRealWindow()(this);
            var success=iframe.data("myModalWindow").success;
            var returnValue=iframe.data("myModalWindow").returnValue;
            iframe.remove();
            callBack(success,returnValue);
        }
    });  
    
}

/**
 * Este método debe llamarse desde la ventana modal
 * Hace que se muestre la ventana modal. 
 * @param {Object} options Objeto con las opciones para configurar como se muestra la ventana.
 * La lista de obciones son las incluida en el Widget de JQuery UI Dialog. {@link http://api.jqueryui.com/dialog/}
 */
ModalWindow.prototype.show=function(options) {
    this.widget.dialog( "option", options);
    this.widget.dialog( "open" );
    var iframe=this._getIFrame();
    if (typeof(options.width)!=="undefined") {
        iframe.width(options.width);
    }
    if (typeof(options.height)!=="undefined") {
        iframe.height(options.height);
    }    
}


/**
 * Cierra la ventana modal y llama a la función de CallBack de cuando se creó la ventana
 * @param {boolean} success Si vale <code>true</true> es que la ventana se cerró usando un botón de aceptar.
 * Si vale <code>false</code> es que se cerró con el botón de cancelar o con el "aspa" de la esquina de la ventana
 * @param {Object} returnValue Valor de retorno de la ventana en caso de retornar <code>true</code>
 */
ModalWindow.prototype.close=function(success,returnValue) {
    this.success=success;
    this.returnValue=returnValue; 
    this.widget.dialog( "close" );  
}



/**
 * Retorna la ventana modal en la que estamos
 * @return {ModalWindow} Si estamos en una ventana modal retorna el objeto de dicha ventana. Sino retornará null.
 */
ModalWindow.getCurrent=function() {
    var modalWindow=null;



    var jQueryRealWindow = ModalWindow._getJQueryRealWindow();
    jQueryRealWindow("iframe").each(function(index,iframe) { 
        var jIFrame=jQueryRealWindow(iframe);
        var parentDocument=jIFrame.contents()[0];
        if (parentDocument==document) {
            //Ya hemos encontrado el iframe en el que estamos
            if (typeof(jIFrame.data("myModalWindow"))==="object") {
                modalWindow=jIFrame.data("myModalWindow");
            }
        }    
    });
        
    return modalWindow;
}

/**
 * @private
 * Obtiene el iframe de esta ventana modal
 */
ModalWindow.prototype._getIFrame=function() {
    var myIFrame=null;
    var that=this;


    var jQueryRealWindow = ModalWindow._getJQueryRealWindow();
    jQueryRealWindow("iframe").each(function(index,iframe) { 
        var jIFrame=jQueryRealWindow(iframe);
        if (jIFrame.data("myModalWindow")===that) {
            myIFrame=jIFrame;
        }
    });
        
    return myIFrame;
}

/**
 * @private
 * Obtiene la verdadera ventana del navegador. Se usa para cuando estamos dentro de un iframe.
 * Hay que usar esta función pq las ventanas modales siempre se crean
 * en la ventana original y NO dentro de los iframes.
 */
ModalWindow._getRealWindow=function() {   
    var realWindow=window;
    while(realWindow.parent!=realWindow) {
        realWindow=realWindow.parent;
    }

    return realWindow;
}
/**
 * @private
 * Obtiene el objeto jQuery de la vrdadera ventana del navegador.
 * Hay que usar esta función pq las ventanas modales siempre se crean
 * en la ventana original y NO dentro de los iframes.
 */
ModalWindow._getJQueryRealWindow=function() {
    var jQueryRealWindow = ModalWindow._getRealWindow().jQuery.noConflict();

    return jQueryRealWindow;
}