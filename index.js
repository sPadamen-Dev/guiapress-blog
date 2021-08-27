const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./databases/database") 

const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/arcticlesController"); 
const userController = require("./users/UserController"); 

const Article = require("./articles/Aticles");
const Category = require("./categories/Category")

//View engine
app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: "qualquercoisa",
    cookie:{maxAge:30000}
}))

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
app.use("/", userController);

app.get("/",(req, res)=>{
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    })
        .then(articles =>{
            Category.findAll()
            .then(categories =>{
                res.render("index", {articles, categories})
            })
        })
});

// ler artigos
app.get("/:slug", (req, res) => {
    let {slug} = req.params;
    Article.findOne({where:{slug}})
        .then((article =>{
            if(article != undefined){
                Category.findAll()
                .then(categories =>{
                    res.render("article", {article, categories})
                })
            }else{
                res.redirect("/")
            }
        })).catch(err =>{
            console.log(err)
            res.redirect("/")
        })
    
});

// pesquisa categoria pelo slug e lista todos
// os artigos que fazem parte dessa categoria.
app.get("/category/:slug", (req, res)=>{
    let {slug} = req.params;
    Category.findOne({where:{slug}, include: [{model: Article}]})
        .then(category =>{
            if(category != undefined){
                Category.findAll().then(categories => {
                    res.render("index", {articles: category.articles, categories: categories}) //Passando para as views navbar e index os artigos e categorias.
                })
            }else{
                res.redirect("/")
            }
        }).catch(err =>{
            res.redirect("/")
        })
})

app.listen(8080, ()=>{
    console.log("O servidor está rodando!")
})