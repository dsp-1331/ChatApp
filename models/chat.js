const mongoose= require("mongoose");
//create schema
const chatSchema= new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        maxLength:50,
    },

    created_at:{
        type:Date, 
        default:Date.now
    },

    updated_at:{
        type:Date,
        
    }


    
});

// Automatically update 'updated_at' whenever a chat is modified
chatSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updated_at: new Date() });
  next();
});

//create model
const Chat= mongoose.model("Chat", chatSchema);

module.exports=Chat;