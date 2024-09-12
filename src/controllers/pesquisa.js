const Usuario = require("../model/usuario");
const Livro = require("../model/livro");
const Favorito = require("../model/favorito");
const Emprestimo = require("../model/emprestimo");
const Genero = require("../model/genero");
const GeneroLivro = require("../model/generoLivro");
const { Op } = require("sequelize");


module.exports = {
    async pesquisarLivro(req, res){
        const dados = req.query;
        const item = dados.itemPesquisado;

        if(item){
            const livroPesquisado = await Livro.findAll({
                attributes: ['Titulo', 'Autor'],
                [Op.or]: [
                    { Titulo: { [Op.like]: `%${item}%` } },
                    { Autor: { [Op.like]: `%${item}%` } }
                ]
            });

            const genero = await Genero.findAll({
                attributes: ['IDGenero', 'Tipo'],
                raw: true 
            });
    
            const genero_livro = await GeneroLivro.findAll({
                attributes: ['IDGeneroLivro', 'IDGenero', 'IDLivro'],
                include: [{
                    model: Genero,
                    attributes: ['Tipo']
                }]
            });
    
            return res.render('../views/livrosADM', { genero : genero, livro : livroPesquisado, genero_livro : genero_livro});
        
        }

        const livro = await Livro.findAll({
            attributes: ['IDLivro', 'ISBN', 'Titulo', 'Autor', 'Ano', 'Descricao', 'Foto', 'Disponibilidade', 'Qtd_emprestimo'],
            raw: true 
        });

        const genero = await Genero.findAll({
            attributes: ['IDGenero', 'Tipo'],
            raw: true 
        });

        const genero_livro = await GeneroLivro.findAll({
            attributes: ['IDGeneroLivro', 'IDGenero', 'IDLivro'],
            include: [{
                model: Genero,
                attributes: ['Tipo']
            }]
        });

        res.render('../views/livrosADM', { genero : genero, livro : livro, genero_livro : genero_livro});

    }
}