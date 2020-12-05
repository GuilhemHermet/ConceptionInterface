$(function(){

    $("#form-inscription").submit(() => {
        if (($("#verifChamp1").val() === "") || ($("#verifChamp2").val() === "") || (!$(".verifChamp3").prop("checked"))){
            $("#verifChamp1").css("border","3px solid red");

            $("#verifChamp2").css("border","3px solid red");

            $("#verifChamp3Nom").css("border-bottom","3px solid red");

        } else {
            let name = $("#name").val();
            let email = $("#email").val();
            let password = $("#verifChamp1").val();
            let passwordconfirm = $("#verifChamp2").val();
            if(password !== passwordconfirm){

                $("#verifChamp1").css("border","3px solid red");

                $("#verifChamp2").css("border","3px solid red");

                $("#formConfirm").append($("<div />").text("Les deux mots de passes doivent être les mêmes").css("color","red"));

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

    $("#retourMission").click(()=> {
        $('#myModal').modal('hide');
        window.location.href = "../pages/mission.html";
    })
  
  });