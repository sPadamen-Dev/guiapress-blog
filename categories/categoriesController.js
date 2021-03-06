const router = require("express").Router();
const Category = require("./Category");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/categories/new",adminAuth,(req, res)=>{
    res.render("admin/categories/new");
});

//salva categoria na tabela
router.post("/categories/save",adminAuth,(req, res) =>{
    let title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title),
        }).then(()=>{
            res.redirect("/admin/categories");
        })
    }else{
        res.redirect("/admin/categories/new");
    }
});

//listando categorias da tabela
router.get("/admin/categories",adminAuth,(req, res)=>{
    Category.findAll()
        .then((categories => {
            res.render("admin/categories/index", {categories});
        }))
})

//Deletar categoria
router.post("/categories/delete", adminAuth,(req,res)=>{
    let id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/categories")
            })
        }else{
            res.redirect("/admin/categories")
        }
    }else{
        res.redirect("/admin/categories")
    }
});


// Editando categoria
router.get("/admin/categories/edit/:id",adminAuth, (req, res)=>{
    let id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/categories")
    }

    Category.findByPk(id)
    .then((category)=>{
        if(category != undefined){
            res.render("admin/categories/edit", {category})
        }else{
            res.redirect("/admin/categories")
        }
    }).catch(erro => {
        res.redirect("/admin/categories")
    })
});

router.post("/categories/update", adminAuth,(req, res)=>{
    let id = req.body.id;
    let {title} = req.body;

    Category.update({title: title, slug: slugify(title)}, {where:{id}})
        .then(()=>{
            res.redirect("/admin/categories")
        })
});


module.exports = router;