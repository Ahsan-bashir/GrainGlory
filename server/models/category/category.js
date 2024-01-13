const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const categorySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String
    },
    color:{
        type:String
    },
    image:{
        type:String,
        default:''
    }
});

categorySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

categorySchema.set('toJSON',{
    virtuals:true
});

module.exports=mongoose.model('Category',categorySchema);
