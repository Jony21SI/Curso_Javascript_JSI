let contenedorReservas = document.getElementById("cards-section-reservas");
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

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
        ? reserva.fechas.join(" al ")
        : "No especificadas";
      const nombreCliente = reserva.datosCliente
        ? `${reserva.datosCliente.nombre} ${reserva.datosCliente.apellidos}`
        : "No especificado";

      card.innerHTML = `
        <h2 class="card__title">${reserva.nombre}</h2>
        <h4 class="card__clima">Clima: ${reserva.clima}</h4>
        <h4 class="card__dates">Fechas: Del ${fechasTexto}</h4>
        <h4 class="card__traveler">Viajero: ${nombreCliente}</h4>
        <button class="delete-card-reserva"><span class="material-symbols-outlined">delete</span>Eliminar reserva</button>
        <button class="edit-reserva-button"><span class="material-symbols-outlined">edit</span>Editar reserva</button>
        <img class="card-icon" src=".${reserva.imagen}"></img>
      `;
      contenedorReservas.appendChild(card);

      // Eliminar reserva
      const deleteButton = card.querySelector(".delete-card-reserva");
      deleteButton.addEventListener("click", function () {
        eliminarReserva(reserva.id);
      });

      // Editar reserva
      const editButton = card.querySelector(".edit-reserva-button");
      editButton.addEventListener("click", function () {
        editarReserva(reserva);
      });
    });
  }
}

//Funcion eliminar reserva
function eliminarReserva(reservaId) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará la reserva permanentemente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#748e54",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const nuevasReservas = reservas.filter((r) => r.id !== reservaId);
      localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
      reservas.length = 0;
      reservas.push(...nuevasReservas);
      renderReservas(reservas);

      Swal.fire({
        title: "¡Eliminada!",
        text: "La reserva ha sido eliminada correctamente",
        icon: "success",
        confirmButtonColor: "#748e54",
      });
    }
  });
}

// Función editar reserva
let fechasEditadas = [];
function editarReserva(reserva) {
  fechasEditadas = reserva.fechas ? [...reserva.fechas] : [];

  Swal.fire({
    title: `<strong>Editar reserva a ${reserva.nombre}</strong>`,
    html: `
      <label>Nombre(s): <input id="edit-nombre" type="text" value="${
        reserva.datosCliente?.nombre || ""
      }" placeholder="Ingrese su nombre"></label><br>
      <label>Apellido(s): <input id="edit-apellidos" type="text" value="${
        reserva.datosCliente?.apellidos || ""
      }" placeholder="Ingrese sus apellidos"></label><br>
      <label>Fecha de nacimiento: <input id="edit-fechaNacimiento" type="date" value="${
        reserva.datosCliente?.fechaNacimiento || ""
      }" placeholder="Seleccione su fecha de nacimiento"></label><br>
      <label>Nacionalidad: <input id="edit-nacionalidad" type="text" value="${
        reserva.datosCliente?.nacionalidad || ""
      }" placeholder="Ingrese su nacionalidad"></label><br>
      <label>Teléfono de contacto: <input id="edit-telefono" type="tel" value="${
        reserva.datosCliente?.telefono || ""
      }" placeholder="Ingrese su número de teléfono"></label><br>
      <label>Email: <input id="edit-email" type="email" value="${
        reserva.datosCliente?.email || ""
      }" placeholder="Ingrese su correo electrónico"></label><br>
      <label>Fechas de viaje:</label><br>
      <div class="calendar-placeholder-edit">Calendario</div>
    `,
    showCancelButton: true,
    confirmButtonText: "Guardar Cambios",
    confirmButtonColor: "#748e54",
    cancelButtonText: "Cancelar",
    didOpen: () => {
      displayEditCalendar();
    },
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector("#edit-nombre").value;
      const apellidos = Swal.getPopup().querySelector("#edit-apellidos").value;
      const fechaNacimiento = Swal.getPopup().querySelector(
        "#edit-fechaNacimiento"
      ).value;
      const nacionalidad =
        Swal.getPopup().querySelector("#edit-nacionalidad").value;
      const telefono = Swal.getPopup().querySelector("#edit-telefono").value;
      const email = Swal.getPopup().querySelector("#edit-email").value;

      // Regex Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d+$/;

      if (
        !nombre ||
        !apellidos ||
        !fechaNacimiento ||
        !nacionalidad ||
        !telefono ||
        !email
      ) {
        Swal.showValidationMessage("Por favor, complete todos los campos");
        return false;
      } else if (!emailRegex.test(email)) {
        Swal.showValidationMessage("Por favor, ingrese un email válido");
        return false;
      } else if (!phoneRegex.test(telefono)) {
        Swal.showValidationMessage(
          "Por favor, ingrese un número de teléfono válido (solo números)"
        );
        return false;
      } else if (fechasEditadas.length === 0) {
        Swal.showValidationMessage("Por favor, seleccione al menos una fecha");
        return false;
      }

      return {
        nombre,
        apellidos,
        fechaNacimiento,
        nacionalidad,
        telefono,
        email,
        fechas: fechasEditadas,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const datosActualizados = result.value;
      let index = -1;
      for (let i = 0; i < reservas.length; i++) {
        if (reservas[i].id === reserva.id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        reservas[index] = {
          ...reserva,
          fechas: datosActualizados.fechas,
          datosCliente: {
            nombre: datosActualizados.nombre,
            apellidos: datosActualizados.apellidos,
            fechaNacimiento: datosActualizados.fechaNacimiento,
            nacionalidad: datosActualizados.nacionalidad,
            telefono: datosActualizados.telefono,
            email: datosActualizados.email,
          },
        };
        localStorage.setItem("reservas", JSON.stringify(reservas));
        renderReservas(reservas);
        Swal.fire({
          title: "¡Reserva actualizada!",
          text: "Los cambios se han guardado correctamente",
          icon: "success",
          confirmButtonColor: "#748e54",
        });
      }
    }
  });
}

// Función para mostrar el calendario en el modal de etar reserva
function displayEditCalendar() {
  const { Calendar } = window.VanillaCalendarPro;
  const calendarElement = document.querySelector(".calendar-placeholder-edit");

  const options = {
    layouts: {
      default: `
      <div class="vc-header" data-vc="header" role="toolbar" aria-label="Calendar Navigation">
        <div class="vc-header__content" data-vc-header="content">
          <#Year /> | <#Month />
        </div>
        <#ArrowPrev />
        <#ArrowNext />
      </div>
      <div class="vc-wrapper" data-vc="wrapper">
        <#WeekNumbers />
        <div class="vc-content" data-vc="content">
          <#Week />
          <#Dates />
          <#DateRangeTooltip />
        </div>
      </div>
    `,
    },
    type: "default",
    disableDatesPast: true,
    enableEdgeDatesOnly: true,
    selectionDatesMode: "multiple-ranged",
    locale: "es-MX",
    styles: {
      dateBtn: "date-btn",
    },
    onClickDate(self) {
      fechasEditadas = self.context.selectedDates;
    },
  };

  const calendar = new Calendar(calendarElement, options);
  calendar.init();
}

renderReservas(reservas);
