let contenedorReservas = document.getElementById("cards-section-reservas");
//Leer del localStorage de Reservas
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
// Añadir Reservas y Fechas de Reserva al Local Storage y cambiar el getItem de favoritos a Reservas
//Crear Modal para editar la reserva
//Alerta de confirmación antes de eliminar una reserva y cambiar el setItem del delete de Reservas

//Render Reservas
function renderReservas(reservas) {
  if (reservas.length === 0) {
    contenedorReservas.innerHTML =
      "<h2>No tienes reservas, Empieza reservando un viaje.</h2>";
  } else {
    contenedorReservas.innerHTML = "";
    reservas.forEach((reserva) => {
      const card = document.createElement("div");
      const fechasTexto = reserva.fechas
        ? reserva.fechas.join(", ")
        : "No especificadas";
      const nombreCliente = reserva.datosCliente
        ? `${reserva.datosCliente.nombre} ${reserva.datosCliente.apellidos}`
        : "No especificado";

      card.innerHTML = `
        <h2 class="card__title">${reserva.nombre}</h2>
        <h4 class="card__clima">Clima: ${reserva.clima}</h4>
        <h4 class="card__dates">Fechas: ${fechasTexto}</h4>
        <h4 class="card__traveler">Viajero: ${nombreCliente}</h4>
        <button class="delete-card-reserva"><span class="material-symbols-outlined">delete</span>Eliminar reserva</button>
        <button class="edit-reserva-button"><span class="material-symbols-outlined">edit</span>Editar reserva</button>
        <img class="card-icon" src=".${reserva.imagen}"></img>
      `;
      contenedorReservas.appendChild(card);

      // Eliminar reserva
      const deleteButton = card.querySelector(".delete-card-reserva");
      deleteButton.addEventListener("click", function () {
        eliminarReserva(reserva.nombre);
      });
    });
  }
}

function eliminarReserva(ciudadNombre) {
  const nuevasReservas = reservas.filter((r) => r.nombre !== ciudadNombre);
  localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
  reservas.length = 0;
  reservas.push(...nuevasReservas);
  renderReservas(reservas);
}
// Renderizar las reservas al cargar la página
renderReservas(reservas);
