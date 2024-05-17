const ProductManager = require("./calculadora.js");

const bono = new ProductManager();

console.log(bono.addBono('AL30', 'Dolares', '2021-07-09', '2030-07-09', '2024-07-09', '2027-07-09'));
console.log(bono.getBono());
//console.log(bono.getBonoById(1));