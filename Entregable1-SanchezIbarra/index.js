// Array de climas correspondientes a cada ciudad
const climas = ["Tropical", "Seco", "Templado", "Frío", "Ártico"];
// Array de ciudades disponibles
const ciudades = ["Nueva York", "Los Ángeles", "Chicago", "Houston", "Phoenix"];

//Solicita al usuario el nombre de una ciudad mostrando la lista disponible en el prompt.
const solicitarCiudad = () => {
  const mensaje =
    "Ciudades disponibles:\n- " +
    ciudades.join("\n- ") +
    "\n\nIngresa el nombre de una ciudad para conocer su clima:";
  const ciudadIngresada = prompt(mensaje);
  if (ciudadIngresada && ciudadIngresada.trim() !== "") {
    return ciudadIngresada.trim();
  } else {
    alert("No se ingresó ninguna ciudad. Intenta de nuevo.");
    return null;
  }
};

//Busca el índice de la ciudad ingresada por el usuario en el array de ciudades.
const obtenerIndiceCiudad = (nombreCiudad) => {
  return ciudades.findIndex(
    (ciudad) =>
      ciudad.toLowerCase().trim() === nombreCiudad.toLowerCase().trim()
  );
};

//Muestra el clima correspondiente a la ciudad ingresada.
const mostrarClimaCiudad = (nombreCiudad) => {
  const index = obtenerIndiceCiudad(nombreCiudad);
  if (index === -1) {
    alert("No se tiene información sobre el clima en " + nombreCiudad + ".");
    return;
  }
  alert("El clima en " + ciudades[index] + " es: " + climas[index]);
};

//Imprime en consola un pequeño mensaje de agradecimiento al finalizar.
const mostrarAgradecimiento = () => {
  console.log(
    "Gracias por usar el servicio de consulta de climas. ¡Hasta luego!\n" +
      "\tDesarrollado por: Jonatan Sanchez Ibarra"
  );
};

/// Flujo principal: permite al usuario consultar el clima de varias ciudades
do {
  const ciudadDeseada = solicitarCiudad();
  if (ciudadDeseada) {
    mostrarClimaCiudad(ciudadDeseada);
  }
} while (confirm("¿Deseas consultar otra ciudad?"));

mostrarAgradecimiento();
