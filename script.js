/**
 * script.js — Interactividad del Portafolio
 * Autor: Alex Rivera
 *
 * Contenido:
 *  1. Mensaje de bienvenida dinámico
 *  2. Cambio de texto al hacer clic en un botón
 *  3. Mostrar / ocultar proyectos extra
 *  4. Menú hamburguesa para móviles
 *  5. Toast (notificación) utilitario
 */

/* =====================================================
   UTILIDAD: Mostrar toast (notificación flotante)
   ===================================================== */
function showToast(mensaje, duracion = 3000) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = mensaje;
  toast.classList.add("toast--show");

  // Ocultar automáticamente después de `duracion` ms
  setTimeout(() => {
    toast.classList.remove("toast--show");
  }, duracion);
}

/* =====================================================
   1. MENSAJE DE BIENVENIDA
   Se inserta en el párrafo #welcomeMsg según la hora
   ===================================================== */
function mostrarBienvenida() {
  const saludo = document.getElementById("welcomeMsg");
  if (!saludo) return;

  const hora = new Date().getHours();
  let texto;

  if (hora >= 6 && hora < 12) {
    texto = "Buenos días! Bienvenido a mi portafolio.";
  } else if (hora >= 12 && hora < 19) {
    texto = "Buenas tardes! Bienvenido a mi portafolio.";
  } else {
    texto = "Buenas noches! Bienvenido a mi portafolio.";
  }

  saludo.textContent = texto;

  // También lanzamos el toast de bienvenida
  showToast("" + texto, 4000);
}

/* =====================================================
   2. CAMBIO DE TEXTO AL HACER CLIC EN UN BOTÓN
   El botón #btnChangeText alterna entre varias
   descripciones del héroe.
   ===================================================== */
function initCambioTexto() {
  const btn = document.getElementById("btnChangeText");
  const parrafo = document.getElementById("heroParagraph");
  if (!btn || !parrafo) return;

  // Lista de descripciones alternativas
  const descripciones = [
    "Desarrollador web apasionado por crear experiencias digitales únicas y accesibles.",
    "Especialista en diseño responsivo y optimización de rendimiento para la web.",
    "Amante del código limpio, el CSS moderno y las interfaces que enamoran.",
    "Creo soluciones que combinan funcionalidad, estética y usabilidad.",
  ];

  let indice = 0; // índice actual

  btn.addEventListener("click", () => {
    // Avanzar al siguiente texto (con ciclo)
    indice = (indice + 1) % descripciones.length;
    parrafo.textContent = descripciones[indice];

    // Feedback visual: animación sencilla
    parrafo.style.transition = "opacity 0.3s";
    parrafo.style.opacity = "0";

    setTimeout(() => {
      parrafo.style.opacity = "1";
    }, 150);

    showToast("Descripción actualizada");
  });
}

/* =====================================================
   3. MOSTRAR / OCULTAR PROYECTOS EXTRA
   El botón #btnToggleProjects revela el segundo grid
   ===================================================== */
function initToggleProyectos() {
  const btn = document.getElementById("btnToggleProjects");
  const extra = document.getElementById("projectsExtra");
  if (!btn || !extra) return;

  let visible = false;

  btn.addEventListener("click", () => {
    visible = !visible;

    if (visible) {
      extra.classList.remove("hidden");
      btn.textContent = "➖ Mostrar menos proyectos";
      showToast("¡Más proyectos cargados!");
    } else {
      extra.classList.add("hidden");
      btn.textContent = "➕ Mostrar más proyectos";

      // Scroll suave de regreso a la sección de proyectos
      document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* =====================================================
   4. MENÚ HAMBURGUESA (móviles)
   Alterna la clase .nav--open en el nav
   ===================================================== */
function initMenuHamburguesa() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("nav--open");

    // Accesibilidad: actualizar aria-expanded
    const abierto = nav.classList.contains("nav--open");
    toggle.setAttribute("aria-expanded", abierto);
    toggle.textContent = abierto ? "✕" : "☰";
  });

  // Cerrar el menú al hacer clic en un enlace
  nav.querySelectorAll(".nav__link").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      nav.classList.remove("nav--open");
      toggle.setAttribute("aria-expanded", false);
      toggle.textContent = "☰";
    });
  });
}

/* =====================================================
   INICIO — Ejecutar todo cuando el DOM esté listo
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  mostrarBienvenida();
  initCambioTexto();
  initToggleProyectos();
  initMenuHamburguesa();
});
