$(function(){

    $("#form-inscription").submit(() => {
        if (($("#verif-champ1").val() === "") || ($("#verif-champ2").val() === "") || (!$(".verif-champ3").prop("checked"))){
            $("#verif-champ1").css("border-width","3px");
            $("#verif-champ1").css("border-color","red");

            $("#verif-champ2").css("border-width","3px");
            $("#verif-champ2").css("border-color","red");

            $(".verif-champ3").css("border-width","3px");
            $(".verif-champ3").css("border-color","red");

            return false;
        } else {
            $("#form-inscription").submit();
        } 
        
    })
  
  });