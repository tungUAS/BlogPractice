module.exports = (sequelize,Sequelize) => {
    return sequelize.define('role',{
        role_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        position:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false
    })
} 