var quantite = 0; 

function modifierQuantite(nouvelleQuantite){
    quantite = nouvelleQuantite; 
    document.getElementById("btnPanier").innerHTML = quantite;
}
