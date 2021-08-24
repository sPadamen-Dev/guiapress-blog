const express = require("express");
const app = express();
const connection = require("./databases/database") 

const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/arcticlesController"); 

const Article = require("./articles/Aticles");
const Category = require("./categories/Category")

//View engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//Body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// DataBase
connection
    .authenticate()
    .then(()=>{
        console.log("Connect success!")
    }).catch((error)=>{
        console.log(error)
    });


app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/",(req, res)=>{
    res.render("index");
})

app.listen(8080, ()=>{
    console.log("O servidor está rodando!")
})