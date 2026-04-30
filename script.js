document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-reserva");
  const mensajeDiv = document.getElementById("mensaje-confirmacion");
  const detallesReserva = document.getElementById("detalles-reserva");

  // Establecer la fecha mínima como el día de hoy
  const hoy = new Date().toISOString().split("T")[0];
  document.getElementById("fecha").setAttribute("min", hoy);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const datos = {
      nombre: document.getElementById("nombre").value,
      fecha: document.getElementById("fecha").value,
      personas: document.getElementById("personas").value,
    };

    // Simulación de guardado
    detallesReserva.innerHTML = `Estimado <b>${datos.nombre}</b>, su mesa para <b>${datos.personas}</b> personas está lista el día <b>${datos.fecha}</b>.`;

    // Transición visual
    form.style.opacity = "0";
    setTimeout(() => {
      form.classList.add("hidden");
      mensajeDiv.classList.remove("hidden");
      mensajeDiv.style.opacity = "1";
    }, 300);
  });
});

// Función para permitir nuevas reservas sin recargar la página
function reiniciarApp() {
  location.reload();
}
