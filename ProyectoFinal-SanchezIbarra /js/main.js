const URL = "./db/data.json";
async function obtenerCiudades() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    ciudades = data;
    renderCiudades(ciudades);
  } catch (error) {
    console.error("No fue posible cargar las ciudades", error);
  }
}
obtenerCiudades();
let ciudades = [];
let mostrandoFavoritas = false;
let fechasReservadas = [];
let ciudadSeleccionada = null;
let datosUsuario = null;
let contenedorCiudades = document.getElementById("cards-section");

function renderCiudades(ciudades) {
  contenedorCiudades.innerHTML = "";
  ciudades.forEach((ciudad, index) => {
    const card = document.createElement("div");
    card.innerHTML = `<h2 class="card__title">${ciudad.nombre}</h2>
      <h3 class="card__clima">Clima: ${ciudad.clima}</h3>
      <button class="favorite-button"><span class="material-symbols-outlined filled">favorite</span>${
        mostrandoFavoritas ? "Eliminar de favoritas" : "Añadir a favoritas"
      }</button>
      <button class="reservar-button"><span class="material-symbols-outlined filled">flight_land</span>Reserva tu viaje</button>
      <img class="card-icon" src="${ciudad.imagen}"></img>`;
    contenedorCiudades.appendChild(card);

    // Añadir a Favoritos
    const addFavoritesButton = card.querySelector(".favorite-button");
    addFavoritesButton.addEventListener("click", function (event) {
      event.stopPropagation();
      if (mostrandoFavoritas) {
        removeFavorite(ciudad.nombre);
        renderCiudades(favoritos);
      } else {
        addFavorites(index);
      }
    });

    // Reservar Ciudad
    const reservarButton = card.querySelector(".reservar-button");
    reservarButton.addEventListener("click", function (event) {
      event.stopPropagation();
      ciudadSeleccionada = ciudad;
      openCalendarModal(ciudad.nombre);
    });
  });
}
//Añadir a favoritos
const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
renderCiudades(ciudades);
function addFavorites(index) {
  const ciudad = ciudades[index];
  if (!favoritos.some((favorito) => favorito.nombre === ciudad.nombre)) {
    favoritos.push(ciudad);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    addfavoritesAlert();
  }
}

// Mostrar ciudades favoritas
const botonFavoritos = document.querySelector(
  ".header-button .favorite-button"
);
botonFavoritos.addEventListener("click", function () {
  mostrandoFavoritas = !mostrandoFavoritas;
  if (mostrandoFavoritas) {
    renderCiudades(favoritos);
    botonFavoritos.innerHTML =
      '<span class="material-symbols-outlined">public</span>Ver todas las ciudades';
  } else {
    renderCiudades(ciudades);
    botonFavoritos.innerHTML =
      '<span class="material-symbols-outlined">bookmark_heart</span>Mis ciudades favoritas';
  }
});

// Filtro ascendente/descendente
const ordenarCiudades = document.getElementById("city-filter");
ordenarCiudades.addEventListener("change", function () {
  let arrayParaOrdenar = mostrandoFavoritas ? [...favoritos] : [...ciudades];
  if (ordenarCiudades.value === "ascendente") {
    arrayParaOrdenar.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (ordenarCiudades.value === "descendente") {
    arrayParaOrdenar.sort((a, b) => b.nombre.localeCompare(a.nombre));
  }
  renderCiudades(arrayParaOrdenar);
});

// Limpiar filtros
const botonLimpiarFiltros = document.getElementById("clear-filters");
const searchInput = document.getElementById("search-input");
botonLimpiarFiltros.addEventListener("click", function () {
  searchInput.value = "";
  ordenarCiudades.selectedIndex = 0;
  if (mostrandoFavoritas) {
    renderCiudades(favoritos);
  } else {
    renderCiudades(ciudades);
  }
});

// Búsqueda por nombre de ciudad
searchInput.addEventListener("input", function () {
  const nombre = searchInput.value.toLowerCase();
  const lista = mostrandoFavoritas ? favoritos : ciudades;
  const filtradas = lista.filter((ciudad) =>
    ciudad.nombre.toLowerCase().includes(nombre)
  );
  renderCiudades(filtradas);
});

// Elimina una ciudad de favoritos
function removeFavorite(nombreCiudad) {
  const nuevosFavoritos = favoritos.filter(
    (fav) => fav.nombre !== nombreCiudad
  );
  favoritos.length = 0;
  favoritos.push(...nuevosFavoritos);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  removeFavoritesAlert();
}

//Toastify Alerta Añadir a Favoritos
function addfavoritesAlert() {
  Toastify({
    text: "Ciudad añadida a favoritas",
    duration: 2500,
    stopOnFocus: false,
    style: {
      background: "linear-gradient(to right, #40ae5bff, #1b7a32ff)",
    },
  }).showToast();
}
//Toastify Alerta Eliminar de Favoritos
function removeFavoritesAlert() {
  Toastify({
    text: "Ciudad eliminada de favoritas",
    duration: 2500,
    stopOnFocus: false,
    style: {
      background: "linear-gradient(to right, #b71d1dff, #ff4d4d)",
    },
  }).showToast();
}

//Calendar Display
function displayCalendar() {
  const { Calendar } = window.VanillaCalendarPro;

  const swalContainer = document.querySelector(".swal2-html-container");
  const calendarElement = swalContainer.querySelector(".calendar-placeholder");

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
      <#ControlTime />
      <button type="button" id="calendar-button">Reserva tu viaje</button>
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
      console.log(self.context.selectedDates);
      fechasReservadas = self.context.selectedDates;
    },
    //Modify the calendar middle hover
    //Add a confirmation alert with the reservation dates before confirming dates
    //Usar 2 archivos js, pero no solo con una funcion, que este bien utilizado
    //Js para el formulario?
    //Solicitar datos del usuario al hacer checkout (Formulario de metodo de Pago y Resumen de Compra)
    //Eliminar console logs
    //Para los errores poner errores en la interfaz, no en la consola
    //Validar todos los campos del formulario (Boton con regex?)
    //Añadir al Local Storage las reservas y agregarlas a ala pagina de reservas
    //Que las reservas se puedan editar

    /*  -Proyecto estilado, que sea utilizable
-Minimo 2 archivos, max 4 JS. NO SE USAN MODULE NI EXPORT
-Respetar la estructura de archivos y carpetas
-Todo íntegramente con DOM y Eventos
-Librerias (sweetalert/toastify)
-Arrays de objetos literal con JSON y Fetch
-Circuito completo del script
-Uso de storage como en pre-entrega 2
-Try-catch-finally
-Entregar via repositorio de github */
  };

  const calendar = new Calendar(calendarElement, options);
  calendar.init();
}

// Boton para Reservar
function saveDates() {
  const saveDates = document.getElementById("calendar-button");
  saveDates.addEventListener("click", () => {
    if (fechasReservadas.length === 0) {
      Swal.showValidationMessage("Por favor, selecciona al menos una fecha");
      return;
    }
    console.log("Tus fechas se guardaron exitosamente");
    console.log(fechasReservadas);
    Swal.close();
    openModalFormulario();
  });
}

//Funcion para llenar el formulario con datos del cliente (Simulación Checkout)
function openModalFormulario() {
  Swal.fire({
    title: "<strong>Ingrese sus datos:</strong>",
    html: `
      <label>Nombre(s): <input id="nombre" type="text" required placeholder="Ingrese su nombre"></label><br>
      <label>Apellido(s): <input id="apellidos" type="text" required placeholder="Ingrese sus apellidos"></label><br>
      <label>Fecha de nacimiento: <input id="fechaNacimiento" type="date" required placeholder="Seleccione su fecha de nacimiento"></label><br>
      <label>Nacionalidad: <input id="nacionalidad" type="text" required placeholder="Ingrese su nacionalidad"></label><br>
      <label>Teléfono de contacto: <input id="telefono" type="tel" required placeholder="Ingrese su número de teléfono"></label><br>
      <label>Email: <input id="email" type="email" required placeholder="Ingrese su correo electrónico"></label><br>
    `,
    showDenyButton: true,
    confirmButtonText: "Guardar Datos",
    confirmButtonColor: "#748e54",
    denyButtonText: `Cancelar`,
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector("#nombre").value;
      const apellidos = Swal.getPopup().querySelector("#apellidos").value;
      const fechaNacimiento =
        Swal.getPopup().querySelector("#fechaNacimiento").value;
      const nacionalidad = Swal.getPopup().querySelector("#nacionalidad").value;
      const telefono = Swal.getPopup().querySelector("#telefono").value;
      const email = Swal.getPopup().querySelector("#email").value;

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
      } else if (!emailRegex.test(email)) {
        Swal.showValidationMessage("Por favor, ingrese un email válido");
      } else if (!phoneRegex.test(telefono)) {
        Swal.showValidationMessage(
          "Por favor, ingrese un número de teléfono válido (solo números)"
        );
      }
      return {
        nombre,
        apellidos,
        fechaNacimiento,
        nacionalidad,
        telefono,
        email,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      datosUsuario = result.value;
      console.log("Datos guardados:", datosUsuario);
      confirmarViaje();
    } else if (result.isDenied) {
      console.log("El usuario canceló la operación.");
    }
  });
}

//SweetAlert Calendar Modal
function openCalendarModal(nombreCiudad) {
  Swal.fire({
    title: `<strong>Selecciona las fechas de tu viaje a ${nombreCiudad}</strong>`,
    html: `
      <div class="calendar-placeholder">Calendario</div>
    `,
    showCloseButton: true,
    showConfirmButton: false,
    didOpen: () => {
      const calendarContainer = document.querySelector(
        ".swal2-html-container .calendar-placeholder"
      );
      displayCalendar();
      saveDates();
    },
  });
}

//Confirmación de Agenda de viaje
function confirmarViaje() {
  const fechasTexto = fechasReservadas.join(", ");
  Swal.fire({
    title: `¿Desea confirmar su reservación de viaje a ${ciudadSeleccionada.nombre}?`,
    text: `Para las fechas: ${fechasTexto}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#748e54",
    cancelButtonColor: "#d33",
    confirmButtonText: "Agendar",
  }).then((result) => {
    if (result.isConfirmed) {
      guardarReserva();
      alertaConfirmacionViaje(
        ciudadSeleccionada.imagen,
        ciudadSeleccionada.nombre,
        ciudadSeleccionada.clima
      );
    }
  });
}
//Sweetalert Resumen Confirmación Viaje
function alertaConfirmacionViaje(imagen, ciudad, clima) {
  Swal.fire({
    title: `Tu reserva a ${ciudad} se realizó con éxito`,
    icon: "success",
    text: `Buen viaje! El clima en esta ciudad es: ${clima}`,
    imageUrl: imagen,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: `Imagen de ${ciudad}`,
    confirmButtonColor: "#748e54",
  });
}
//Guardar Reserva
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
function guardarReserva() {
  const reserva = {
    ...ciudadSeleccionada,
    fechas: fechasReservadas,
    datosCliente: datosUsuario,
    fechaReserva: new Date().toISOString(),
  };

  // Verificar si ya existe una reserva para esta ciudad
  const existeIndex = reservas.findIndex(
    (r) => r.nombre === ciudadSeleccionada.nombre
  );

  if (existeIndex !== -1) {
    // Actualizar reserva existente
    reservas[existeIndex] = reserva;
  } else {
    // Agregar nueva reserva
    reservas.push(reserva);
  }

  localStorage.setItem("reservas", JSON.stringify(reservas));
  console.log("Reserva guardada:", reserva);
}
