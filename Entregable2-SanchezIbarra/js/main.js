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

let contenedorProductos = document.getElementById("cards-section");

function renderCiudades(ciudades) {
  ciudades.forEach((ciudad, index) => {
    const card = document.createElement("div");
    card.innerHTML = `<h2 class="card__title">${ciudad.nombre}</h2>
    <h3 class="card__clima">Clima: ${ciudad.clima}</h3>
    <button class="favorite-button" onclick=(addFavorites(${index}))><span class="material-symbols-outlined">favorite</span>Add to Favorites</button>
    <img class="card-icon" src="${ciudad.imagen}"></img>`;
    contenedorProductos.appendChild(card);
  });
}
renderCiudades(ciudades);
let favorites = [];
function addFavorites(index) {
  const ciudad = ciudades[index];
  favorites.push(ciudad);
  console.log(favorites);
}
