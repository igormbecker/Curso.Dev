import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Bectec <contato@bectec.com.br>",
      to: "imbjr.work@gmail.com",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "Bectec <contato@bectec.com.br>",
      to: "imbjr.work@gmail.com",
      subject: "Ultimo email enviado",
      text: "Corpo do último email.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@bectec.com.br>");
    expect(lastEmail.recipients[0]).toBe("<imbjr.work@gmail.com>");
    expect(lastEmail.subject).toBe("Ultimo email enviado");
    expect(lastEmail.text).toBe("Corpo do último email.\r\n");
  });
});
