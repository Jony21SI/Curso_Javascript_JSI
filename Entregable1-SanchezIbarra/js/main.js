// Array de climas correspondientes a cada ciudad
const climas = ["Tropical", "Seco", "Templado", "Frío", "Ártico"];
// Array de ciudades disponibles
const ciudades = ["Nueva York", "Los Ángeles", "Chicago", "Houston", "Phoenix"];

// Muestra la lista de ciudades y un mensaje
function promptConCiudades(mensaje) {
  return prompt(
    "Ciudades disponibles:\n- " + ciudades.join("\n- ") + "\n\n" + mensaje
  );
}

//Solicita al usuario el nombre de una ciudad mostrando la lista de ciudades disponibles.
const solicitarCiudad = () => {
  const ciudadIngresada = promptConCiudades(
    "Ingresa el nombre de una ciudad para conocer su clima:"
  );
  if (ciudadIngresada && ciudadIngresada.trim() !== "") {
    return ciudadIngresada.trim();
  } else {
    alert("No se ingresó ninguna ciudad. Intenta de nuevo.");
    return null;
  }
};

//Busca el índice de la ciudad ingresada por el usuario en el array de ciudades.
const obtenerIndiceCiudad = (nombreCiudad) => {
  const ciudadesNormalizadas = [];
  for (let i = 0; i < ciudades.length; i++) {
    ciudadesNormalizadas.push(ciudades[i].toLowerCase().trim());
  }
  return ciudadesNormalizadas.indexOf(nombreCiudad.toLowerCase().trim());
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

// Agrega una nueva ciudad y su clima a los arrays
function agregarCiudad(nombreCiudad, clima) {
  if (obtenerIndiceCiudad(nombreCiudad) === -1) {
    ciudades.push(nombreCiudad);
    climas.push(clima);
    alert("Ciudad y clima agregados correctamente.");
  } else {
    alert("La ciudad ya existe en la lista.");
  }
}

// Elimina una ciudad y su clima de los arrays
function eliminarCiudad(nombreCiudad) {
  const index = obtenerIndiceCiudad(nombreCiudad);
  if (index !== -1) {
    ciudades.splice(index, 1);
    climas.splice(index, 1);
    alert("La ciudad '" + nombreCiudad + "' ha sido eliminada.");
  } else {
    alert("No se encontró la ciudad '" + nombreCiudad + "' en la lista.");
  }
}

// Menú para interactuar con el usuario
let opcion;
do {
  opcion = prompt(
    "¿Qué deseas hacer?\n" +
      "1. Consultar clima de una ciudad\n" +
      "2. Agregar una ciudad\n" +
      "3. Eliminar una ciudad\n" +
      "4. Salir"
  );
  switch (opcion) {
    case "1": {
      const ciudadDeseada = promptConCiudades(
        "Ingresa el nombre de la ciudad para consultar su clima:"
      );
      mostrarClimaCiudad(ciudadDeseada);
      break;
    }
    case "2": {
      const nuevaCiudad = prompt("Ingresa el nombre de la nueva ciudad:");
      const nuevoClima = prompt("Ingresa el clima de la nueva ciudad:");
      agregarCiudad(nuevaCiudad, nuevoClima);
      break;
    }
    case "3": {
      const ciudadAEliminar = promptConCiudades(
        "Ingresa el nombre de la ciudad a eliminar:"
      );
      eliminarCiudad(ciudadAEliminar);
      break;
    }
    case "4":
      console.log("Gracias por usar el simulador de clima.");
      break;
    default:
      alert("Opción no válida. Intenta de nuevo.");
  }
} while (opcion !== "4");
