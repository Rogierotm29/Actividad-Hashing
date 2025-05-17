const saludo = (req, res) => res.send("hola desde la API 3");
const ping = (req, res) => res.send("Pong!");
const marco = (req, res) => res.send("Polo!");
const toño = (req, res) => res.send("Cristiano Ronaldo regresa al madrid");

export { saludo, ping, marco, toño };