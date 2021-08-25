const router = require("express").Router();
const Catagory = require("../categories/Category");
const Articles = require("./Aticles");
const slugify = require("slugify");
const Category = require("../categories/Category");

// rota principal dos artigos
router.get("/admin/articles", (req, res)=>{
    Articles.findAll({
        include: [{model:Catagory}],
        order: [["id", "DESC"]]
    })
        .then( articles =>{
            res.render("admin/articles", {articles})
        })
});

// Passando as categorias para os artigos
router.get("/admin/articles/new", (req, res)=>{
    Catagory.findAll()
        .then(categories =>{[
            res.render("admin/articles/new", {categories})
        ]})
});

// Salvando artigo
router.post("/articles/save", (req, res)=>{
    let { categoryId, body, title } = req.body;

    Articles.create({
        title:title,
        body: body,
        slug: slugify(title),
        categoryId
    }).then(()=>[
        res.redirect("/admin/articles")
    ])
});

// Deletando arquivo
router.post("/articles/delete", (req,res)=>{
    let id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Articles.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/articles")
            })
        }else{ //NÃO FOR UMA NÚMERO
            res.redirect("/admin/articles")
        }
    }else{ // NULL
        res.redirect("/admin/articles")
    }
});

// listando valores antigos na viws
router.get("/admin/articles/edit/:id", (req, res)=>{
    let id = req.params.id;
    Articles.findByPk(id)
    .then((article)=>{
        if(article != undefined){
            Category.findAll()
                .then(categories =>{
                    res.render("admin/articles/edit", {article, categories})
                })
        }else{
            res.redirect("/admin/articles")
        }
    }).catch(erro => {
        res.redirect("/admin/articles")
    })
});

router.post("/articles/update", (req, res)=>{
    let {id, title, body, category} = req.body;
    
    Articles.update({title, body, categoryId:category, slug: slugify(title)},{
        where:{id: id}
    }).then(()=>{
        res.redirect("/admin/articles");
    }).catch(err =>{
        res.redirect("/")
    });
});






module.exports = router;