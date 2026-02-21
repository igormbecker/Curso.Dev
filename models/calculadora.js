function somar(a, b) {
  if (typeof a !== "number" || typeof b !== "number") return "Error";

  return a + b;
}

exports.somar = somar;