const express= require("express");
const app= express();

const mongoose= require("mongoose");
const mongo_url="mongodb://127.0.0.1:27017/fakeWp";

// import custom error handler
const CustomError= require("./customError");

async function main() {
    await mongoose.connect(mongo_url);
}
//public 
//set ejs
const path= require("path");
app.use(express.static(path.join(__dirname,"public")));

//method -override setup
const methodOverride= require("method-override");
app.use(methodOverride("_method"));

// setup for ejs-mate
const ejsMate= require("ejs-mate");
app.engine('ejs',ejsMate);

app.set("views",path.join(__dirname, "views"));
app.set("view engine","ejs");

//to parse the data from url
app.use(express.urlencoded({extended:true}));


//require models 
const Chat= require('./models/chat.js');

main()
.then(()=>{console.log("Database connection successful.");})
.catch((err)=>{console.log(err);});

app.listen(8080,()=>{
    console.log("Listening on port 8080");
});


app.get("/",(req,res)=>{
    console.log("Hello user welcome home root");
    // throw new  CustomError(404, "This page is not available");
    res.send("Success");
});


//all chats route
app.get("/allChats",async(req,res)=>{
    let chats=await Chat.find();
   
    res.render("chatting/allChats.ejs",{chats});
    // console.log(chats);
});




//Create new Chat route- render form
app.get("/allChats/new",(req,res)=>{
    console.log("New form");
    res.render("./chatting/newChat.ejs");
});

//save new chat
app.post("/allChats",async(req,res)=>{
    console.log(req.body);
    let{from,to,msg}= req.body;
    let newChat= new Chat({from: from,
        to:to, msg:msg, created_at: new Date()
    });
    
    
    // newChat.save()
    // .then((res)=>{console.log(res);})
    // .catch((err)=>{console.log(err);});
    // console.log("New chat is saved");

    //save with await
    try{
        await newChat.save();
        console.log("New chat data is successfully saved into the db");
        res.redirect("/allChats");
    }catch(error){
        console.log(error);
        res.status(400).send("Error saving chat due to validation or db issue");
    }
    
   
});

app.get("/allChats/:id",async(req,res,next)=>{
    let{id}= req.params;
    console.log("Id: ", id);
    let chat= await Chat.findById(id);
    if(!chat){
         next( new CustomError(407, "Sorry this chat might be deleted or not exists"));
    }
    res.render("./chatting/edit.ejs",{chat});
})

//edit chat- render the edit form 
app.get("/allChats/:id/edit",async(req,res)=>{
    console.log(req.params);
    let {id}= req.params;
    let chat= await Chat.findById(id);
    res.render("./chatting/edit.ejs",{chat});
});

//Update chat
app.put("/allChats/:id",async(req,res)=>{
    let {id}= req.params;
    let {msg:newMsg}= req.body;

    // if(newMsg.length>50){
    //     newMsg= newMsg.substring(0,50);
    // }
    
   try{
      await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true, new:true});
   
    res.redirect("/allChats");
   }
   catch(error){
    console.log(error);
    res.status(400).send("Your message is too long to send! Max 50 characters are allowed!!");
   }
    
});

//delete chat

app.delete("/allChats/:id",async(req,res)=>{
    let {id}=req.params;
    console.log("ID: ", id);
    let deleteChat=await Chat.findByIdAndDelete(id);
    res.redirect("/allChats");
    console.log("Deleted chat: ", deleteChat);
});


// Error handling middleware
app.use((err,req,res,next)=>{
    console.log(err);
    let{status=500,msg="chat not found"}= err;
    
    res.status(status).send(msg);
});