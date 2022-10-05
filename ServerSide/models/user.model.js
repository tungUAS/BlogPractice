module.exports = (sequelize,Sequelize) => {
    return sequelize.define('user',{
        user_id:{
            type:Sequelize.INTEGER,
            unique:true,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        user_name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        user_email:{
            type:Sequelize.STRING,
            allowNull:false
        },
        user_password:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false
    })
}