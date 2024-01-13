const Category=require('../../models/category/category');

exports.getCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json({
            success: true,
            categories: categoryList,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

exports.getCategory = async (req, res) => {
   const category=await Category.findById(req.params.id);
    if(!category){
          res.status(500).json({message:'the category with the given ID was not found!'});
    }
    res.status(200).send(category);
    
}



exports.addCategory = async (req, res) => {
    let category=new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color,
        image:req.body.image
    });
    
    category=await category.save();
    if(!category){
        return res.status(404).send('the category cannot be created!');
    }
    res.send(category);
    
}

exports.updateCategory = async (req, res) => {
   const category=await Category.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color,
        image:req.body.image
    },{new:true});

    if(!category){
        return res.status(404).send('the category cannot be updated!');
    }
    res.send(category);
  
}

exports.deleteCategory = async (req, res) => {
   Category.findByIdAndDelete(req.params.id).then(category=>{
         if(category){
              return res.status(200).json({success:true,message:'the category is deleted!'});
         }else{
              return res.status(404).json({success:false,message:'category not found!'});
         }

    }).catch(err=>{
         return res.status(500).json({success:false,error:err});
    }
    )   
}