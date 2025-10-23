let entidades = [];
let paginaActual = 1;
const porPagina = 10;
let seleccionadas = [];

fetch('entidades.json')
  .then(res => res.json())
  .then(data => {
    entidades = data;
    mostrarEntidades();
  });

function mostrarEntidades() {
  const resultados = document.getElementById('resultados');
  resultados.innerHTML = "";

  const inicio = (paginaActual - 1) * porPagina;
  const paginadas = entidades.slice(inicio, inicio + porPagina);

  paginadas.forEach(entidad => {
    resultados.innerHTML += `
      <div class="entity">
        <strong>${entidad.nombre}</strong><br>
        Proyecto: ${entidad.proyecto}<br>
        <a href="${entidad.web}" target="_blank">Web oficial</a> | 
        <a href="${entidad.transparencia}" target="_blank">Transparencia</a> | 
        <a href="${entidad.donaciones}" target="_blank">Donaciones</a>
        <br><input type="checkbox" value="${entidad.nombre}" onchange="toggleSeleccion(this)"> Comparar
      </div>
    `;
  });

  mostrarPaginacion();
}

function mostrarPaginacion() {
  const totalPaginas = Math.ceil(entidades.length / porPagina);
  const paginador = document.getElementById('paginador');
  paginador.innerHTML = "";

  if (paginaActual > 1) {
    paginador.innerHTML += `<button onclick="cambiarPagina(${paginaActual - 1})">Anterior</button>`;
  }
  paginador.innerHTML += ` Página ${paginaActual} de ${totalPaginas} `;
  if (paginaActual < totalPaginas) {
    paginador.innerHTML += `<button onclick="cambiarPagina(${paginaActual + 1})">Siguiente</button>`;
  }
}

function cambiarPagina(nuevaPagina) {
  paginaActual = nuevaPagina;
  mostrarEntidades();
}

function toggleSeleccion(checkbox) {
  const nombre = checkbox.value;
  if (checkbox.checked) {
    if (seleccionadas.length >= 3) {
      alert("Solo puedes comparar hasta 3 entidades.");
      checkbox.checked = false;
    } else {
      seleccionadas.push(nombre);
    }
  } else {
    seleccionadas = seleccionadas.filter(n => n !== nombre);
  }
}

function compararEntidades() {
  if (seleccionadas.length === 0) {
    alert("Selecciona al menos una entidad.");
    return;
  }

  const comparadas = entidades.filter(e => seleccionadas.includes(e.nombre));
  let tabla = `
    <table>
      <tr>
        <th>Entidad</th>
        <th>Proyecto</th>
        <th>Web</th>
        <th>Transparencia</th>
        <th>Donaciones</th>
      </tr>
  `;
  comparadas.forEach(entidad => {
    tabla += `
      <tr>
        <td>${entidad.nombre}</td>
        <td>${entidad.proyecto}</td>
        <td><a href="${entidad.web}" target="_blank">Web</a></td>
        <td><a href="${entidad.transparencia}" target="_blank">Ver</a></td>
        <td><a href="${entidad.donaciones}" target="_blank">Donar</a></td>
      </tr>
    `;
  });
  tabla += `</table>`;
  document.getElementById('resultados').innerHTML = tabla;
}
