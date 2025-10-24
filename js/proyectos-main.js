import { proyectos } from "./proyectos.js";

function crearCard(p) {
  const card = document.createElement("article");
  card.className = "p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-green-500/50 transition transform hover:scale-105";


  const img = document.createElement("img");
  img.src = p.imagen;
  img.alt = p.titulo;
  img.className = "w-full h-40 object-cover rounded-md mb-4";


  const h3 = document.createElement("h3");
  h3.className = "text-xl mb-2";
  h3.textContent = p.titulo;


  const pdesc = document.createElement("p");
  pdesc.className = "text-gray-400 mb-4";
  pdesc.textContent = p.descripcion;


  const tags = document.createElement("div");
  tags.className = "flex gap-2 flex-wrap";
  p.tags.forEach(t => {
    const span = document.createElement("span");
    span.className = "px-3 py-1 rounded-full bg-gray-800 text-sm";
    span.textContent = t;
    tags.appendChild(span);
  });


  card.appendChild(img);
  card.appendChild(h3);
  card.appendChild(pdesc);
  card.appendChild(tags);



  card.classList.add("opacity-0", "translate-y-4", "transition-all", "duration-500");
  requestAnimationFrame(() => card.classList.remove("opacity-0", "translate-y-4"));

  return card;
}

function cargarProyectos(selector = "#projects-grid") {
  const grid = document.querySelector(selector);
  if (!grid) return;
  grid.innerHTML = "";
  proyectos.forEach(p => grid.appendChild(crearCard(p)));
}


document.addEventListener("DOMContentLoaded", () => {
  cargarProyectos();
});
