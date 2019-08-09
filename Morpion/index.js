let personnes = [];
let index = 0;
const express = require('express');
const app = express();
app.use(express.static(__dirname +'/public'))
//Request pour gérer la page d'accueil


app.get('/',function(req,res){
    //res.end("<h1>Bonjour "+ req.query.nom + " "+req.query.prenom+"</h1>");
    //Réponse http avec le rendu index.ejs et le param tableau de personne   
    res.render('index.ejs',{clePersonnes : personnes});
})

//Request pour répondre avec un formulaire 
app.get('/formulaire', function(req, res){
    res.render('formulaire.ejs',{personneVue : {}});
})

//Requete pour aller sur le morpion*
app.get('/morpion', function(req, res){
    res.render('morpion.ejs');
})

//Request qui traite le formulaire 
app.get('/addForm', function(req,res){
    //On recupere les params du get nom, et prenom et on cree une personne à ajouter dans le tableau des personnes
    if(req.query.id == '')
    {
        let personne = {
            id : index,
            nom : req.query.nom,
            prenom : req.query.prenom,
        }
        index++;
        personnes.push(personne);
    }
    else {
        let p = personnes.find(x=>x.id == req.query.id);
        p.nom = req.query.nom;
        p.prenom = req.query.prenom;
    }
    
    // une redirection vers la page d'accueil
    res.redirect('/');
})

app.get('/EditPersonne',function(req,res){
    let personne = personnes.find((p)=>p.id == req.query.id);
    res.render('formulaire.ejs',{personneVue : personne});
});
//Url pour supprimer une personne
app.get('/deletePersonne', function(req, res){

    //On cherche la personne à supprimer
    let personne = personnes.find((p)=>p.id == req.query.id);
    //On supprime la personne de notre tableau personnes en cherchant dans un premier temp l'index de la personne à supprimer 
    personnes.splice(personnes.indexOf(personne), 1);
    res.redirect('/');
})

app.get('/ajaxAddForm',function(req, res){
    if(req.query.id == '')
    {
        let personne = {
            id : index,
            nom : req.query.nom,
            prenom : req.query.prenom,
        }
        index++;
        personnes.push(personne);
    }
    else {
        let p = personnes.find(x=>x.id == req.query.id);
        p.nom = req.query.nom;
        p.prenom = req.query.prenom;
    }
    res.end('ok');
})

app.listen(4000, function(){
    console.log("new connection");
})