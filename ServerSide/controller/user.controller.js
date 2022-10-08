const db = require('../models')
const Category = db.category;
const Post = db.post;
const User = db.user;
const Op = db.Sequelize.Op;

exports.addBlogPost = async (req,res) => {
    try{

        const newPost = await Post.create({
            userUserId:req.body.user_id,
            post_title:req.body.post_title,
            post_content:req.body.post_content
        });

        const categories = await Category.findAll({
            where:{
                category_title:{
                    [Op.or]:req.body.post_categories
                }
            }
        });

        await newPost.setCategories(categories);

        res.status(200).json("Post added successfully");

    }catch(error){
        console.log(error);
    }
}

exports.getAllBlogPostsByUserID = async (req,res) => {
    try{

    const page = req.query.page; // 1 2 3 4
    const limit = req.query.limit; // 10 

    const passedItems = (page - 1)*limit; // 0 10 20 30

        const posts = await Post.findAll({
            attributes:['post_id','post_title','post_content'],
            where:{
                userUserId:req.user_id
            },
            
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

exports.getAllBlogPostByUserIdAndCategory = async (req,res) => {
    try{

        const page = req.query.page; // 1 2 3 4
        const limit = req.query.limit; // 10 
    
        const passedItems = (page - 1)*limit; // 0 10 20 30

        const posts = await Post.findAll({
            attributes:['post_id','post_title','post_content'],
            where:{
                userUserId:req.user_id,
            },
            
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

exports.updatePost = async (req,res) => {
    try{
        await Post.update({
            post_title:req.body.post_title,
            post_content:req.body.post_content
        },{
            where:{
                post_id:req.body.post_id
            }
        })

        return res.status(200).json("Updated successfully");
    }catch(error){
        return res.status(500).json("error updating");
    }
}