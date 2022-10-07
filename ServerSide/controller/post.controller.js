const db = require('../models')
const Category = db.category;
const Post = db.post;
const User = db.user;
const Op = db.Sequelize.Op;

exports.getAllBlogPosts = async (req,res) => {
    try{

        const page = req.query.page; // 1 2 3 4
        const limit = req.query.limit; // 10 
    
        const passedItems = (page - 1)*limit; // 0 10 20 30
    
            const posts = await Post.findAll({
                attributes:['post_id','post_title','post_content','userUserId'],
                
                include:[{
                    model:Category,
                    through:{
                        attributes:[]
                    },
                    order:['post_id','ASC']
                }],
    
                offset:parseInt(passedItems),
                limit:parseInt(limit),
                subQuery:false
            })
    
            return res.json(posts)

    }catch(error){
        return res.json(error);
    }
}

exports.getBlogPostsByCat = async (req,res) => {
    try{

        const page = req.query.page; // 1 2 3 4
        const limit = req.query.limit; // 10 
    
        const passedItems = (page - 1)*limit; // 0 10 20 30

        const posts = await Post.findAll({
            attributes:['post_id','post_title','post_content','userUserId'],
            include:[{
                model:Category,
                through:{
                    attributes:[]
                },
                where:{
                    category_title:req.query.cat
                },
                order:['post_id','ASC']
            }],

            offset:parseInt(passedItems),
            limit:parseInt(limit),
            subQuery:false
        })

        return res.json(posts)
    }catch(error){
        return res.json(error);
    }
}