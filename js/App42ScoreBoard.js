
function App42ScoreBoard() {
    /**
     * This function enables you to save game score of the specified user in a specific game.
     *
     * @param gameName - Game for which score is to be saved.
     * @param gameUserName - User whose score is to be saved.
     * @param gameScore - Score  to be saved.
     * @param request - An object with success and error callbacks.
     * @param return - Game instance.
     * @throws App42Exception
     *
     */
    this.saveUserScore = function(gameName,gameUserName, gameScore,request) {
        var URL = App42.URL("game/scoreboard");
        if(gameName != null && gameUserName != null && gameScore != null){
            gameName = gameName.trim();
            gameUserName = gameUserName.trim();
        }
        if(gameName == "" || gameUserName == "" || gameScore == "" || gameName == null|| gameUserName == null|| gameScore == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
            App42Fault.throwExceptionIfNullOrBlank(gameUserName, "userName")
            App42Fault.throwExceptionIfNullOrBlank(gameScore, "gameScore")
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
        var body = '{"app42":{"game":{"name":"'+gameName+'", "scores":{"score":{"value":"'+gameScore+'","userName":"'+gameUserName+'"}}}}}';
        params.body = body;
        App42Connection.post(URL, params,body,request);
    };
    /**
     * This function retrieves the scores for the specified user of a specific game.
     *
     * @param gameName - Name of the game for which scores are to be fetched.
     * @param userName - User for which scores are to be fetched.
     * @param request - An object with success and error callbacks.
     * @param return - Game instance.
     * @throws App42Exception
     *
     */
    this.getScoresByUser = function(gameName, userName,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/"+userName);
        if(gameName != null && userName != null){
            gameName = gameName.trim();
            userName = userName.trim();
        }
        if(gameName == "" || userName == "" || gameName == null|| userName == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
        params.name = gameName;
        params.userName = userName;
        App42Connection.get(URL, params,request);
        
       
    };
    /**
     * This function returns the highest game score for the specified user in a specific game.
     *
     * @param gameName - Game for which highest score is to be fetched.
     * @param userName - User for which highest score is to be fetched.
     * @param request - An object with success and error callbacks.
     * @param return - Game instance.
     * @throws App42Exception
     *
     */
    this.getHighestScoreByUser = function(gameName, userName,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/"+userName+"/"+"highest");
        if(gameName != null && userName != null){
            gameName = gameName.trim();
            userName = userName.trim();
        }
        if(gameName == "" || userName == "" || gameName == null|| userName == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
        params.name = gameName;
        params.userName = userName;
        App42Connection.get(URL, params,request);
    };
    /**
     * This function returns the lowest game score for the specified user in a specific game.
     *
     * @param gameName - Game for which lowest score is to be fetched.
     * @param userName - User for which lowest score is to be fetched.
     * @param request - An object with success and error callbacks.
     * @param return - Game instance.
     * @throws App42Exception
     *
     */
    this.getLowestScoreByUser = function(gameName, userName,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/"+userName+"/"+"lowest");
        if(gameName != null && userName != null){
            gameName = gameName.trim();
            userName = userName.trim();
        }
        if(gameName == "" || userName == "" || gameName == null|| userName == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
        params.name = gameName;
        params.userName = userName;
        App42Connection.get(URL, params,request);
       
    };
    /**
     * This function provides the top ranking for the specified game.
     *
     * @param gameName - Game for which ranks are to be fetched.
     * @param request - An object with success and error callbacks.
     * @param return - Game instance.
     * @throws App42Exception
     *
     */
    this.getTopRankings = function(gameName,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/ranking");
        if(gameName != null){
            gameName = gameName.trim();
        }
        if(gameName == "" || gameName == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
        params.name = gameName;
        App42Connection.get(URL, params,request);
    };
	
	this.getTopRankingsByDate = function(gameName,startDate,endDate,request) {
		strStartDate = getODataUTCDateFilter(startDate) ;
		strEndDate = getODataUTCDateFilter(endDate);
		if(gameName != null && startDate!=null && endDate!=null  ){
            gameName = gameName.trim();
				
        }
        if(gameName == "" || gameName == null || startDate == "" || startDate == null || endDate == "" || endDate == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
			App42Fault.throwExceptionIfNullOrBlank(startDate, "startDate")
			App42Fault.throwExceptionIfNullOrBlank(endDate, "endDate")
			
        
        }
        var URL = App42.URL("game/scoreboard/"+gameName+ "/ranking" + "/" + strStartDate + "/" + strEndDate);
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
        params.name = gameName;
		params.startDate = strStartDate;
        params.endDate = strEndDate;
       
        App42Connection.get(URL, params,request);
    };
	
    /**
     * This function returns specified number of top rankings for a specific game.
     *
     * @param gameName - Game for which ranks are to be fetched.
     * @param max - Maximum number of records to be fetched.
     * @param request - An object with success and error callbacks.
     * @param return - Game instance.
     * @throws App42Exception
     *
     */
    this.getTopNRankings = function(gameName, max,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/ranking/"+max);
        if(gameName != null){
            gameName = gameName.trim();
        }
        if(gameName == "" ||gameName == null ){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
        params.name = gameName;
        params.max = max;
        App42Connection.get(URL, params,request);
    };
	
	this.getTopNRankersBetweenDate = function(gameName,startDate,endDate,max,request) {
		strStartDate = getODataUTCDateFilter(startDate) ;
		strEndDate = getODataUTCDateFilter(endDate);
        var URL = App42.URL("game/scoreboard/"+gameName+ "/rankers" + "/" + strStartDate + "/" + strEndDate + "/" + max);
        if(gameName != null && startDate!=null && endDate!=null && max != null ){
            gameName = gameName.trim();
				
        }
        if(gameName == "" || gameName == null || startDate == "" || startDate == null || endDate == "" || endDate == null || max == null || max == ""){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
			App42Fault.throwExceptionIfNullOrBlank(startDate, "startDate")
			App42Fault.throwExceptionIfNullOrBlank(endDate, "endDate")
			App42Fault.throwExceptionIfNullOrBlank(max, "max")
        
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
        params.name = gameName;
		params.startDate = strStartDate;
        params.endDate = strEndDate;
		params.max = max;
       
        App42Connection.get(URL, params,request);
    };
	
	this.getTopNRankers = function(gameName,max,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+ "/rankers" + "/"+ max);
        if(gameName != null && max != null ){
            gameName = gameName.trim();
				
        }
        if(gameName == "" || gameName == null || max == null || max == ""){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
			App42Fault.throwExceptionIfNullOrBlank(max, "max")
        
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
        params.name = gameName;
		params.max = max;
       
        App42Connection.get(URL, params,request);
    };
	
	
	
    /**
     * This function provides top rankings for the specified user in a specific game.
     *
     * @param gameName - Name of the game for which ranks are to be fetched.
     * @param userName - Name of the user for which ranks are to be fetched.
     * @param request - An object with success and error callbacks.
     * @param return - Game instance.
     * @throws App42Exception
     *
     */
    this.getUserRanking = function(gameName, userName,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/"+userName+"/ranking");
        if(gameName != null && userName != null){
            gameName = gameName.trim();
            userName = userName.trim();
        }
        if(gameName == "" || userName == "" || gameName == null|| userName == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
        params.name = gameName;
        params.userName = userName;
        App42Connection.get(URL, params,request);
    };
    /**
     * This function returns the average score for the specified user in a specific game.
     *
     * @param gameName - Game for which average score is to be fetched.
     * @param userName - User for which average score is to be fetched.
     * @param request - An object with success and error callbacks.
     * @param return - Game instance.
     * @throws App42Exception
     *
     */
    this.getAverageScoreByUser = function(gameName, userName,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/"+userName+"/average");
        if(gameName != null && userName != null){
            gameName = gameName.trim();
            userName = userName.trim();
        }
        if(gameName == "" || userName == "" || gameName == null|| userName == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
        params.name = gameName;
        params.userName = userName;
        App42Connection.get(URL, params,request);
    };
	
    this.getLastScoreByUser = function(gameName, userName,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/"+userName+"/lastscore");
        if(gameName != null && userName != null){
            gameName = gameName.trim();
            userName = userName.trim();
        }
        if(gameName == "" || userName == "" || gameName == null|| userName == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
        params.name = gameName;
        params.userName = userName;
        App42Connection.get(URL, params,request);
    };
	
	this.getLastGameScore = function(userName,request) {
        var URL = App42.URL("game/scoreboard/"+userName+"/lastgame");
        if(userName != null){
            
            userName = userName.trim();
        }
        if(userName == "" || userName == null){
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
	
	this.editScoreValueById = function(scoreId,gameScore,request) {
        var URL = App42.URL("game/scoreboard"+ "/editscore");
        
        if(scoreId == "" || scoreId == null || gameScore == "" || gameScore == null ){
            App42Fault.throwExceptionIfNullOrBlank(scoreId, "scoreId")
			App42Fault.throwExceptionIfNullOrBlank(gameScore, "gameScore")
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
        var body = '{"app42":{"game":{"scores":{"score":{"scoreId":"'+scoreId+'","value":"'+gameScore+'"}}}}}';
      	params.body =body;
        App42Connection.put(URL,params, body,request);
    };
	
	this.getTopRankingsByGroup = function(gameName, userList,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/" +"group");
        if(gameName != null){
            gameName = gameName.trim();
        }
        if(gameName == "" ||gameName == null ){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
		params.userList ="["+userList.toString()+"]";
        params.name = gameName;
        
        App42Connection.get(URL, params,request);
    };
	
	this.getTopNRankersByGroup = function(gameName, userList,request) {
        var URL = App42.URL("game/scoreboard/"+gameName+"/rankers/group");
        if(gameName != null){
            gameName = gameName.trim();
        }
        if(gameName == "" ||gameName == null ){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
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
		params.userList ="["+userList.toString()+"]";
        params.name = gameName;
        
        App42Connection.get(URL, params,request);
    };
	
	
	this.getTopRankersFromBuddyGroup = function(gameName,userName,ownerName,groupName,request) {
         var URL = App42.URL("game/scoreboard/"+ gameName + "/rankers" + "/" + userName + "/group/"+ ownerName + "/" + groupName);
        if(gameName != null && userName != null && ownerName != null && groupName != null){
            
            gameName = gameName.trim();
			userName = userName.trim();
			ownerName = ownerName.trim();
			groupName = groupName.trim();
        }
        if(gameName == "" || gameName == null || userName == "" || userName == null || ownerName == "" || ownerName == null || groupName == "" || groupName == null){
            App42Fault.throwExceptionIfNullOrBlank(gameName, "gameName")
			App42Fault.throwExceptionIfNullOrBlank(userName, "userName")
			App42Fault.throwExceptionIfNullOrBlank(ownerName, "ownerName")
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
        params.name = gameName;
        params.userName = userName;
        params.ownerName = ownerName;
        params.groupName = groupName;
        App42Connection.get(URL, params,request);
    };
	
	this.setSessionId = function(session_Id) {
	sessionId = session_Id;
    };
	
	this.setAdminKey = function(admin_key) {
	   adminKey = admin_key ;
    };
}
