const express = require("express")
const server = express()



//npm intall express
//npm install nodemon
//npm install pg




server.use(express.static('public'))

server.use(express.urlencoded({ extended: true}))





// config bd postgres (postbird)

const Pool = require('pg').Pool
const db = new Pool({

    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'doe'

})





const nunjucks = require("nunjucks")



nunjucks.configure("./", {

    express: server,
    noCache: true

})







// GET
server.get("/", function(req, res) {


    
    db.query("SELECT * FROM donors", function(err, result) {

        if(err) return res.send("Erro: " + err.message)

        const donors = result.rows



        return res.render("index.html", { donors })


        
    })
})






// POST
server.post("/", function(req, res) {


    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood


    if (name == "" || email == "" || blood == "") {

        // validação formulário
        return res.send("Todos os campos são obrigatórios.")

    }


    const query = `INSERT INTO donors 
                    ("name", "email", "blood") 
                    VALUES ($1, $2, $3)`
    
    const values = [name, email, blood]


    db.query(query, values, function(err) {

        if (err) return res.send("Erro: " + err.message)

        return res.redirect("/") 


    })




})







server.listen(3000, function() {

    console.log("server on")

})