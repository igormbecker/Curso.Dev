export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Unexpected internal error", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Please contact the support team.";
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Service unavailable", {
      cause,
    });
    this.name = "ServiceError";
    this.action = "Please check if the service is available.";
    this.statusCode = 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Method not allowed");
    this.name = "MethodNotAllowedError";
    this.action = "Method not allowed";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
