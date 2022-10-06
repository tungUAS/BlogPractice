module.exports = (sequelize,Sequelize) => {
    return sequelize.define('post',{
        post_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        post_title:{
            type:Sequelize.STRING,
            allowNull:false
        },
        post_content:{
            type:Sequelize.TEXT,
            allowNull:false
        }
    })
}