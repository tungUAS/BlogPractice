module.exports = (sequelize,Sequelize) => {
    return sequelize.define('category',{
        category_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        category_title:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{
        timestamps:false
    })
}