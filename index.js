import { empleados } from "./empleados.js";

/**
 * aqui accedemos al document.
 * utilizamos el selector 'getElementById' el cual recibe el id del nodo o elemento
 * del document que queremos accesar.
 * y  utilizamos el metodo addEventListener() el cual sirve para escuchar y recibe 2 argumentos
 * 1er argumento es el nombre del evento que pondremos a escuchar
 * 2do argumento es una expresion funcion anonima o tambien puede recibir una funcion arrow
 */
document
  .getElementById("encryptacion-form")
  .addEventListener("submit", function (event) {
    /**
     * (event)  hace referencia al evento que se captura tambien es habitual usar (e)
     * event.preventDefault() se utiliza para evitar que el evento se ejecute por default
     *al cargar la pagina evitando que se envie el formulario vacio.
     */
    event.preventDefault();
    // hacemos el llamado a nuestra funcion buscarEmpleado()
    buscarEmpleado();
  });

function buscarEmpleado() {
  /**
   * guardamos en constantes los nodos que contienen los datos que iremos trabajando junto con que ha ingresado  el usuario
   * el resultado el cual esta identificado con el id='resultado y los guardaremos en variables para poder modificarlo,
   * también guardamos el nodo donde mostraremos un mensaje de error en caso de que el usuario envié el formulario vació.
   */ 

  const nodoNombre = document.getElementById("nombre");
  const nodoDepartamento = document.getElementById("departamento");
  const nodoSalario = document.getElementById("salario");
  const nodoId = document.getElementById("idcampo");
  const mensajeResultado = document.getElementById("resultado");

  let nodoErrorMsn = document.getElementById("errorMsn");

  /**
   * accedemos a la propiedad (.value) del nodo la cual guarda el valor en texto (string)
   * ingresado por el usuario y lo guaramos en una variable este sera el ID.
   */
  const dataId = nodoId.value;

  /**
   * validaremos que el campo ID no este vació.
   * en la expresión la expresión (===) se valida si las comparaciones son iguales
   * si se cumple la condición sera suficiente para mostrar el mensaje de error
   */

  let mensaje;
  if (dataId === "") {
    mensaje = "No se permiten <strong>campos vacios</strong>";

    /**
     * hacemos el llamado a nuestra función showMsnError() que sera la encargada
     * de mostrar el mensaje de error
     * esta recibe como argumentos el mensaje de error que deberá mostrar
     * y el nodo nodoErrorMsn donde se mostrara el mensaje que se enviá
     */

    showMsnError(mensaje, nodoErrorMsn);

  } 
  /**
   * Entonces si no se encuentran errores por el campo ID vació se procederá en este bloque else
   * a ejecutar la lógica para buscar al empleado y mostrarlo su información en la vista.
   */
  else {

     /**
     * Usaremos nuestra función 'getEmpleado(id)' y enviaremos como argumento nuestro id almacenado en dataId,
     * usaremos el método find() para buscar en nuestro array y la lógica de nuestra función sera comprar el id
     * ingresado por el usuario con el id del empleado en el array, cuando tengamos una coincidencia la función
     * retornara al empleado que cumpla con las condiciones, en este caso que tenga el id dado, este empleado lo
     * almacenaremos en nuestra variable empleado.
     */
    const empleado = getEmpleado(dataId);

    /**
     * En esta sección usaremos el bloque condicional para determinar si nuestro empleado existe, nuestra función getEmpleado()
     * retornara un empleado existente o retornara 'undefined' en caso de no existir, comprobaremos esto mediante un bloque if / else,
     * cuando nuestra variable contenga un empleado mostraremos en la vista su detalle (nombre, salario, departamento), y en caso de no
     * tener un empleado mostraremos los campos sin dato alguno y adicionalmente un mensaje donde indique que no existe un empleado con 
     * dicho ID 
     */

    if (empleado != undefined) {
      mensajeResultado.innerHTML="";
      nodoNombre.value = empleado.name;
      nodoDepartamento.value = empleado.department;
      nodoSalario.value = empleado.salary;
    } else {
      nodoNombre.value =  "N/A";
      nodoDepartamento.value ="N/A";
      nodoSalario.value = "N/A";
      mensajeResultado.innerHTML='<strong>Empleado errado o inexistente </strong>';
    }
  }
}

function getEmpleado(id) {
  return empleados.find((empleado) => empleado.id == id);
}

function showMsnError(mensajeError, nodoErrorMsn) {
  /**
   * en nuestro nodoErrorMsn accedemos al metodo .setAttribute()
   * el cual recibe como primer argumento el nombre de la propiead html que desamos modificar
   * para este caso vamos modificar la propiedad 'class' y como segundo argumento
   * enviamos las clases de estilo que seran asignadas a la propiedad 'class' en este caso
   * asignaremos algunas clases de estilos pertenecientes al framework de estilos boostrap
   * bg-danger --> genera un fondo rojo
   * rounded-3 --> redondea las esquinas
   * mb-2 ---> margin-bottom agrega un margen en la parte inferior del nodoErrorMsn
   * p-2 ---> agrega un padding alrededor de todo el nodoErrorMsn
   *
   */

  nodoErrorMsn.setAttribute("class", "bg-danger rounded-3 mb-2 p-2");
  /**
   * modificamos el nodoErrorMsn accediendo a su propiedad .innerHTML
   * la cual nos permite utilizar la sintaxis html para crear etiquetas
   * desde javaScript en este caso crearemos una etiqueta 'strong'
   * para poner en negrita la palabra campos vacios
   */
  nodoErrorMsn.innerHTML = mensajeError;

  /**
   * utilizamos la instruccion de return para romper el flujo de nuestra aplicacion
   * y evitar que se continue ejecutando el codigo que pueda seguir
   */
  return;
}
