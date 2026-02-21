const calculadora = require("../models/calculadora.js");

test("soma de 1 + 2 deve ser igual a 3", () => {
  const result = calculadora.somar(1, 2);
  expect(result).toBe(3);
});

test("soma de 2 + 2 deve ser igual a 4", () => {
  const result = calculadora.somar(2, 2);
  expect(result).toBe(4);
});

test("soma de 5 + 100 deve ser igual a 105", () => {
  const result = calculadora.somar(5, 100);
  expect(result).toBe(105);
});

test("soma 'banana' + 100 deve ser igual a 'Erro'", () => {
  const result = calculadora.somar("banana", 100);
  expect(result).toBe("Error");
});