fetch("https://api.jsonbin.io/v3/b/YOUR_BIN_ID")
  .then(res => res.json())
  .then(data => {
    const entidades = data.record;
    mostrarEntidades(entidades);
  })
  .catch(error => {
    console.error("Error al cargar entidades:", error);
    mostrarError("No se pudo cargar la lista de entidades.");
  });
