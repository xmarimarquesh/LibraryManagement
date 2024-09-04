const sequelize = require("sequelize");
const db = require("../config/db");
const Livro = require("../model/livro");
const Generolivro = require("../model/generoLivro");

module.exports = {

    // Criando livro
    async createLivro(req, res) {
        const dados = req.body;

        let foto = 'livro.png';
        console.log(dados);

        // Verificando se foi enviada alguma foto
        if (req.file) {
            // Pegar novo nome da foto
            foto = req.file.filename;
        }

        const livro = await Livro.create({
            ISBN: dados.isbn,
            Titulo: dados.titulo,
            Autor: dados.autor,
            Ano: dados.ano,
            Descricao: dados.descricao,
            Foto: foto,
            Disponibilidade: 1,
            Qts_emprestimo: 0
        });


        for (let i = 0; i < dados.genero.length; i++) {

            await Generolivro.create({
                IDGenero: dados.genero[i],
                IDLivro: livro.IDLivro

            });

        }
        res.redirect('/livrosADM');
    },
    
    async deleteLivro(req, res) {
        let id_livro = req.params.id; 
        
        await Livro.destroy({where:{IDLivro:id_livro}
        });

        res.redirect('/LivrosADM');
    },

    async updateLivro(req, res) {
        const dados = req.body;
        let id_livro = req.params.id; 

        console.log(dados)
        console.log(id_livro)

        await Livro.update({
            ISBN: dados.isbn,
            Titulo: dados.titulo,
            Autor: dados.autor,
            Ano: dados.ano,
            Descricao: dados.descricao,
            // Foto: foto,
            Disponibilidade: dados.disponibilidade,
            Qts_emprestimo: dados.qts_emprestimo
        },{
            where:{IDLivro:id_livro}
        });

        res.redirect('/LivrosADM');
    }

}
