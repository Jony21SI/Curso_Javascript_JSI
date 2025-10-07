let ciudades = [
  {
    nombre: "Nueva York",
    pais: "EE.UU.",
    poblacion: 8419000,
    latitud: 40.7128,
    longitud: -74.006,
    clima: "Soleado",
    temperatura: 23.0,
  },
  {
    nombre: "Londres",
    pais: "Reino Unido",
    poblacion: 8982000,
    latitud: 51.5074,
    longitud: -0.1278,
    clima: "Nublado",
    temperatura: 17.5,
  },
  {
    nombre: "Tokio",
    pais: "Japón",
    poblacion: 13929000,
    latitud: 35.6895,
    longitud: 139.6917,
    clima: "Parcialmente nublado",
    temperatura: 20.2,
  },
  {
    nombre: "París",
    pais: "Francia",
    poblacion: 2148000,
    latitud: 48.8566,
    longitud: 2.3522,
    clima: "Lluvia ligera",
    temperatura: 16.7,
  },
  {
    nombre: "Sídney",
    pais: "Australia",
    poblacion: 5312000,
    latitud: -33.8688,
    longitud: 151.2093,
    clima: "Chubascos",
    temperatura: 19.1,
  },
  {
    nombre: "São Paulo",
    pais: "Brasil",
    poblacion: 12300000,
    latitud: -23.5505,
    longitud: -46.6333,
    clima: "Húmedo",
    temperatura: 25.4,
  },
  {
    nombre: "El Cairo",
    pais: "Egipto",
    poblacion: 9900000,
    latitud: 30.0444,
    longitud: 31.2357,
    clima: "Despejado",
    temperatura: 27.9,
  },
  {
    nombre: "Bombay",
    pais: "India",
    poblacion: 12440000,
    latitud: 19.076,
    longitud: 72.8777,
    clima: "Lluvias intensas",
    temperatura: 29.3,
  },
  {
    nombre: "Moscú",
    pais: "Rusia",
    poblacion: 12500000,
    latitud: 55.7558,
    longitud: 37.6173,
    clima: "Cubierto",
    temperatura: 14.6,
  },
  {
    nombre: "Toronto",
    pais: "Canadá",
    poblacion: 2930000,
    latitud: 43.651,
    longitud: -79.347,
    clima: "Ventoso",
    temperatura: 18.2,
  },
];

let contenedorProductos = document.getElementById("cards-section");

function renderCiudades(ciudades) {
  ciudades.forEach((ciudad) => {
    const card = document.createElement("div");
    card.innerHTML = `<h2 class="card__title">Ciudad: ${ciudad.nombre}</h2>
    <h3 class="card__clima">Ciudad: ${ciudad.clima}</h3>`;
    contenedorProductos.appendChild(card);
  });
}
renderCiudades(ciudades);
