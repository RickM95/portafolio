import { habilidades } from "./habilidades.js";


function crearBarraSkill(h) {
  const wrapper = document.createElement("div");
  wrapper.className = "mb-6";

  const header = document.createElement("div");
  header.className = "flex justify-between mb-2";
  header.innerHTML = `<span>${h.nombre}</span><span class="text-gray-400">${h.nivel}%</span>`;

  const barOuter = document.createElement("div");
  barOuter.className = "h-3 bg-gray-800 rounded-full overflow-hidden";

  const barInner = document.createElement("div");
  // ancho inicial 0 para animar
  barInner.className = "h-full bg-gradient-to-r from-green-500 to-emerald-600 w-0 transition-all duration-700";


  barInner.style.width = `${h.nivel}%`;

  barOuter.appendChild(barInner);
  wrapper.appendChild(header);
  wrapper.appendChild(barOuter);
  return wrapper;
}

export function cargarHabilidades(selector = "#skills-container") {
  const cont = document.querySelector(selector);
  if (!cont) return;
  cont.innerHTML = "";

  habilidades.forEach(h => {
    const node = crearBarraSkill(h);


    node.classList.add("opacity-0", "translate-y-3", "transition-all", "duration-500");
    cont.appendChild(node);



    requestAnimationFrame(() => {
      node.classList.remove("opacity-0", "translate-y-3");
    });
  });
}

export function setupMenuToggle() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(!menu.classList.contains("hidden")));
  });



  menu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      if (!menu.classList.contains("hidden")) menu.classList.add("hidden");
    })
  );
}

function showFormMessage(container, text, type = "success") {
  container.textContent = text;
  container.classList.remove("hidden");
  container.classList.add(type === "success" ? "text-green-400" : "text-red-400");
  setTimeout(() => container.classList.add("hidden"), 4000);
}

export function setupContactForm() {
  const form = document.getElementById("contact-form");
  const msgBox = document.getElementById("contact-message");
  if (!form || !msgBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.querySelector('input[name="nombre"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const asunto = form.querySelector('input[name="asunto"]').value.trim();
    const mensaje = form.querySelector('textarea[name="mensaje"]').value.trim();

    if (!nombre || !email || !mensaje) {
      showFormMessage(msgBox, "Por favor completa los campos obligatorios.", "error");
      return;
    }


    
    const mailto = `mailto:remerren@email.com?subject=${encodeURIComponent(asunto || "Contacto desde web")}&body=${encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\n${mensaje}`)}`;
    // Abrir cliente de correo
    window.location.href = mailto;
    showFormMessage(msgBox, "Se abrió tu cliente de correo. Si no, copia el mensaje y envíalo manualmente.", "success");
    form.reset();
  });
}

export function initIndex() {
  cargarHabilidades();
  setupMenuToggle();
  setupContactForm();
}

document.addEventListener("DOMContentLoaded", initIndex);
