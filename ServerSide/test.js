/* const db = require('../ServerSide/models')
const Category = db.category;
const Post = db.post;
const Op = db.Sequelize.Op;
let userId = 2;
const start = async ()=>{
 
    for(let i=1;i<100;i=i+3){
        if(i % 25 == 0){
            userId=userId+1;
        }
        const data = {
            "user_id":userId,
            "post_title":"Blog Post Title Number"+i.toString(),
            "post_content":"Forth Blog Post Love Family Content Number"+i.toString(),
            "post_categories":["love","family"]
        }
        try{
            const newPost = await Post.create({
                userUserId:data.user_id,
                post_title:data.post_title,
                post_content:data.post_content
            });

            await newPost.setCategories([1,2,3]);
            console.log("Done"+i)

        }catch(error){
            console.log(error);
        }
    } 
}

start(); */

/* addBlogPost = async (req,res) => {
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
} */