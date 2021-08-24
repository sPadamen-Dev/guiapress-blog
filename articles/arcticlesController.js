const router = require("express").Router();
const Catagory = require("../categories/Category");
const Articles = require("./Aticles");
const slugify = require("slugify");

// rota principal dos artigos
router.get("/admin/articles", (req, res)=>{
    res.send("ROTA DE artigo")
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
})

module.exports = router;