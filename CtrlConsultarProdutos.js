const db = require("./DaoProduto.js");

module.exports = {
  configurar: async (servidor) => {
    servidor.get("/", module.exports.obterProdutos);
  },

  obterProdutos: async (request, reply) => {
    let resposta = await db.obterProdutos();
    console.log("Requisição feita - Obter Alunos:" + resposta);
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .header("Access-Control-Allow-Origin", "*")
      .send(resposta);
  },
};
