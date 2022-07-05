/**
 * Módulo para manipular o banco de dados SQLite
 */

// Para acesso ao FileSystem
const fs = require("fs");

// Inicialização do Banco de Dados
const dbFile = "./.data/produto.db";
const dbExiste = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
let db;

// Solicitando a abertura do Banco de Dados
sqlite
  .open({ filename: dbFile, driver: sqlite3.Database })
  .then(async (dBase) => {
    db = dBase;
    try {
      if (!dbExiste) {
        await db.run(
          "CREATE TABLE Produto(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR[40], quantidade INTEGER)"
        );
      } else {
        console.log(await db.all("SELECT * from Produto"));
      }
    } catch (dbError) {
      console.error(dbError);
    }
  });

module.exports = {
  obterProdutos: async () => {
    try {
      let retorno = await db.all("SELECT * from Produto");
      console.log(retorno);
      return retorno;
    } catch (dbError) {
      console.error(dbError);
      return [];
    }
  },

  incluirProduto: async (nome, quantidade) => {
    try {
      let retorno = await db.run(
        "INSERT INTO Produto (nome, quantidade) VALUES (?, ?)",
        [nome, quantidade]
      );
      console.log("incluir : " + retorno);
      return retorno;
    } catch (dbError) {
      console.error(dbError);
    }
  },

  alterarProduto: async (id, nome, quantidade) => {
    try {
      let retorno = await db.run(
        "UPDATE Produto set nome = ?, quantidade = ? WHERE id = ?",
        [nome, quantidade, id]
      );
      return retorno;
    } catch (dbError) {
      console.error(dbError);
    }
  },

  excluirProduto: async (id) => {
    try {
      await db.run("DELETE from Produto WHERE id = ?", [id]);
      return true;
    } catch (dbError) {
      console.error(dbError);
    }
  },
};
