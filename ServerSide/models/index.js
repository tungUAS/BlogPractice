const dbConfig = require('../config/db.config')
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases:null,
    pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize,Sequelize);
db.role = require('./role.model')(sequelize,Sequelize);
db.post = require('./post.model')(sequelize,Sequelize);
db.category = require('./category.model')(sequelize,Sequelize);

db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"user_id",
    otherKey:"role_id"
});

db.role.belongsToMany(db.user,{
    through:"user_roles",
    foreignKey:"role_id",
    otherKey:"user_id"
});

db.post.belongsToMany(db.category,{
    through:"post_category",
    foreignKey:"post_id",
    otherKey:"category_id"
});

db.category.belongsToMany(db.post,{
    through:"post_category",
    foreignKey:"category_id",
    otherKey:"post_id"
});

db.user.hasMany(db.post);
db.post.belongsTo(db.user);

db.ROLES = ["user","admin"]

module.exports = db;
