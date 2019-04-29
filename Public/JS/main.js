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
        url:'/api/milestone/MCreate',
        type:'post',
        data:{MilestoneName:$('#mname').val(), MilestoneDesc:$('#mdesc').val(), MilestoneDue:$('#mdatedue').val(), MilestoneComp:$('#mdatecomp').val(), MilestoneUserID:$('#user_id').val()},
        success:function(){
            console.log("Pushed");
        }
    });
});