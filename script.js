let entidades = [];
let seleccionadas = [];

// Conexión al bin externo de JSONBin.io
fetch("https://api.jsonbin.io/v3/b/YOUR_BIN_ID")
  .then(res => res.json())
  .then(data => {
    entidades = data.record;
    mostrarEntidades(entidades);
  })
  .catch(error => {
    console.error("Error al cargar entidades:", error);
    document.getElementById("mensaje-error").textContent =
      "No se pudo cargar la lista de entidades. Intenta más tarde.";
  });

// Mostrar todas las entidades al inicio
function mostrarEntidades(lista) {
  const contenedor = document.getElementById("entidades");
  contenedor.innerHTML = "";

  lista.forEach((entidad, index) => {
    const div = document.createElement("div");
    div.className = "entidad";

    div.innerHTML = `
      <h3>${entidad.nombre}</h3>
      <p><strong>Causas:</strong> ${entidad.causas.join(", ")}</p>
      <p><strong>Ámbito:</strong> ${entidad.ambito}</p>
      <p><strong>Tipo:</strong> ${entidad.tipo}</p>
      <p><strong>Proyecto:</strong> ${entidad.proyecto}</p>
      <p><a href="${entidad.web}" target="_blank">Web</a> |
         <a href="${entidad.donaciones}" target="_blank">Donar</a> |
         <a href="${entidad.transparencia}" target="_blank">Transparencia</a></p>
      <button onclick="comparar(${index})">Comparar</button>
    `;

    contenedor.appendChild(div);
  });
}

// Filtrar entidades según los selectores
function filtrarEntidades() {
  const causa = document.getElementById("causa").value;
  const ambito = document.getElementById("ambito").value;
  const tipo = document.getElementById("tipo").value;

  const filtradas = entidades.filter(entidad => {
    const coincideCausa = !causa || entidad.causas.includes(causa);
    const coincideAmbito = !ambito || entidad.ambito === ambito;
    const coincideTipo = !tipo || entidad.tipo === tipo;
    return coincideCausa && coincideAmbito && coincideTipo;
  });

  mostrarEntidades(filtradas);
}

// Comparador ético
function comparar(index) {
  if (seleccionadas.includes(index)) return;
  if (seleccionadas.length >= 3) {
    alert("Solo puedes comparar hasta 3 entidades.");
    return;
  }

  seleccionadas.push(index);
  actualizarComparador();
}

function actualizarComparador() {
  const comparador = document.getElementById("comparacion");
  comparador.innerHTML = "";

  seleccionadas.forEach(i => {
    const entidad = entidades[i];
    const div = document.createElement("div");
    div.className = "comparada";

    div.innerHTML = `
      <h4>${entidad.nombre}</h4>
      <p><strong>Causas:</strong> ${entidad.causas.join(", ")}</p>
      <p><strong>Ámbito:</strong> ${entidad.ambito}</p>
      <p><strong>Tipo:</strong> ${entidad.tipo}</p>
      <p><strong>Desgravación:</strong> ${entidad.desgravacion ? "Sí" : "No"}</p>
      <p><a href="${entidad.donaciones}" target="_blank">Donar ahora</a></p>
    `;

    comparador.appendChild(div);
  });
}
