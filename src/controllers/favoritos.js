const Favorito = require("../model/favorito");
const sequelize = require("sequelize");

module.exports = {
    async createFavoritos(req, res){
        const dados = req.body;

        const favoritoExistente = await Favorito.findOne({
            where: {
                IDUsuario: dados.id_user,
                IDLivro: dados.id_livro
            }
        })

        if( favoritoExistente ){
            await Favorito.destroy({where: {IDFavorito : favoritoExistente.IDFavorito}});
            return
        }

        await Favorito.create({
            IDUsuario: dados.id_user,
            IDLivro: dados.id_livro
        });

    }
}