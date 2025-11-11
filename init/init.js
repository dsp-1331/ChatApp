const mongoose= require("mongoose");

main()
.then(()=>{console.log("Connection successful");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeWp');
}

//require models 
const Chat= require('../models/chat.js');



//insert data into chat
let allChats=[
     {
    from:"Ragini",
    to:"Dipali",
    msg:"I am good..:)"
   
     },
    { from:"pooja",
    to:"Dipali",
    msg:"I got placed at hashdin)",
    },
     { from:"Aditi",
    to:"Sanika",
    msg:"I am enjoining my crochet challenge!!",
    },
     { from:"kunal",
    to:"manasi",
    msg:"Sorry, I am bust at my work...",
    },
     { from:"aditi",
    to:"Dipali",
    msg:"What are you doing deeps?",
    },
     { from:"ragini",
    to:"janavi",
    msg:"Tomorrow, is my social science exam.",
    },
     { from:"dipali",
    to:"sanjay",
    msg:"can i afford 2 years for study? ",
    },
     { from:"sanjay",
    to:"Dipali",
    msg:"Yes you can.",
    },
     {
    from: "Ragini",
    to: "Dipali",
    msg: "I am okay",
  },
  {
    from: "Dipali",
    to: "Pranali",
    msg: "I am feeling great",
  },
  {
    from: "Pranali",
    to: "Sonia",
    msg: "I am doing well",
  },
  {
    from: "Sonia",
    to: "Karan",
    msg: "I am feeling great",
  },
  {
    from: "Karan",
    to: "Rahul",
    msg: "I am fine",
  },
  {
    from: "Rahul",
    to: "Priya",
    msg: "I am fantastic!",
  },
  {
    from: "Priya",
    to: "Ankit",
    msg: "I am okay",
  },
  {
    from: "Ankit",
    to: "Ragini",
    msg: "I am good :)",
  },
  {
    from: "Ragini",
    to: "Dipali",
    msg: "I am good :)",
  },
  {
   from: "Dipali",
    to: "Pranali",
    msg: "I am fine",
  },
];

Chat.insertMany(allChats)
.then((res)=>{console.log(res);})
.catch((err)=>{console.log(err);});