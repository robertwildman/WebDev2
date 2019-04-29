console.log("Loaded in");
$('#loginb').bind("click",function(){
    window.location.replace("/api/account/login?username="+$('#username').val()+"&password="+$('#password').val());
;
});
