//Ouvrir une connection websocket vers le serveur websocket
const socket = io.connect('http://192.168.137.1:4001')
let sendBouton = document.querySelector("#sendBouton");
let message = document.querySelector("#message");
let result = document.querySelector("#result");
let validerPseudo = document.querySelector("#validerPseudo");
let pseudo = document.querySelector("#pseudo");
let monPseudo;
validerPseudo.onclick = function(e)
{
    monPseudo = pseudo.value;
    socket.emit('new_pseudo',pseudo.value);
    pseudo.style.display = "none";
    validerPseudo.style.display = 'none';
}
sendBouton.onclick = function(e)
{
    //On envoie le message au serveur websocket pour relais aux autre client websocket sur le canal message
    socket.emit('message',message.value);
    result.innerHTML+="<div>"+monPseudo + " : "+message.value+"</div>";
    message.value = '';
}

//Ecouter le canal message et afficher si un nouveau message arrive par le serveur websocket
socket.on('message',function(objet){
    console.dir(objet);
    result.innerHTML+="<div>"+objet.pseudo+" : "+objet.message+"</div>";
})
//Pour envoyer formulaire en AJAX
let monForm  = document.querySelector('#monForm');
let id = monForm.querySelector('input[name="id"]');
let nom = monForm.querySelector('input[name="nom"]');
let prenom = monForm.querySelector('input[name="prenom"]');
monForm.addEventListener('submit',function(e){
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    //ajouter false en 3 eme args pour request synchrone
    xhr.open("GET",'http://localhost:4000/ajaxAddForm?id='+id.value+"&nom="+nom.value+"&prenom="+prenom.value);
    //Envoie de la requette
    xhr.send(null);
    //Ecouter le changement d'etat de la request
    xhr.onreadystatechange = function(state){
        //Si la l'etat de la request est à 4 (Réponse du serveur ) et la code réponse et 200
        if(xhr.readyState == 4 && xhr.status == 200){
            //reponse sous forme XML on utilise la props responseXML
            //reponse sous autre forme on utilise responseText
            if(xhr.responseText == 'ok')
            {
                //Si la réponse est égale à 'ok' on fait une redirection vers l'accueil
                window.location = '/';
            }
        }
    }
})


const jeu = document.querySelector(".jeu");
let html = '';
for (let i = 1; i <= 3; i++) {
    html += "<div class='row'>";
    for (let j = 1; j <= 3; j++) {
        html += "<div class='col bloc' data-ij= " + i + '-' + j + " data-i = " + i + " data-j = " + j + "></div>";
    }
    html += "</div>";
}
jeu.innerHTML = html;
let firstClick = true;
jeu.addEventListener('click', function (e) {
    if (e.target.innerText == '') {
        if (firstClick) {
            e.target.innerText = "X";

        }
        else {
            e.target.innerText = "O";
        }
        firstClick = !firstClick;
        let x = e.target.getAttribute("data-i");
        let y = e.target.getAttribute("data-j");
        let win = true;
        let cases = document.querySelectorAll(".bloc[data-i='" + x + "']");
        for (let c of cases) {
            if (c.innerText != e.target.innerText) {
                win = false;
                break;
            }
        }
        if (!win) {
            //test sur col
            win = true;
            cases = document.querySelectorAll(".bloc[data-j='" + y + "']");
            for (let c of cases) {
                if (c.innerText != e.target.innerText) {
                    win = false;
                    break;
                }
            }
            if (!win) {
                //test 1 diag
                for (let i = 1; i <= 3; i++) {
                    for (let j = 1; j <= 3; j++) {
                        if (i - j == x - y && x - y == 0) {
                            win = true;
                            let element = document.querySelector(".bloc[data-ij='" + i + "-" + j + "']");
                            if (element.innerText != e.target.innerText) {
                                win = false;
                            }
                        }
                    }
                }
                if (!win) {
                    for (let i = 1; i <= 3; i++) {
                        for (let j = 1; j <= 3; j++) {
                            if (i + j == parseInt(x) + parseInt(y) && i + j == 4) {
                                win = true;
                                let element = document.querySelector(".bloc[data-ij='" + i + "-" + j + "']");
                                if (element.innerText != e.target.innerText) {
                                    win = false;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (win) {
            alert("Bravo");
        }
    }

});