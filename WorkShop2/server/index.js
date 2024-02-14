const axios = require ('axios')
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: "*"
}));

//routes
app.get('/tipocambio', async (req, res) => {
  try {
      // const currency = req.query.currency;
      const ajaxRequestCurrencies = new XMLHttpRequest(); // AJAX
            ajaxRequestCurrencies.addEventListener("load", completedCurrencies);
            ajaxRequestCurrencies.addEventListener("error", errorCurrencies);
            ajaxRequestCurrencies.open("GET", "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/lak/usd.json");
            ajaxRequestCurrencies.send();
  } catch (error) {
      console.error('Error al obtener el tipo de cambio:', error);
      res.status(500).json({ error: 'Error al obtener el tipo de cambio' });
  }
});

app.get('/paises', async (req, res) => {
  try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      res.json(data);
  } catch (error) {
      console.error('Error al obtener los países:', error);
      res.status(500).json({ error: 'Error al obtener los países' });
  }
});

app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`))

// Ruta para manejar las solicitudes POST en /paises
app.post('/paises', async (req, res) => {
  const currency = req.body.selection;
  console.log("Currency selected:", currency);

  try {
    const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`);

    dolarValue = response.data[currency].usd;
    eurValue = response.data[currency].eur;

    console.log("dolar: ", dolarValue, " euro: ", eurValue);

    // Enviar una respuesta al cliente si es necesario
    res.send('Datos recibidos en el servidor.');

    // Desencadenar la ejecución de la ruta GET /result después del procesamiento del POST /paises
    triggerResultRoute();

  } catch (error) {
    console.error("Error en la solicitud GET /paises:", error);
    res.status(500).send('Error en el servidor.');
  }
});
