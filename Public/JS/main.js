console.log("Loaded in");
$('#loginb').bind("click",function(){
    window.location.replace("/api/account/login?username="+$('#username').val()+"&password="+$('#password').val());
});
//Added Project
$('#addproject').click(function(){
    console.log("Sending");
    $.ajax({
        url:'/api/project/PCreate',
        type:'post',
        data:{ProjectName:$('#pname').val(), ProjectDesc:$('#pdesc').val(), ProjectDue:$('#pdatedue').val(), ProjectComp:$('#pdatecomp').val(), ProjectUserID:$('#user_id').val()},
        success:function(){
            console.log("Pushed");
        }
    });
});
//Add Milestone
$('#addmilestone').bind("click",function(){
    $.ajax({
        url:'/Car/Edit/17/',
        type:'post',
        data:$('#myForm').serialize(),
        success:function(){
            //whatever you wanna do after the form is successfully submitted
        }
    });
});