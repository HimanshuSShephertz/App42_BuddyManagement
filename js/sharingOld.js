/* 
 * For Managing Storage Service.
 */


/* 
 * Identifies That The LoggedIn User Wants To Share Notification With Whome, "Friends" OR "Groups".
 */
function createNote(){
    var shareWithName = $(".mySelect").find(":selected").text();
    
    if(shareWithName == "Friends"){
        getAllBuddiesForSharing ();    // If LoggedIn User Wants To Share Notification With his/her Friends.
       
    }else{
        var owner = document.getElementById(shareWithName).innerHTML;
        getAllBuddiesForSharingInGroup (shareWithName, owner)   // If LoggedIn User Wants To Share Notification With his/her Particular Group Members.
    }
    
}

/* Create Notification,
 * Store Notification.
 * By Using App42 Storage Service (insertJSONDocument); 
 * Sharing Notification With All Friends Of LoggedIn User.
 */
function getAllBuddiesForSharing (){
    var buddy = new App42Buddy();
    var storage  = new App42Storage();
    var noteName = $("#createNotificationBox").val();
    var buddiesList = new Array();
    var aclListRevoke = new Array();
    var point1={
        user:"PUBLIC",
        permission:Permission.READ
    };
    aclListRevoke.push(point1)
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllFriends(userNameThroughLogin || userNameThroughRegister, {   // Getting All Friends For Sharing Notification.
        success:function(object){
            var buddyObj = JSON.parse(object);
            var buddyNameList = buddyObj.app42.response.buddies.buddy
            for(var i=0; i < buddyNameList.length; i++){
                var buddyName = buddyNameList[i].buddyName
                var point={
                    user:buddyName,
                    permission:Permission.READ
                };
                buddiesList.push(point);         // Push All Friends In An Array Named "buddiesList".
            }
            var buddyNameThroughRegister  = $.session.get('loggedInName');
            var buddyNameThroughLogin  = $.session.get('loggedInNameViaLogin');
            var owner = (buddyNameThroughRegister || buddyNameThroughLogin);
            var sessionIdViaRegister = $.session.get('loggedInSessionId');
            var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
            var dbName = "NotificationList";     // dbName
            var collectionName = "NewNote";        // collectionName
            var json = "{\"NOTE\":'"+noteName+"',\"OWNER\":'"+owner+"'}";  // Setting Keys And Values.
            storage.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
            storage.insertJSONDocument(dbName, collectionName, json,{    // Storing Notification.
                success: function(object) {
                    var storageObj = JSON.parse(object)
                    var message = storageObj.app42.response.storage.jsonDoc.NOTE
                    var owner1 = storageObj.app42.response.storage.jsonDoc.OWNER
                    var noteId = storageObj.app42.response.storage.jsonDoc._id.$oid
                    var currentTime = storageObj.app42.response.storage.jsonDoc._$createdAt
                    var timeAndDate = new Date(currentTime);
                    $("#notificationBar").append('<div>'+message+'</div><br>'+owner1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+timeAndDate+'<hr>')
                    storage.revokeAccessOnDoc(dbName, collectionName, noteId, aclListRevoke, {    // Revoke Access From "Public", So That No One Can See This Notification Except LoggedIn User.
                        success: function(object) {
                            storage.grantAccessOnDoc(dbName, collectionName, noteId, buddiesList,{ // Grant Access For Friends ("buddiesList"), So That Only They Can See This Notification.
                                success: function(object) {
                                            window.location = ('#notificationsPage');
                                            ReloadPage();
                                },
                                error: function(error) {
                                }
                            }); 
                        },
                        error: function(error) {
                        }
                    }); 
                },
                error: function(error) {
                }
            }); 
        },
        error:function(object){
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

/* Create Notification,
 * Store Notification.
 * By Using App42 Storage Service (insertJSONDocument); 
 * Sharing Notification With All Friends In An Desired Given Group Of LoggedIn User.
 */
function getAllBuddiesForSharingInGroup(availGroupName, availOwnerName){
    var buddy = new App42Buddy();
    var storage  = new App42Storage();
    var noteName = $("#createNotificationBox").val();
    var buddiesList = new Array();
    var aclListRevoke = new Array();
    var point1={
        user:"PUBLIC",
        permission:Permission.READ
    };
    aclListRevoke.push(point1);
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllFriendsInGroup(userNameThroughLogin || userNameThroughRegister, availOwnerName, availGroupName,{   // Getting All Friends In An Particalar Group For Sharing Notification.
        success:function(object){
            var shareGroupObj = JSON.parse(object)
            var groupNameList = shareGroupObj.app42.response.buddies.buddy
            for (var i = 0; i < groupNameList.length; i++){
                var buddyNameInGroup = groupNameList[i].buddyName;
                var point={
                    user:buddyNameInGroup,
                    permission:Permission.READ
                };
                buddiesList.push(point);   // Push All Friends In An Array Named "buddiesList".
            }
            var buddyNameThroughRegister  = $.session.get('loggedInName');
            var buddyNameThroughLogin  = $.session.get('loggedInNameViaLogin');
            var owner = (buddyNameThroughRegister || buddyNameThroughLogin);
            var sessionIdViaRegister = $.session.get('loggedInSessionId');
            var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
            var dbName = "NotificationList";
            var collectionName = "NewNote";
            var json = "{\"NOTE\":'"+noteName+"',\"OWNER\":'"+owner+"',\"UPDATED_ON\":'"+"endDate"+"'}";
            storage.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
            storage.insertJSONDocument(dbName, collectionName, json,{
                success: function(object) {
                    var storageObj = JSON.parse(object)
                    var message = storageObj.app42.response.storage.jsonDoc.NOTE
                    var noteId = storageObj.app42.response.storage.jsonDoc._id.$oid
                    $("#notificationBar").append('<div>'+message+'</div><br><hr>')
                    storage.revokeAccessOnDoc(dbName, collectionName, noteId, aclListRevoke, {   // Revoke Access From "Public", So That No One Can See This Notification Except LoggedIn User.
                        success: function(object) {
                            storage.grantAccessOnDoc(dbName, collectionName, noteId, buddiesList,{  // Grant Access For Friends In Group ("buddiesList"), So That Only They Can See This Notification.
                                success: function(object) {
            
                                    window.location = ('#notificationsPage');
                                    ReloadPage();
                                },
                                error: function(error) {
                                }
                            }); 
                        },
                        error: function(error) {
                        }
                    }); 
                    
        
                },
                error: function(error) {
        
                }
            }); 
        },
        error:function(object){
            
        }
    });
}

/* Get All Notifications,
 * Notications Which Are Updated By You,
 * As Well As Notifications Which Are Shared By Your Friends For You.
 * By Using App42 Storage Service (findAllDocuments); 
 */
function getAllNotifications(){
    var storage  = new App42Storage();
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    var dbName = "NotificationList";
    var collectionName = "NewNote";
    storage.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    storage.findAllDocuments(dbName, collectionName,{  // Getting All Notificcations.
        success: function(object) {
            var storageObj = JSON.parse(object)
            result = storageObj.app42.response.success;
            var todos = storageObj.app42.response.storage.jsonDoc
            for (var i = 0; i < todos.length; i++){
                var noteName = todos[i].NOTE;
                var noteCreaterName = todos[i].OWNER;
                var currentTime = todos[i]._$createdAt;
                var monthNames = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
                var timeAndDate = new Date(currentTime).getDate();
                var absooluteTimeAndDate = monthNames[new Date(currentTime).getMonth()];
                var absooluteTimeAndDateq = new Date(currentTime).getFullYear();
                var newDate = absooluteTimeAndDate+"  "+timeAndDate +" "+absooluteTimeAndDateq
                $("#notificationBar").append('<div>'+noteName+'</div><br>Shared By:-'+noteCreaterName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+newDate+'<hr>')
            }
        },
        error: function(error) {
        }
    }); 
}


    
    
    