const db = require("./DaoProduto.js");

module.exports = {
  configurar: async (servidor) => {
    servidor.delete(
      "/excluir/:id",
      {
        schema: {
          params: {
            id: {
              type: "integer",
            },
          },
        },
      },
      module.exports.excluirProduto
    );
  },

  excluirProduto: async (request, reply) => {
    let resposta;

    if (request.params.id) {
      resposta = await db.excluirProduto(request.params.id);
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Access-Control-Allow-Origin", "*")
        .send(resposta);
    } else {
      resposta = "{'erro': 'id não informado para exclusão'}";
      reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Access-Control-Allow-Origin", "*")
        .send(resposta);
    }
  },
};
