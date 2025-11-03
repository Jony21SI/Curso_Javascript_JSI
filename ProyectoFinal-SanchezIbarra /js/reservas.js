// Mostrar ciudades reservadas como cards
/* const botonFavoritos = document.querySelector(
  ".header-button .favorite-button"
);
botonFavoritos.addEventListener("click", function () {
  renderCiudades(reservas);
  botonFavoritos.innerHTML =
    '<span class="material-symbols-outlined">public</span>Ver todas las ciudades';
});
 */
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
renderCiudades(reservas);
function addReservas(index) {
  const reserva = reservas[index];
  if (!reservas.some((reserva) => reserva.nombre === reserva.nombre)) {
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    addfavoritesAlert();
  }
}

/* Añadir logica para que se agreguen al Local Storage las reservas */
