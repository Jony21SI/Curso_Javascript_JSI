let ciudades = [
  {
    nombre: "Nueva York",
    pais: "EE.UU.",
    poblacion: 8419000,
    latitud: 40.7128,
    longitud: -74.006,
    clima: "Soleado",
    temperatura: 23.0,
    imagen: "./images/nueva-york.jpg",
  },
  {
    nombre: "Londres",
    pais: "Reino Unido",
    poblacion: 8982000,
    latitud: 51.5074,
    longitud: -0.1278,
    clima: "Nublado",
    temperatura: 17.5,
    imagen: "./images/londres.jpg",
  },
  {
    nombre: "Tokio",
    pais: "Japón",
    poblacion: 13929000,
    latitud: 35.6895,
    longitud: 139.6917,
    clima: "Parcialmente nublado",
    temperatura: 20.2,
    imagen: "./images/tokyo.jpg",
  },
  {
    nombre: "París",
    pais: "Francia",
    poblacion: 2148000,
    latitud: 48.8566,
    longitud: 2.3522,
    clima: "Lluvia ligera",
    temperatura: 16.7,
    imagen: "./images/paris.jpg",
  },
  {
    nombre: "Sídney",
    pais: "Australia",
    poblacion: 5312000,
    latitud: -33.8688,
    longitud: 151.2093,
    clima: "Chubascos",
    temperatura: 19.1,
    imagen: "./images/sidney.jpg",
  },
  {
    nombre: "São Paulo",
    pais: "Brasil",
    poblacion: 12300000,
    latitud: -23.5505,
    longitud: -46.6333,
    clima: "Húmedo",
    temperatura: 25.4,
    imagen: "./images/sao-paulo.jpg",
  },
  {
    nombre: "El Cairo",
    pais: "Egipto",
    poblacion: 9900000,
    latitud: 30.0444,
    longitud: 31.2357,
    clima: "Despejado",
    temperatura: 27.9,
    imagen: "./images/el-cairo.jpg",
  },
  {
    nombre: "Bombay",
    pais: "India",
    poblacion: 12440000,
    latitud: 19.076,
    longitud: 72.8777,
    clima: "Lluvias intensas",
    temperatura: 29.3,
    imagen: "./images/bombay.jpg",
  },
  {
    nombre: "Moscú",
    pais: "Rusia",
    poblacion: 12500000,
    latitud: 55.7558,
    longitud: 37.6173,
    clima: "Cubierto",
    temperatura: 14.6,
    imagen: "./images/moscu.jpg",
  },
  {
    nombre: "Toronto",
    pais: "Canadá",
    poblacion: 2930000,
    latitud: 43.651,
    longitud: -79.347,
    clima: "Ventoso",
    temperatura: 18.2,
    imagen: "./images/toronto.jpg",
  },
];

//See if animations will work using animate.css

let mostrandoFavoritas = false;
let fechasReservadas = [];
let contenedorCiudades = document.getElementById("cards-section");

function renderCiudades(ciudades) {
  contenedorCiudades.innerHTML = "";
  ciudades.forEach((ciudad, index) => {
    const card = document.createElement("div");
    card.innerHTML = `<h2 class="card__title">${ciudad.nombre}</h2>
      <h3 class="card__clima">Clima: ${ciudad.clima}</h3>
      <button class="favorite-button"><span class="material-symbols-outlined filled">favorite</span>${
        mostrandoFavoritas ? "Eliminar de favoritos" : "Añadir a favoritos"
      }</button>
      <button class="reservar-button"><span class="material-symbols-outlined filled">flight_land</span>Reserva tu viaje</button>
      <img class="card-icon" src="${ciudad.imagen}"></img>`;
    contenedorCiudades.appendChild(card);

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
  });
}

const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
renderCiudades(ciudades);
function addFavorites(index) {
  const ciudad = ciudades[index];
  if (!favoritos.some((favorito) => favorito.nombre === ciudad.nombre)) {
    favoritos.push(ciudad);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
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

// Elimina una ciudad de favoritos por nombre usando filter
function removeFavorite(nombreCiudad) {
  const nuevosFavoritos = favoritos.filter(
    (fav) => fav.nombre !== nombreCiudad
  );
  favoritos.length = 0;
  favoritos.push(...nuevosFavoritos);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

//Sweetalert
/* function alertaConfirmacionViaje(imagen, ciudad, clima) {
  Swal.fire({
    title: `Tu reserva a ${ciudad} se realizó con éxito`,
    icon: "success",
    text: `Buen viaje! El clima en esta ciudad es: ${clima}`,
    imageUrl: imagen,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: `Imagen de ${ciudad}`,
  });
}
alertaConfirmacionViaje(
  ciudades[1].imagen,
  ciudades[1].nombre,
  ciudades[1].clima
); */

//Calendar
function displayCalendar() {
  const { Calendar } = window.VanillaCalendarPro;
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
      <button type="button" id="calendar-button">I am a button</button>
    `,
    },
    type: "default",
    disableDatesPast: true,
    enableEdgeDatesOnly: true,
    selectionDatesMode: "multiple-ranged",
    locale: "es-MX",
    onClickDate(self) {
      console.log(self.context.selectedDates);
      fechasReservadas = self.context.selectedDates;
    },
    //Give style to the Calendar
    //Add the calendar to a popup when clicking on a city card?
    //Add a confirmation alert with the reservation dates before confirming dates
    //Add a button that takes this: self.context.selectedDates and saves that array of dates, and then send that array of dates to the localStorage as the travel dates, An alert from sweet alert should contain that date range
  };
  const calendar = new Calendar("#calendar", options);
  calendar.init();
}
displayCalendar();
const saveDates = document.getElementById("calendar-button");
saveDates.addEventListener("click", () => {
  console.log("Tus fechas se guardaron exitosamente");
  console.log(fechasReservadas);
});
