const express=require('express');
const cors = require('cors');
require('dotenv').config;
const mongoose= require( "mongoose");

const server=express();
server.use(cors());
const PORT=3001

mongoose.connect('mongodb://localhost:27017/book', {useNewUrlParser: true, useUnifiedTopology: true});

const BookSchema  = new mongoose.Schema({
    bookName:String,
    description: String,
    img:String

    
})

const Userchema = new mongoose.Schema({
    email:String,
    books:[BookSchema] 
})

const myUserModel=  mongoose.model('user',Userchema)

function seedUserColection(){
    const Ahmad=new myUserModel({
        email:'ahmad.alsyad92@gmail.com',
        books:[
            {   bookName:'Inferno ',
                description: 'Inferno is a 2013 mystery thriller novel by American author Dan Brown and the fourth book in his Robert Langdon series.',
                img:'https://m.media-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_.jpg'

            },
            {
                bookName:'Da Vinci Code ',
                description: 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown\'s second novel to include the character Robert Langdon.',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzUBVYPvdaFLd3r-pet15SWu4SwFrd-stwb1nNJKwgfKLf735rPE2QjqzWKXVGDvjFlPU&usqp=CAU'

            },
            {
                bookName:'A Thousand plendid Sun',
                description: 'A Thousand Splendid Suns is a 2007 novel by Afghan-American author Khaled Hosseini, following the huge success of his bestselling 2003 debut The Kite Runner. Mariam, an illegitimate teenager from Herat, is forced to marry a shoemaker from Kabul after a family tragedy.',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefJWRPr3Uj_sodFejFMHWS2ay64IBnuJmj87ruz5Za1xhszMPSrnrzrpap4Wy_W1mOmM&usqp=CAU'
            }
        ]
    })
    const Mohammad=new myUserModel({
        email:'mohamadzaiton@gmail.com',
        books:[
            {   bookName:'Da Vinci Code ',
                description: 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown\'s second novel to include the character Robert Langdon.',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzUBVYPvdaFLd3r-pet15SWu4SwFrd-stwb1nNJKwgfKLf735rPE2QjqzWKXVGDvjFlPU&usqp=CAU'

            },
            {
                bookName:'Da Vinci Code ',
                description: 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown\'s second novel to include the character Robert Langdon.',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzUBVYPvdaFLd3r-pet15SWu4SwFrd-stwb1nNJKwgfKLf735rPE2QjqzWKXVGDvjFlPU&usqp=CAU'

            },
            {
                bookName:'A Thousand plendid Sun',
                description: 'A Thousand Splendid Suns is a 2007 novel by Afghan-American author Khaled Hosseini, following the huge success of his bestselling 2003 debut The Kite Runner. Mariam, an illegitimate teenager from Herat, is forced to marry a shoemaker from Kabul after a family tragedy.',
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefJWRPr3Uj_sodFejFMHWS2ay64IBnuJmj87ruz5Za1xhszMPSrnrzrpap4Wy_W1mOmM&usqp=CAU'
            }
        ]
    })
    Ahmad.save()
    Mohammad.save()
    
}
// seedUserColection() ;

// create resource http:localhost:3000/books?email=x
server.get('/books',getBooks);
function getBooks(request,response){
    let emailrequest=request.query.email;
    myUserModel.find({email:emailrequest},function(err,data){
        if (err){
            console.log('don\'t match any thing')
        }else{
            response.send(data[0].books)
        }
    })
}
server.get('/test',(req,res)=>{
    res.send('This is a test route');
    
})

server.listen(PORT,()=>{
    console.log('The PORT is active')

})


/*
to use mongo server: 
sudo service mongodb start
sudo apt-get update
sudo apt-get install
mongod
mongo 
*/