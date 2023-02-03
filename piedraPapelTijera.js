// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

// Variables que vamoms a utilizar
var partidas = 0;
var partidaActual = 0;
var eleccionJugador = 0;
var eleccionMaquina = 0;

// Constantes a utilizar, las creo para acortar código.
// Constantes referidas a los input name
const InputNombre = document.getElementsByName("nombre")[0];
const InputPartidas = document.getElementsByName("partidas")[0];

// Constantes para los botones
const Jugar = document.getElementsByTagName("button")[0];
const Ya = document.getElementsByTagName("button")[1];
const Reset = document.getElementsByTagName("button")[2];

// Constantes para los Span/imágenes/historial
const Actual = document.getElementById("actual");
const Total = document.getElementById("total");
const JugadorImg = document.querySelectorAll("#jugador img");
const MaquinaImg = document.querySelector("#maquina img");
const Historial = document.getElementById("historial");

// Expresión regular para comprobación del nombre de usuario.
const expresionRegular = /^\D[A-Za-z0-9]{3,}$/;

// Ocultamos el botón ya para evitar k pueda ser ejecutado antes de hacer clic en el botón Jugar.
Ya.disabled = true;

// Listener para el botón JUGAR, una vez hacemos clic en dicho botón.
Jugar.addEventListener("click", function () {
  // Realizamos un bucle forEach para cambiar las imágenes que va a seleccionar el usuario.
  JugadorImg.forEach((e, i) => {
    e.src = "img/" + posibilidades[i] + "Jugador.png";
  });

  // Guardamos en variables el resultado de la validación de los inputs, para su posterior utilización en el condicional.
  let vn = validarNombre(InputNombre.value);
  let vp = validarPartidas(InputPartidas.value);

  // Realizamos un condicional IF en el cual comprobaremos que se cumple la condición de validación de los imput para poder serguir ejeutando el código.
  if (vn && vp) {
    // Deshabilitamos los input una vez comprobado que son válidos.
    InputNombre.disabled = true;
    InputPartidas.disabled = true;
    Total.innerHTML = InputPartidas.value; // Cargamos el valor del input partidas en el span total.
    Ya.disabled = false; // Mostramos el botón (ya) para poder realizar las partidas.

    // Eventos click sobre las opciones del Jugador, con su correspondiente modificación sobre la clase seleccionado o no por cada Imagen.
    // También le asignamos a la variable eleccionJugador un valor igual a la posición del array que representa.
    JugadorImg[0].addEventListener("click", function () {
      JugadorImg[0].classList.add("seleccionado");
      JugadorImg[0].classList.remove("noSeleccionado");
      JugadorImg[1].classList.add("noSeleccionado");
      JugadorImg[1].classList.remove("seleccionado");
      JugadorImg[2].classList.add("noSeleccionado");
      JugadorImg[2].classList.remove("seleccionado");

      eleccionJugador = 0;
    });
    JugadorImg[1].addEventListener("click", function () {
      JugadorImg[0].classList.add("noSeleccionado");
      JugadorImg[0].classList.remove("seleccionado");
      JugadorImg[1].classList.add("seleccionado");
      JugadorImg[1].classList.remove("noSeleccionado");
      JugadorImg[2].classList.add("noSeleccionado");
      JugadorImg[2].classList.remove("seleccionado");

      eleccionJugador = 1;
    });
    JugadorImg[2].addEventListener("click", function () {
      JugadorImg[0].classList.add("noSeleccionado");
      JugadorImg[0].classList.remove("seleccionado");
      JugadorImg[1].classList.add("noSeleccionado");
      JugadorImg[1].classList.remove("seleccionado");
      JugadorImg[2].classList.add("seleccionado");
      JugadorImg[2].classList.remove("noSeleccionado");

      eleccionJugador = 2;
    });
  }
});

// Listener para el botón YA, una vez hacemos clic en dicho botón.
Ya.addEventListener("click", function () {
  partidas = parseInt(InputPartidas.value); // Parseamos el valor devuelto del input partidas, ya que trae un string y necesitaremos un numbert.

  partidaActual++; // Con esta variable vamos aumentando las partidas que llevamos realizadas.

  // Condicional con el cual conseguimos saber el fin de la partida, además de crear el random que nos dará la elección de la máquina.
  if (partidaActual <= partidas) {
    eleccionMaquina = Math.floor(Math.random() * posibilidades.length);

    MaquinaImg.src = "img/" + posibilidades[eleccionMaquina] + "Ordenador.png"; // Asignamos la imagen correspondiente a la elección del random con relación al array posiciones

    Actual.innerHTML = partidaActual; // Modificamos el span actual.

    play(); // Función que nos dará el resultado e imprimirá dentro del historial el mismo.

  } else {
    alert("Fin del juego"); // Aviso de fin del Juego.
  }
});

// Listener para el botón RESET, una vez hacemos clic en dicho botón ejecutaremos la función resetJuego.
Reset.addEventListener("click", resetJuego);


// ******** Funciones del Juego ********

// Función con la cual nos devuelve la elección de la Maquina en relación al array posiciones.
function resultadoMaquina() {
  var eleccion;

  if (eleccionMaquina == 0) {
    eleccion = posibilidades[0];
  } else if (eleccionMaquina == 1) {
    eleccion = posibilidades[1];
  } else {
    eleccion = posibilidades[2];
  }
  return eleccion;
}

// Función con la cual nos devuelve la elección del Jugador en relación a el array posiciones.
function resultadoJugador() {
  var eleccion;

  if (eleccionJugador == 0) {
    eleccion = posibilidades[0];
  } else if (eleccionJugador == 1) {
    eleccion = posibilidades[1];
  } else {
    eleccion = posibilidades[2];
  }
  return eleccion;
}

// Función resultado, en la cual se evaluara el resultado final, devolviendo null para empate, false has perdido y true para ganar.
function resultado() {
  var resultado;

  if (resultadoMaquina() == resultadoJugador()) {
    resultado = null;
  } else if (resultadoJugador() == posibilidades[0] && resultadoMaquina() == posibilidades[1]) {
    resultado = false;
  } else if (resultadoJugador() == posibilidades[1] && resultadoMaquina() == posibilidades[2]) {
    resultado = false;
  } else if (resultadoJugador() == posibilidades[2] && resultadoMaquina() == posibilidades[0]) {
    resultado = false;
  } else {
    resultado = true;
  }
  return resultado;
}

// Nos imprimirá en el historial el resultado en una lista desordenada.
function play() {
  if (resultado() == null) {
    Historial.innerHTML += "<li>" + "Empate" + "</li>";
  } else if (!resultado()) {
    Historial.innerHTML += "<li>" + "Has perdido" + "</li>";
  } else {
    Historial.innerHTML += "<li>" + "Has gando" + "</li>";
  }
}

//Función resetera juego.
function resetJuego() {
  InputPartidas.value = 0; // Ponemos las partidas a 0.
  InputNombre.disabled = false;  // Activamos el botón Nombre.
  InputPartidas.disabled = false; // Activamos el botón Partidas.
  Actual.innerHTML = 0; // Iniciamos a 0 la partida actual en el HTML.
  Total.innerHTML = 0; // Iniciamos a 0 las partidas totales en el HTML.
  partidaActual = 0; // Igualamos a 0 la variable partida actual.
  partidas = 0; // Igualamos a 0 la variable partidas.
  alert("Nueva partida"); 
  Historial.innerHTML += "<li>" + "Nueva partida" + "</li>"; // Imprimimos en el historial el inicio de una nueva partida.
  MaquinaImg.src = "img/defecto.png"; // Asignamos la imagen por defecto para la máquina.
  JugadorImg.forEach((element) => {
    element.src = "img/defecto.png"; // Por medio de un bucle forEach, recorremos las imagenes del jugador e incrustamos la imagen por defecto.
  });
  Ya.disabled = true; // Hacemos desaparecer el botón Ya.
}

// Funcion validar nombre. Mediante una sentencia condicional comprobamos si el parámetro que le pasamos cumple con la expresión regular y modificamos 
// la clase, además retornamos true o false según si es o no correcta la validación.
function validarNombre(e) {
  if (e.match(expresionRegular) != null) {
    InputNombre.classList.remove("fondoRojo");
    
    return true;
  } else {
    InputNombre.classList.add("fondoRojo");

    return false;
  }
}

// Función validar partidas. Aplicamos a los inputs la propiedad ClassList y el método remove o add para modificar el estilo en caso de sero o no validado, 
// al igual k hacemos en la función de validación del nombre del jugador.
function validarPartidas(el) {
  if (el > 0) {
    InputPartidas.classList.remove("fondoRojo");

    return true;
  } else {
    InputPartidas.classList.add("fondoRojo");

    return false;
  }
}
