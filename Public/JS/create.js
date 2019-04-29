console.log("Loaded in");
$('#createb').bind("click",function(){
    window.location.replace("/api/account/create?username="+$('#username').val()+"&password="+$('#password').val());
;
});
