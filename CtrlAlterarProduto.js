const db = require("./DaoProduto.js");

module.exports = {
  configurar: async (servidor) => {
    servidor.put(
      "/alterar/:id/:nome/:quantidade",
      {
        schema: {
          params: {
            id: {
              type: "integer",
            },
            nome: {
              type: "string",
            },
            quantidade: {
              type: "integer",
            },
          },
        },
      },
      module.exports.obterProdutos
    );
  },

  obterProdutos: async (request, reply) => {
    let resposta;

    if (request.params.id) {
      resposta = await db.obterProdutos(
        request.params.id,
        request.params.nome,
        request.params.quantidade
      );
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Access-Control-Allow-Origin", "*")
        .send(resposta);
    } else {
      resposta = "{'erro': 'id não informado para alteração'}";
      reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Access-Control-Allow-Origin", "*")
        .send(resposta);
    }
  },
};
