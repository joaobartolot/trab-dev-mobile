const db = require("./DaoProduto.js");

module.exports = {
  configurar: async (servidor) => {
    // Solicita a inclusão de um aluno
    servidor.get(
      "/incluir/:nome/:quantidade",
      {
        schema: {
          params: {
            nome: {
              type: "string",
            },
            quantidade: {
              type: "integer",
            },
          },
        },
      },
      module.exports.incluirProduto
    );
  },

  incluirProduto: async (request, reply) => {
    let resposta;

    if (request.params.nome) {
      resposta = await db.incluirProduto(
        request.params.nome,
        request.params.quantidade
      );
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Access-Control-Allow-Origin", "*")
        .send(resposta);
    } else {
      resposta = { erro: "nome  não informado para inclusão" };
      reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Access-Control-Allow-Origin", "*")
        .send(resposta);
    }
  },
  //---------------------------------------------------------------------//
};
