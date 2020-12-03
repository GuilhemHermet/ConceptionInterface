$(function(){

    $("#connexion").click(() => {
        let username = $("#username").val();
        let password = $("#password").val();
        
        if(username == "Samuel" && password == "007"){
            window.location.href = "../pages/frigos.html";
        } else {
            $("#password").css("border","3px solid red");
        }
    })
});