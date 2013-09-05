function sendMessageToBuddy(){
    var buddy = new App42Buddy();
    var friendName = $(".friendNameForMessaging").find(":selected").text();
    var message = $("#messageBox").val();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.sendMessageToFriend(userNameThroughLogin || userNameThroughRegister, friendName, message, {    // Sharing Notification With Friends.
        success: function(object) {
            var messageObj = JSON.parse(object)
            var currentTime = messageObj.app42.response.buddies.buddy.sendedOn
            var timeAndDate = new Date(currentTime);
            var owner = messageObj.app42.response.buddies.buddy.userName
            $("#newMessageBar").append('<div>'+message+'</div><br>'+owner+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+timeAndDate+'<hr>')
            $.mobile.showPageLoadingMsg("a","Successfully Shared With "+friendName+" !...", "b");
            setTimeout(function (){
                $.mobile.hidePageLoadingMsg();
            },2000)
          //  window.location = ("#gameGameEndPage");
        },
        error:function(object){
            console.log(object)
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
            if(errorCode == 4604){
                $("#noFriendsToSharePopUp").popup("open");
                setTimeout(function (){
                    $("#noFriendsToSharePopUp").popup("close")
                },4000)
            }
            else {
            }
        }
    });
}

function getAllBuddiesForMessaging(){
    var buddy = new App42Buddy();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var username = (userNameThroughRegister || userNameThroughLogin);
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllFriends(username, { // Getting All Friends. 
        success:function(object){
            var requestObj = JSON.parse(object)
            var friendNameList = requestObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( friendNameList ) === '[object Array]' ){    
                for (var i = 0; i < friendNameList.length; i++){
                    var friendName = friendNameList[i].buddyName;
                    $("#selectFriendFromList").append('<option>'+friendName+'</option>');
            
                }
            }else{
                var friendName1 = friendNameList.buddyName;
                $("#selectFriendFromList").append('<option>'+friendName1+'</option>');
            }
            var myselect = $("select#selectFriendFromList");
           // myselect[0].selectedIndex = 3;
            myselect.selectmenu("refresh");
        },
        error:function(object){
            var errorObj = JSON.parse(object)
            var errorCode = errorObj.app42Fault.appErrorCode
                
            if(errorCode == 4604){
                       
                $("#friendsNotFound").show();
            }
            else {
                $("#friendsNotFound").hide();
            }
        }
    });
}

function getAllMessages(){
    var buddy = new App42Buddy();
    var friendName = $(".friendNameForMessaging").find(":selected").text();
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllMessagesFromBuddy(userNameThroughRegister || userNameThroughLogin, friendName,{  // Getting All Notificcations.
        success: function(object) {
            var notificationsObj = JSON.parse(object)
            var notification_list = notificationsObj.app42.response.buddies.buddy
            if( Object.prototype.toString.call( notification_list ) === '[object Array]' ){  
                for (var i = 0; i < notification_list.length; i++){
                    var noteName = notification_list[i].message;
                    var noteCreaterName = notification_list[i].ownerName;
                    var currentTime = notification_list[i].sendedOn;
                    var monthNames = [ "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" ];
                    var date = new Date(currentTime).getDate();
                    var Month = monthNames[new Date(currentTime).getMonth()];
                    var Year = new Date(currentTime).getFullYear();
                    var UpdatedOn = Month+"  "+date +" "+Year
//                    $("#notificationBar").append('<div>'+noteName+'</div><br>Shared By:-'+noteCreaterName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+UpdatedOn+'<hr>')
                    $("#newMessageBar").append('<div class="feedback"><img class="avatar" alt="avatar" width="35" height="35" src=""><div class="feedback-indent"><h3><a href="" title="">'+noteCreaterName+'</a> says:</h3><p class="content-meta">'+UpdatedOn+'</p><p>'+noteName+'</p></div></div>')
                }
            }else{
                var noteName1 = notification_list.message;
                var noteCreaterName1 = notification_list.userName;
                var currentTime1 = notification_list.sendedOn;
                var monthNames1 = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
                var Date1 = new Date(currentTime1).getDate();
                var Month1 = monthNames1[new Date(currentTime1).getMonth()];
                var Year1 = new Date(currentTime1).getFullYear();
                var UpdatedOn1 = Month1+"  "+Date1 +" "+Year1
//                $("#notificationBar").append('<div>'+noteName1+'</div><br>Shared By:-'+noteCreaterName1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+UpdatedOn1+'<hr>')
                $("#newMessageBar").append('<div class="feedback"><img class="avatar" alt="avatar" width="35" height="35" src=""><div class="feedback-indent"><h3><a href="" title="">'+noteCreaterName1+'</a> says:</h3><p class="content-meta">'+UpdatedOn1+'</p><p>'+noteName1+'</p></div></div>')
            }
        },
        error: function(error) {
        }
    }); 
}