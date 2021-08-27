const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/users",adminAuth, (req, res)=>{
    User.findAll().then(users => {
        res.render("admin/users/index", {users})
    })
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

// criando usuario admin
router.post("/users/create", (req, res)=>{
    let {email, password} = req.body;

    User.findOne({where:{email}})
    .then((user)=>{

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password,salt);

        if(user == undefined){
                User.create({
                    email,
                    password: hash
            
                }).then(()=>{
                    res.redirect("/admin/users");
                }).catch((err)=>{
                    res.redirect("/");
                });
            }else{
                res.redirect("/admin/users/create")
            }
        })


})

// login de usuario
router.get("/login",(req, res) => {
    res.render("admin/users/login")
});

router.post("/authenticate", (req,res) =>{
    let { email, password } = req.body;

    User.findOne({where:{email}})
        .then(user => {
            if(user != undefined){ //Se existe um usuário com esse e-mail
                let correct = bcrypt.compareSync(password, user.password);
                if(correct){
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                    res.redirect("admin/articles")
                }else{
                    res.redirect("/login")
                }
            }else{
                res.redirect("/login")
            }
        })
})

// logout

router.get("/logout" ,(req, res) =>{
    req.session.user = undefined;
    res.redirect("/login")
})

module.exports = router;