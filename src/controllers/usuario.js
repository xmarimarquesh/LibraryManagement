const sequelize = require("sequelize");
const Usuario = require("../model/usuario");
const { createHash } = require("crypto");
const { Op } = require('sequelize');
const Emprestimo = require("../model/emprestimo");

module.exports = {

    async createUser(req, res){
        const dados = req.body;
        console.log(dados);

        const usuarioExistente = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { Email: dados.email },
                    { CPF: dados.cpf }
                ]
            }
        });
        
        if(usuarioExistente){
            if (usuarioExistente.Email == dados.email) {
                req.session.successMessage = 'Email já cadastrado!';
                return res.redirect("/");
            }else if (usuarioExistente.CPF == dados.cpf) {
                req.session.successMessage = 'CPF já cadastrado!';
                return res.redirect("/");
            }
        }

        console.log(dados.admin)
        
        if (dados.admin) {
            await Usuario.create({
                Nome: dados.nome,
                CPF: dados.cpf,
                DataNascimento: dados.data_nasc,
                Telefone: dados.telefone,
                Email: dados.email,
                Genero: dados.sexo,
                Senha: createHash('sha256').update("123456").digest('hex'),
                Ativo: 1,
                Admin: dados.admin
            });
        
            req.session.successMessage = 'Usuario registrado com sucesso!';
            return res.redirect("/usuariosADM");
        }
        
        senhaCriptografada = createHash('sha256').update(dados.senha).digest('hex')
        
        await Usuario.create({
            Nome: dados.nome,
            CPF: dados.cpf,
            DataNascimento: dados.data_nasc,
            Telefone: dados.telefone,
            Email: dados.email,
            Genero: dados.sexo,
            Senha: senhaCriptografada,
            Ativo: 1,
            Admin: 0
        });
        
        req.session.successMessage = 'Registrado com sucesso!';
        res.redirect("/");
        
    },
    
    async verificarUser(req, res){
        const dados = req.body;
        console.log(dados);  // Verifica os dados recebidos
        
        const usuarios = await Usuario.findOne({
            raw: true,
            attributes: ['IDUsuario', 'Email', 'Senha', 'Admin', 'Ativo'],
            where: { Email : dados.email_login  }
        });
        
        if (usuarios && usuarios.Ativo == 1) {

            if (createHash('sha256').update(dados.senha_login).digest('hex') == usuarios.Senha) {
                
                req.session.IDUsuario = usuarios.IDUsuario;
                req.session.isLoggedIn = true;
                
                if(usuarios.Admin == 1){
                    req.session.Admin = 1;
                    return res.redirect("/livrosADM");
                }
                
                req.session.Admin = 0;
                return res.redirect("/inicio");
                
            } else {
                return res.redirect("/");
            }
        } else {
            return res.redirect("/");
        }
    },
    
    async updateUser(req, res){
        const dados = req.body;
        
        await Usuario.update({
            Nome: dados.nome,
            CPF: dados.cpf,
            DataNascimento: dados.data_nasc,
            Telefone: dados.telefone,
            Email: dados.email,
            Genero: dados.sexo,
            Senha: dados.senha,
            Ativo: 1,
            Admin: 0
        },{
            where: { IDUsuario: req.session.IDUsuario }
        });

        req.session.successMessage = 'Informações atualizadas com sucesso!';
        
        res.redirect('/');
    },
    
    async updateUserADM(req, res){
        const dados = req.body;
        let id_user = req.params.id;
        
        console.log("editar");
        
        await Usuario.update({
            Nome: dados.nome,
            CPF: dados.cpf,
            DataNascimento: dados.data_nasc,
            Telefone: dados.telefone,
            Email: dados.email,
            Genero: dados.sexo,
            Ativo: 1,
            Admin: dados.admin
        },{
            where: { IDUsuario: id_user }
        });
        
        req.session.successMessage = 'Informações do usuário atualizadas com sucesso!';

        res.redirect('/usuariosADM');
    },

    async deleteUser(req, res) {
        let id_user= req.params.id; 

        await Emprestimo.destroy({
            where : {IDUsuario : id_user}
        });
        
        await Usuario.update({
            Ativo: 0
        },{
            where: { IDUsuario: id_user }
        });

        req.session.successMessage = 'Usuário deletado com sucesso!';
        
        if(id_user == req.session.IDUsuario){
            return res.redirect('/logout');
        }

        res.redirect('/usuariosADM');
    },

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}


