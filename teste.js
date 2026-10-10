class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

function salvarUsuario(input) {
  if (!input) {
    throw new ValidationError("error-input-undefined");
  }

  if (!input.username) {
    throw new ValidationError("error-input-username-undefined");
  }

  //user.save(input);
}

try {
  salvarUsuario({
    name: "Igor Becker",
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(error);
    return;
  }

  console.log("passou do erro");
}
