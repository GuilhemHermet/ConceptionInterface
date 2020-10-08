$(function(){

    $("#form-inscription").submit(() => {
        if (($("#verif-champ1").val() === "") || ($("#verif-champ2").val() === "") || (!$(".verif-champ3").prop("checked"))){
            $("#verif-champ1").css("border","3px solid red");

            $("#verif-champ2").css("border","3px solid red");

            $("#verif-champ3-nom").css("border-bottom","3px solid red");

        } else {
            let name = $("#name").val();
            let email = $("#email").val();
            let password = $("#verif-champ1").val();
            let passwordconfirm = $("#verif-champ2").val();
            if(password !== passwordconfirm){

                $("#verif-champ1").css("border","3px solid red");

                $("#verif-champ2").css("border","3px solid red");

                $("#form-confirm").append($("<div />").text("Les deux mots de passes doivent être les mêmes").css("color","red"));

                return false;
            }

            let json = {"name" :"", "email":"", "password":""};
            json.name=name;
            json.email=email;
            json.password=password;
            console.log(json);

            let postRequest = new Request("http://127.0.0.1:3000/", {method: 'POST', body: JSON.stringify(json)})

            fetch(postRequest)
            .then(response =>{
                if(response.status === 200){
                    console.log("La requête a atteint le serveur !");
                    $('#myModal').modal('show');
                } else {
                    throw new Error("Failed to send the request");
                }
            })  
        } 
        return false; // permet de ne pas perform l'envoi du form.
    })

    $("#retour-mission").click(()=> {
        window.location.replace("../pages/mission.html");
    })
  
  });