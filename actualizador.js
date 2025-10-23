const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function extraerEntidadesBOE() {
  const url = 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-11407';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const entidades = [];

  $('p').each((i, el) => {
    const texto = $(el).text();
    if (texto.includes('Asociación') || texto.includes('Fundación')) {
      const nombre = texto.split(',')[0].trim();
      entidades.push({
        nombre,
        causas: [],
        ambito: "espana",
        tipo: nombre.includes('Fundación') ? "fundacion" : "asociacion",
        proyecto: "",
        web: "",
        donaciones: "",
        transparencia: "",
        validacion: "Ministerio del Interior",
        desgravacion: true
      });
    }
  });

  fs.writeFileSync('data/entidades.json', JSON.stringify(entidades, null, 2));
  console.log(`✅ Generadas ${entidades.length} entidades desde BOE`);
}

extraerEntidadesBOE();
