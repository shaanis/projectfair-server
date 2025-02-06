const projects = require('../models/projectModel')


// add project 
exports.addProjectController = async(req,res)=>{
    console.log("inside projectController");
    const userId = req.userId
    console.log(userId);
    console.log(req.body);
    

    const{title,languages,overview,github,website}=req.body
    const projectimg = req.file.filename
    console.log(title,languages,overview,github,website,projectimg);
    
   try{
        const existingproject = await projects.findOne({github})
        if(existingproject){
            res.status(406).json('already exist please add another one' )
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectimg,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
   }catch(err){
    res.status(401).json(err)
   }
    
}

// get Home projects - no of need of authorization
exports.homeProjectController= async(req,res)=>{
    console.log("inside home project controller");
    try{
        const allHomeProjects= await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    }catch(e){
        res.status(401).json(e)
    }
    
}
// get all Home projects -  need of authorization
exports.allProjectController= async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        languages:{
            $regex:searchKey,$options:'i'
        }
    }
    
    console.log("inside allprojectcontroller");
    try{
        const allProjects= await projects.find(query)
        res.status(200).json(allProjects)
    }catch(e){
        res.status(401).json(e)
    }
    
}
// get user projects -  need of authorization
exports.userProjectController= async(req,res)=>{ 
    console.log("inside userprojectcontroller");
    const userId= req.userId
    try{
        const userProjects= await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(e){
        res.status(401).json(e)
    }
    
}
// update user projects -  need of authorization
exports.editProjectController= async(req,res)=>{ 
    console.log("inside editProjectcontroller");
    const id= req.params.id
    const userId = req.userId
    const {title,languages,overview,github,website,projectimg}= req.body
    const reUploadProjectImg = req.file?req.file.filename: projectimg
    try{
        const updateProject= await projects.findByIdAndUpdate({_id:id},{title,languages,overview,github,website,projectimg:reUploadProjectImg,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(e){
        res.status(401).json(e)
    }
    
}

// dlete project
exports.removeProjectController = async(req,res)=>{
    console.log("inside deleteProjectController");
    
    const{id} = req.params
    try{
     const deleteProject = await projects.findByIdAndDelete({_id:id})
     res.status(200).json(deleteProject)
    }catch(e){
        res.status(401).json(e)
    }
}