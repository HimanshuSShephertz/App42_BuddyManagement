
function App42Buddy() {
	/**
	 * Send friend request allow you to send the buddy request to the user.
	 * @param userName - Name of the user who wanted to send the request to the buddy.
	 * @param buddyName - Name of buddy for whom you sending the request.
	 * @param message - Message to the user.
	 * @throws App42Exception
	 */
    this.sendFriendRequest = function(userName,buddyName,message,request) {
        var URL = App42.URL("buddy")
		if(userName != null && buddyName != null){
            userName = userName.trim();
            buddyName = buddyName.trim();
        }
        if(userName == "" || buddyName == "" || userName == null || buddyName == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(buddyName, "buddyName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        var body = '{"app42":{"buddy":{"userName":"' + userName + '","buddyName":"'+ buddyName + '","message":"'+ message + '"}}}';
        params.body = body;
        App42Connection.post(URL, params,body,request);
    };
	/**
	 * Fetch all the friend request for the user.
	 * @param userName - Name of user for which request has to be fetched.
	 * @throws App42Exception
	 */
    this.getFriendRequest = function(userName,request) {
        var URL = App42.URL("buddy" +"/" + userName)
		if(userName != null ){
            userName = userName.trim();
        }
        if(userName == "" || userName == null ){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        params.userName = userName;
        App42Connection.get(URL, params,request);
    };
	/**
	 * Accept the friend request of the user.
	 * @param userName - Name of the user who is going to accept the request.
	 * @param buddyName - Name of the buddy whose request has to be accepted.
	 * @throws App42Exception
	 */
	this.acceptFriendRequest = function(userName,buddyName,request) {
        var URL = App42.URL("buddy")
		if(userName != null && buddyName != null){
            userName = userName.trim();
            buddyName = buddyName.trim();
        }
        if(userName == "" || buddyName == "" || userName == null || buddyName == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(buddyName, "buddyName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        var body = '{"app42":{"buddy":{"userName":"' + userName + '","buddyName":"'+ buddyName + '"}}}';
        params.body = body;
        App42Connection.put(URL, params,body,request);
    };
	/**
	 * Reject the friend request of the user. 
	 * @param userName - Name of the user who is going to reject the request.
	 * @param buddyName - Name of the buddy whose request has to be rejected.
	 * @throws App42Exception
	 */
	this.rejectFriendRequest = function(userName,buddyName,request) {
        var URL = App42.URL("buddy"+ "/userName/" + userName + "/buddyName/" + buddyName)
		if(userName != null && buddyName != null){
            userName = userName.trim();
            buddyName = buddyName.trim();
        }
        if(userName == "" || buddyName == "" || userName == null || buddyName == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(buddyName, "buddyName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.userName = userName;
        params.buddyName = buddyName;
        params.timeStamp = getODataUTCDateFilter(now);
        App42Connection.del(URL, params,request);
    };
	/**
	 * Fetch All the friends of the the user. 
	 * @param userName - Name of the user for which friends have to be fetched.
	 * @throws App42Exception
	 */
	this.getAllFriends = function(userName,request) {
        var URL = App42.URL("buddy" + "/friends/" + userName);
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
        var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
		params.userName = userName;
        App42Connection.get(URL, params,request);
    };
	
    this.createGroupByUser = function(userName,groupName,request) {
        var URL = App42.URL("buddy" + "/group")
		if(userName != null && groupName != null){
            userName = userName.trim();
            groupName = groupName.trim();
        }
        if(userName == "" || groupName == "" || userName == null || groupName == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(groupName, "groupName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        var body = '{"app42":{"buddy":{"userName":"' + userName + '","groupName":"'+ groupName + '"}}}';
        params.body = body;
        App42Connection.post(URL, params,body,request);
    };
	
    this.addFriendToGroup = function(userName,groupName,friends,request) {
        var URL = App42.URL("buddy" + "/group/friends")
		if(userName != null && groupName != null){
            userName = userName.trim();
            groupName = groupName.trim();
        }
        if(userName == "" || groupName == "" || userName == null || groupName == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(groupName, "groupName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
		 var stringfy = JSON.stringify(friends)
        params.timeStamp = getODataUTCDateFilter(now);
		var body = '{"app42":{"buddy":{"userName":"' + userName + '","groupName":"'+ groupName + '","friends":{"friend":' + stringfy + '}}}}';
		params.body = body;
        App42Connection.post(URL, params,body,request);
    };
	
     this.checkedInGeoLocation = function(userName,geoPointsList,request) {
        var URL = App42.URL("buddy" + "/checkedIn")
        
        if(userName != null){
            userName = userName.trim();
        }
        if(userName == "" || geoPointsList == "" || userName == null || geoPointsList == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(geoPointsList, "geoPointsList")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
        if(sessionId != null) {
            params.sessionId = sessionId;
        }
        if(adminKey != null) {
            params.adminKey = adminKey;
        }
        var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        var arrayInArray ={};
      
            var lat = geoPointsList.lat;
            var lng = geoPointsList.lng;
            var marker = geoPointsList.marker;
            var array={
                lat:lat,
                lng:lng,
                marker:marker
            };
		var stringfy = JSON.stringify(array)
        var signify = '{"point":' + stringfy + '}'
        
        var body = '{"app42":{"buddy":{"userName":"' + userName + '","points":' + signify + '}}}';
        params.body = body;
        App42Connection.post(URL, params,body,request);
    };
	
	this.getFriendsByLocation = function(userName, latitude,longitude, maxDistance, max,request) {
        var URL = App42.URL("buddy" + "/friends/location/" + userName + "/" + maxDistance + "/"	+ latitude + "/" + longitude + "/" + max);
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
        var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
		params.userName = userName;		
		params.maxDistance = maxDistance;
		params.latitude = latitude;		
		params.longitude = longitude;		
		params.max = max;
        App42Connection.get(URL, params,request);
    };
	
	this.getAllGroups = function(userName,request) {
        var URL = App42.URL("buddy" + "/groupall/" + userName);
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
        var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
		params.userName = userName;
        App42Connection.get(URL, params,request);
    };
	
	this.getAllFriendsInGroup = function(userName,ownerName,groupName,request) {
        var URL = App42.URL("buddy" + "/friends/" + userName + "/group/" + ownerName + "/" + groupName);
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
		
        var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
		params.userName = userName;
		params.ownerName = ownerName;
		params.groupName = groupName;
        App42Connection.get(URL, params,request);
    };
    
    this.blockFriendRequest = function(userName, buddyName, request) {
        var URL = App42.URL("buddy" + "/block/userName/" + userName + "/buddyName/" + buddyName);
		if (buddyName != null && userName != null){
			buddyName = buddyName.trim();
			userName = userName.trim();
		}
		if (userName == "" || userName == null || buddyName == "" || buddyName == null){
			App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
			App42Fault.throwExceptionIfNullOrBlank(buddyName, "buddyName")
			return ;
		}
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
        var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        params.userName = userName;
        params.buddyName = buddyName;
        App42Connection.del(URL, params ,request);
    };
	
    this.blockUser = function(userName,buddyName,request) {
        var URL = App42.URL("buddy" + "/block")
		if(userName != null && buddyName != null){
            userName = userName.trim();
            buddyName = buddyName.trim();
        }
        if(userName == "" || buddyName == 
		+"" || userName == null || buddyName == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(buddyName, "buddyName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        var body = '{"app42":{"buddy":{"userName":"' + userName + '","buddyName":"'+ buddyName + '"}}}';
        params.body = body;
        App42Connection.post(URL, params,body,request);
    };
	
    this.unblockUser = function(userName,buddyName,request) {
        var URL = App42.URL("buddy" + "/unblock")
		if(userName != null && buddyName != null){
            userName = userName.trim();
            buddyName = buddyName.trim();
        }
        if(userName == "" || buddyName == 
		+"" || userName == null || buddyName == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(buddyName, "buddyName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        var body = '{"app42":{"buddy":{"userName":"' + userName + '","buddyName":"'+ buddyName + '"}}}';
        params.body = body;
        App42Connection.put(URL, params,body,request);
    };
	 this.sendMessageToGroup = function(userName,ownerName,groupName,message,request) {
        var URL = App42.URL("buddy" + "/groupmessage")
		if(userName != null && ownerName != null && groupName != null && message != null){
            userName = userName.trim();
            ownerName = ownerName.trim();
            groupName = groupName.trim();
            message = message.trim();
        }
        if(userName == "" || ownerName == "" || groupName == null || message == null || userName == "" || ownerName == "" || groupName == null || message == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(ownerName, "ownerName")
            App42Fault.throwExceptionIfNullOrBlank(groupName, "groupName")
            App42Fault.throwExceptionIfNullOrBlank(message, "message")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        var body = '{"app42":{"buddy":{"userName":"' + userName + '","ownerName":"'+ ownerName + '","groupName":"' + groupName + '","message":"'+ message + '"}}}';
        params.body = body;
        App42Connection.post(URL, params,body,request);
    };
	this.sendMessageToFriend= function(userName,buddyName,message,request) {
        var URL = App42.URL("buddy" + "/friendmessage")
		if(userName != null && buddyName != null && message != null){
            userName = userName.trim();
            buddyName = buddyName.trim();
            message = message.trim();
        }
        if(userName == "" || buddyName == "" || message == null || userName == "" || buddyName == "" || message == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(buddyName, "buddyName")
            App42Fault.throwExceptionIfNullOrBlank(message, "message")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        var body = '{"app42":{"buddy":{"userName":"' + userName + '","buddyName":"'+ buddyName + '","message":"'+ message + '"}}}';
        params.body = body;
        App42Connection.post(URL, params,body,request);
    };
	
	this.sendMessageToFriends= function(userName,message,request) {
        var URL = App42.URL("buddy" + "/messageAll")
		if(userName != null &&  message != null){
            userName = userName.trim();
            message = message.trim();
        }
        if(userName == "" || message == null || userName == "" || message == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(message, "message")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
         var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
        var body = '{"app42":{"buddy":{"userName":"' + userName + '","message":"'+ message + '"}}}';
        params.body = body;
        App42Connection.post(URL, params,body,request);
    };
	
	this.getAllMessages = function(userName,request) {
        var URL = App42.URL("buddy" + "/message/" + userName);
		if(userName != null ){
            userName = userName.trim();
        }
        if(userName == "" || userName == null ){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
		
        var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
		params.userName = userName;
		 App42Connection.get(URL, params,request);
    };
	
	this.getAllMessagesFromBuddy = function(userName,buddyName,request) {
        var URL = App42.URL("buddy" + "/buddyMessage/" + userName + "/" + buddyName);
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
		
        var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
		params.userName = userName;
		params.buddyName = buddyName;
		 App42Connection.get(URL, params,request);
    };
	
	this.getAllMessagesFromGroup = function(userName,groupOwner,groupName,request) {
        var URL = App42.URL("buddy" + "/"+ userName + "/groupMassaage/" + groupOwner + "/"+ groupName);
		if(userName != null && groupOwner != null && groupName != null){
            userName = userName.trim();
            groupOwner = groupOwner.trim();
            groupName = groupName.trim();
        }
        if(userName == "" || groupOwner == "" || groupName == null  || userName == "" || groupOwner == "" || groupName == null){
            App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(groupOwner, "groupOwner")
            App42Fault.throwExceptionIfNullOrBlank(groupName, "groupName")
            return ;
        }
        var params = {};
        params.apiKey = apiKey;
        params.version = version;
		if(sessionId != null) {
			params.sessionId = sessionId;
		}
		if(adminKey != null) {
			params.adminKey = adminKey;
		}
		
        var now = new Date();
        params.timeStamp = getODataUTCDateFilter(now);
		params.userName = userName;
		params.ownerName = groupOwner;
		params.groupName = groupName;
		App42Connection.get(URL, params,request);
    };
	
	this.setSessionId = function(session_Id) {
	sessionId = session_Id;
    };
	
	this.setAdminKey = function(admin_key) {
	   adminKey = admin_key ;
    };
	
	this.setFbAccessToken = function(fbAccess_Token) {
	   fbAccessToken = fbAccess_Token;
    };
}