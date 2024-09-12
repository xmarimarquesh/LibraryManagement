const Emprestimo = require("../model/emprestimo");
const Usuario = require("../model/usuario");
const Livro = require("../model/livro");
const sequelize = require("sequelize");

module.exports = {
    
    async createEmprestimo(req, res) {
        const dados = req.body;
            const usuario = await Usuario.findOne({
                raw: true,
                attributes: ['IDUsuario'],
                where: { CPF: dados.cpf }
            });
    

        const livro = await Livro.findOne({
            raw: true,
            attributes: ['IDLivro', 'Disponibilidade'],
            where: { ISBN : dados.isbn }
        });

        if(livro && usuario && (livro.Disponibilidade == 1)){
            await Emprestimo.create({
                DataEmprestimo: dados.data_emprestimo,
                DataDevolucao: dados.data_devolucao,
                Multa: dados.multa,
                IDUsuario: usuario.IDUsuario,
                IDLivro: livro.IDLivro,
                Devolvido: 0
            });

            await Livro.increment('Qtd_emprestimo', {
                by: 1,
                where: { IDLivro: livro.IDLivro }
            });
            
            await Livro.update({ Disponibilidade: 0 },{ where: { IDLivro : livro.IDLivro }})

            req.session.successMessage = 'Empréstimo efetuado com sucesso!';
            
            return res.redirect('/emprestimosADM');

        }else if(livro && livro.Disponibilidade == 0){
            req.session.successMessage = 'Falha ao efetuar empréstimo: Livro indisponível!';
        }else if(!usuario){
            req.session.successMessage = 'Falha ao efetuar empréstimo: CPF inválido!';
        }else if(!livro){
            req.session.successMessage = 'Falha ao efetuar empréstimo: ISBN inválido!';
        }else{
            req.session.successMessage = 'Falha ao efetuar empréstimo: ISBN e CPF inválidos!';
        }


        return res.redirect('emprestimosADM');


    },
    
    
    async updateEmprestimo(req, res) {
        const dados = req.body;
        let id_emp = req.params.id; 

        const usuario = await Usuario.findOne({
            raw: true,
            attributes: ['IDUsuario'],
            where: { CPF : dados.cpf }
        });
        
        const livro = await Livro.findOne({
            raw: true,
            attributes: ['IDLivro'],
            where: { ISBN : dados.isbn }
        });

        if(livro && usuario){
            await Emprestimo.update({
                DataEmprestimo: dados.data_emprestimo,
                DataDevolucao: dados.data_devolucao,
                Multa: dados.multa,
                IDUsuario: usuario.IDUsuario,
                IDLivro: livro.IDLivro
            },{
                where:{IDEmprestimo : id_emp}
            });
        }

        req.session.successMessage = 'Empréstimo atualizado com sucesso!';

        res.redirect('/emprestimosADM');
    },

    async devolucao(req, res) {
        let id_emprestimo = req.params.id; 

        const emprestimo = await Emprestimo.findOne({
            raw: true,
            attributes: ['IDLivro'],
            where: { IDEmprestimo : id_emprestimo }
        });

        const livro = await Livro.findOne({
            raw: true,
            where: { IDLivro : emprestimo.IDLivro }
        });
        
        await Emprestimo.update({
            Devolvido: 1
        },{
            where: { IDEmprestimo: id_emprestimo }
        });

        await Livro.update({ 
            Disponibilidade: 1     
        },{ 
                where: { IDLivro : livro.IDLivro }
        });

        req.session.successMessage = 'Devolução efetuada com sucesso!';

        res.redirect('/emprestimosADM');
    }


};
