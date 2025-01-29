const {blogs}=require('../data/blogs.json')
async function findAll(){

    return new Promise((resolve,reject)=>{
        resolve(blogs)
    })
}
async function findOne(id){

    return new Promise((resolve,reject)=>{
        const blog=blogs.find(b=>b.id==id);
        resolve(blog || null)
    })
}
const BlogModel={
    findAll,
    findOne
}

module.exports=BlogModel