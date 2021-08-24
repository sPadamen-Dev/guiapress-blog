const router = require("express").Router();

router.get("/articles", (req, res)=>{
    res.send("ROTA DE artigo")
});

router.get("/admin/articles/new", (req, res)=>{
    res.send("ROTA PARA CRIAR UM NOVO ARTIGO")
})

module.exports = router;