var quantite = 0; 
var alimentsJSON = JSON.parse("plats.json"); 


function modifierQuantite(nouvelleQuantite){
    console.log("Je suis dans le script-panier"); 
    quantite = nouvelleQuantite; 
    document.getElementById("btnPanier").innerHTML = quantite;
}

document.getElementById("btnAjout").addEventListener("click", modifierQuantite(document.getElementById("btnPanier")+1)); 