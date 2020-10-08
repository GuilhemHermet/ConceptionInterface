$(function(){

    $("#form-inscription").submit(() => {
        if (($("#verif-champ1").val() === "") || ($("#verif-champ2").val() === "") || (!$(".verif-champ3").prop("checked"))){
            $("#verif-champ1").css("border","3px solid red");

            $("#verif-champ2").css("border","3px solid red");

            $("#verif-champ3-nom").css("border-bottom","3px solid red");

            return false;
        } else {
            $("#form-inscription").submit();
        } 
        
    })
  
  });