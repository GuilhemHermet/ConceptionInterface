function showConnexionForm(){
    //document.getElementById("TitreLeProbleme").innerHTML = "Test";
    document.getElementById("header1").innerHTML = "Test"
    document.getElementsByClassName("container").style.display = "block";
    document.body.style.backgroundColor = rgba(121, 121, 121, 1);
    //Problème: Appeler la fonction dans un fichier .html et aller chercher le id dans un autre fichier .html (ne fonctionne pas, pourquoi?)
}

function closeForm(){
    document.getElementById("connexionForm").style.display = "none";
    document.body.style.backgroundColor = "white";
}


