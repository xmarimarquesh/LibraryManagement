const Livro = require("../model/livro");
const Generolivro = require("../model/generoLivro");
const genero = require("../model/genero");
const Emprestimo = require("../model/emprestimo");
const fs = require('fs');

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
            Qtd_emprestimo: 0,
            Destaque: dados.destaque
        });
        
        if(typeof(dados.genero) != 'string'){
            for (let i = 0; i < dados.genero.length; i++) {
                await Generolivro.create({
                    IDGenero: dados.genero[i],
                    IDLivro: livro.IDLivro 
                });
            }
        }else{
            await Generolivro.create({
                IDGenero: dados.genero,
                IDLivro: livro.IDLivro 
            });
        }

        req.session.successMessage = 'Livro adicionado com sucesso!';

        res.redirect('/livrosADM');
    },
    
    async deleteLivro(req, res) {
        let id_livro = req.params.id; 
        
        await Emprestimo.destroy({
            where : {IDLivro : id_livro}
        });

        await Livro.destroy({
            where:{IDLivro:id_livro}
        });

        await Generolivro.destroy({
            where: { IDLivro: id_livro } 
        });

        req.session.successMessage = 'Livro deletado com sucesso!';

        res.redirect('/LivrosADM');
    },

    async updateLivro(req, res) {
        const dados = req.body;
        let id_livro = req.params.id; 

         // Se foi enviado alguma foto
         if (req.file) {
            // Recebendo a antiga foto do aluno
            const antigaFoto = await Livro.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDLivro: id_livro }
            });

            // Excluindo a foto da pasta
            if (antigaFoto[0].Foto != 'livro.png') fs.unlink(`/public/img/capas/${antigaFoto[0].Foto}`, (err => { if (err) console.log(err); }));
            // Update da nova foto no DB
            
            await Livro.update(
                { Foto: req.file.filename },
                { where: { IDLivro: id_livro} }
            );
        }

        await Livro.update({
            ISBN: dados.isbn,
            Titulo: dados.titulo,
            Autor: dados.autor,
            Ano: dados.ano,
            Descricao: dados.descricao,
            Disponibilidade: dados.disponibilidade,
            Qtd_emprestimo: dados.qtd_emprestimo,
            Destaque: dados.destaque
                
        },
        
        {
            where:{IDLivro:id_livro}
        });

        req.session.successMessage = 'Livro atualizado com sucesso!';
        await Generolivro.destroy({ 
            where: { IDLivro: id_livro } 
        });

        for (let i = 0; i < dados.genero.length; i++) {
            await Generolivro.create({
                IDGenero: dados.genero[i],
                IDLivro: id_livro
            });
        }

        res.redirect('/LivrosADM');
    }

}
