/**
 * Apollo Expert Booking Flow
 */

const ApolloApp = (() => {
  // Estado de la aplicación
  const state = {
    tables: [
      { id: "A1", cap: 2, status: "available" },
      { id: "A2", cap: 2, status: "available" },
      { id: "B1", cap: 4, status: "occupied" },
      { id: "B2", cap: 4, status: "available" },
      { id: "C1", cap: 6, status: "available" },
      { id: "VIP-1", cap: 8, status: "available" },
    ],
    selectedTable: null,
  };

  // Elementos UI
  const ui = {
    floorPlan: document.getElementById("floor-plan"),
    step1: document.getElementById("step-1"),
    step2: document.getElementById("step-2"),
    info: document.getElementById("selected-info"),
    form: document.getElementById("booking-form"),
    success: document.getElementById("success-msg"),
  };

  // Renderizar solo las mesas disponibles al inicio
  const renderAvailableTables = () => {
    ui.floorPlan.innerHTML = "";

    const available = state.tables.filter((t) => t.status === "available");

    available.forEach((table) => {
      const el = document.createElement("div");
      el.className = "table-card";
      el.innerHTML = `
                <strong>Mesa ${table.id}</strong>
                <span>${table.cap} personas</span>
            `;
      el.onclick = () => selectAndContinue(table);
      ui.floorPlan.appendChild(el);
    });
  };

  // Transición al paso 2
  const selectAndContinue = (table) => {
    state.selectedTable = table;

    // Ocultar paso 1 y mostrar paso 2
    ui.step1.classList.add("hidden");
    ui.step2.classList.remove("hidden");

    // Actualizar información visual
    ui.info.innerText = `Has seleccionado la Mesa ${table.id} (Capacidad: ${table.cap} personas)`;
    document.getElementById("table-id-input").value = table.id;
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById("user-name").value;
    const date = document.getElementById("res-date").value;

    ui.step2.classList.add("hidden");
    ui.success.innerHTML = `
            <h2 style="color:var(--gold)">¡Reserva Galáctica Confirmada!</h2>
            <p>Gracias <strong>${name}</strong>. La mesa <strong>${state.selectedTable.id}</strong> te espera el ${date}.</p>
            <button class="btn-gold" onclick="location.reload()" style="margin-top:20px">Volver al inicio</button>
        `;
    ui.success.classList.remove("hidden");
    ui.success.classList.add("fade-in");
  };

  // Función para retroceder
  const reset = () => {
    state.selectedTable = null;
    ui.step2.classList.add("hidden");
    ui.step1.classList.remove("hidden");
  };

  const init = () => {
    renderAvailableTables();
    ui.form.addEventListener("submit", handleFinalSubmit);
  };

  return { init, reset };
})();

document.addEventListener("DOMContentLoaded", ApolloApp.init);
