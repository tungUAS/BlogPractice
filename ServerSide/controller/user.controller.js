const db = require('../models')
const Category = db.category;
const Post = db.post;
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

exports.getAllBlogPosts = async (req,res) => {
    try{
        const posts = await Post.findAll({
            where:{
                userUserId:{
                    [Op.eq]:req.user_id
                }
            }
        })

        return res.json(posts)
    }catch(error){
        console.log(error);
    }
}
