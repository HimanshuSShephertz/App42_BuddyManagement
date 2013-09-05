/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function register(){
    $("#defaultLoader").show();
    var buddy  = new App42User();
    var session = new App42Session();
    var error = "false"
    var userName = $("#userName").val();
    var pwd = $("#userPwd").val();
    var email = $("#userEmail").val();
    var firstName = $("#fName").val();
    var lastName = $("#lName").val();
    
    if(firstName == "" || firstName  == null){
        error = "true"
        $("#defaultLoader").hide();
        $.mobile.showPageLoadingMsg("a","Please enter First Name !...", "b");
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }
    
    else if(userName == "" || userName == null ){
        error = "true"
        $.mobile.showPageLoadingMsg("a","Please enter UserName !...", "a");
        $("#defaultLoader").hide();
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }
    else if(pwd == "" || pwd  == null){
        error = "true"
        $("#defaultLoader").hide();
        $.mobile.showPageLoadingMsg("a","Please enter PassWord !...", "b");
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }
    else if(email == "" || email  == null){
        error = "true"
        $("#defaultLoader").hide();
        $.mobile.showPageLoadingMsg("a","Please enter Email Address !...", "b");
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }
    else if(error == "true"){
        ReloadPage();
    }
    else{
        try{
            buddy.createUser(userName, pwd, email,{
                success: function(object) {
                    var createUserObj = JSON.parse(object)
                    var newUserName = createUserObj.app42.response.users.user.userName;
                    var newUserEmailId = createUserObj.app42.response.users.user.email;
                    var newUserSessionId = createUserObj.app42.response.users.user.email;
                    $.session.set('newUserSessionIdViaRegister',newUserSessionId)
                    $.session.set('newUserNameViaRegister',newUserName)
                    session.setAttribute(newUserSessionId,"createUserName", newUserName,{
                        success: function(object) {
                            //   var sessionId = $.session.get('newUserSessionIdViaRegister')
                            session.setAttribute(newUserSessionId,"createUserEmailId", newUserEmailId,{
                                success: function(object) {
                                    buddy.setSessionId(newUserSessionId);
                                    buddy.authenticate(userName, pwd, {
                                        success: function(object) {
                                            buddy.setFirstName(firstName);
                                            buddy.setLastName(lastName);
                                            buddy.createOrUpdateProfile(userName,{
                                                success: function(object) {
                                                    $("#buddyFirstName").val(firstName);
                                                    $("#buddyDetails_fName").html(firstName);
                                                    $("#buddyLastName").val(lastName);
                                                    $("#buddyDetails_lName").html(lastName);
                                                    window.location = ("#editProfile");
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
                        error: function(error) {
                           
                        }
                    });
                },
                error: function(error) {
                    var errorObj = JSON.parse(error)
                    var errorCode = errorObj.app42Fault.appErrorCode
                
                    if(errorCode == 2001){
                        $.mobile.showPageLoadingMsg("a","Already Exist / Please Try Again With Different Name !...", "b");
                        setTimeout(function (){
                            $.mobile.hidePageLoadingMsg();
                        },5000)
                    }
                    else if(errorCode == 2005){
                        $.mobile.showPageLoadingMsg("a","Already Exist / Please Try Again With Different Email Id !...", "b");
                        setTimeout(function (){
                            $.mobile.hidePageLoadingMsg();
                        },5000)
                    }
                    else{
                        ReloadPage();
                    }
                }
            }); 
        }catch(App42Exception){
            $(".error").show();
            $('#error').html(App42Exception.message);
        }
    }
}


function logIn(){
    $("#defaultLoader").show();
    var buddy  = new App42User();
    var session = new App42Session();
    var userName = $("#loginName").val();
    var pwd = $("#loginPwd").val();
    
    if(userName == "" || userName == null){
        $.mobile.showPageLoadingMsg("a","Please enter UserName !...", "a");
        $("#defaultLoader").hide();
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
        
    }else if(pwd == "" || pwd == null){
        $.mobile.showPageLoadingMsg("a","Please enter Password !...", "a");
        $("#defaultLoader").hide();
        setTimeout(function (){
            $.mobile.hidePageLoadingMsg();
        },2000)
    }else {
        try{
            buddy.authenticate(userName, pwd,{
                success: function(object) {
                    
                    var userAuthObj = JSON.parse(object)
                    var loggedInbuddyName =  userAuthObj.app42.response.users.user.userName;
                    $.session.set('loggedInNameViaLogin', loggedInbuddyName);
                    var loggedInUserSessionId =  userAuthObj.app42.response.users.user.sessionId;
                    $.session.set('loggedInSessionIdViaLogin', loggedInUserSessionId);
                    buddy.setSessionId(loggedInUserSessionId);
                    buddy.getUser(userName, {
                        success: function(object) {
                            var userDetailsObj = JSON.parse(object)
                            var loggedInUserName =  userDetailsObj.app42.response.users.user.userName;
                            var loggedInUserEmailId =  userDetailsObj.app42.response.users.user.email;
                            session.setAttribute(loggedInUserSessionId,"loggedInUserNameViaLogIn", loggedInUserName,{
                                success: function(object) {
                                    //   var sessionId = $.session.get('newUserSessionIdViaRegister')
                                    session.setAttribute(loggedInUserSessionId,"loggedInUserEmailIdViaLogIn", loggedInUserEmailId,{
                                        success: function(object) {
                                            $("#defaultLoader").hide();
                                            window.location = ("#profile");
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
                error: function(error) {
                    $("#defaultLoader").hide();
                    $.mobile.showPageLoadingMsg("a","UserName/Password incorrect. Please try again !...", "a");
                    setTimeout(function (){
                        $.mobile.hidePageLoadingMsg();
                    },4000)
                }
            }); 
        }
        catch(App42Exception){
            $(".error").show();
            $('#error').html(App42Exception.message);
        }
    }
}

function getBuddy() {
    var buddy  = new App42User();
    var session  = new App42Session();
    var buddyNameThroughRegister  = $.session.get('newUserNameViaRegister');
    var buddyNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('newUserSessionIdViaRegister')
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin')
    session.getAllAttributes(sessionIdViaRegister || sessionIdViaLogin, {
        success: function(object) {
            var getAllAttObj = JSON.parse(object)
                  var attributeList = getAllAttObj.app42.response.session.attributes.attribute;                          
            for (var i = 0; i < attributeList.length; i++){
                var loggedInName = attributeList[0].value;
                var loggedInEmailId = attributeList[1].value;
           }
    buddy.getUser(buddyNameThroughRegister || buddyNameThroughLogin,{
        success: function(object) {
            var detailsObj = JSON.parse(object)
            var firstName = detailsObj.app42.response.users.user.profile.firstName;
            $("#buddyFirstName").val(firstName);
            $("#buddyDetails_fName").html(firstName);
            var lastName = detailsObj.app42.response.users.user.profile.lastName;
            $("#buddyLastName").val(lastName);
            $("#buddyDetails_lName").html(lastName);
            $("#ppName").html(firstName+" "+" "+" "+lastName);
            var city = detailsObj.app42.response.users.user.profile.city;
            $("#city").val(city);
            $("#buddyDetails_city").html(city);
            var mobile = detailsObj.app42.response.users.user.profile.mobile;
            $("#mobNo").val(mobile);
            $("#buddyDetails_mobNo").html(mobile);
            var sex = detailsObj.app42.response.users.user.profile.sex;
            $('input[name=radioSex]:checked').val(sex);
            $("#buddyDetails_sex").html(sex);
            var userName = detailsObj.app42.response.users.user.userName;
            $("#loggedInBuddyNamePanel").html(userName);
            $("#loggedInBuddyNamePanel1").html(userName);
            $("#loggedInBuddyNamePanel2").html(userName);
            $("#loggedInBuddyNamePanel3").html(userName);
            $("#loggedInBuddyNamePanel4").html(userName);
            var userEmail = detailsObj.app42.response.users.user.email;
            $("#loggedInBuddyEmailPanel").html(userEmail);
            $("#loggedInBuddyEmailPanel1").html(userEmail);
            $("#loggedInBuddyEmailPanel2").html(userEmail);
            $("#loggedInBuddyEmailPanel3").html(userEmail);
            $("#loggedInBuddyEmailPanel4").html(userEmail);
            
            var buddyProfilePic = detailsObj.app42.response.users.user.profile.officeLandLine;
            if (buddyProfilePic == null)
            {
                //  document.getElementById("myprofilepic").src = buddyProfilePic+"jpg";
                document.getElementById("myprofilepic").src = "profilePic/boy.png";
            }else
            {
                //           document.getElementById("myprofilepic").src = "profilePic/boy.png";
                document.getElementById("myprofilepic").src = buddyProfilePic;
            }
           
             
        },
        error: function(error) {
        }
    });
    
     },
     error: function(error) {
        }
    });
    
}


function saveProfile(){
    $("#defaultLoader").show();
    var buddy  = new App42User();
    var buddyNameThroughRegister  = $.session.get('loggedInName');
    var buddyNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    myProfile(buddy);
    buddy.createOrUpdateProfile(buddyNameThroughRegister || buddyNameThroughLogin,{
        success: function(object) {
            var profileObj = JSON.parse(object)
            getBuddy();
            $("#defaultLoader").hide();
            window.location = ("#profile");
            ReloadPage();
        },
        error: function(error) {
        }
    });
}

function myProfile(userObj){
    var frstName = $("#buddyFirstName").val();
    var lstName = $("#buddyLastName").val();
    var mobNo = $("#mobNo").val();
    var city = $("#city").val();
    var sex = $('input[name=radioSex]:checked').val();
    var profilePic = $.session.get('profilePicViaUpload');
    var profilePicName = $.session.get('profilePicNameViaUpload');
   
   
    userObj.setFirstName(frstName);
    userObj.setLastName(lstName);
    userObj.setSex(sex);
    userObj.setDateOfBirth(new Date());
    userObj.setCity(city);
    userObj.setMobile(mobNo);
    userObj.setOfficeLandLine(profilePic);
    userObj.setHomeLandLine(profilePicName);
}


function logOut(){
    $("#defaultLoader").show();
    var session = new App42Session();
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    session.invalidate(sessionIdViaRegister || sessionIdViaLogin,{
        success: function(object) {
            $("#defaultLoader").hide();
            $.session.clear();
            window.location = ("#startPage");
            ReloadPage();
        }
    });
}

function getEmail(userName, sessionId){
    var session = new App42Session();
    var buddy = new App42User();
    buddy.getUser(userName,{
        success: function(object) {
            var buddyObj = JSON.parse(object)
            var loggedInEmail = buddyObj.app42.response.users.user.email
            
            var firstName = buddyObj.app42.response.users.user.profile.firstName;
            $("#buddyFirstName").val(firstName);
            $("#buddyDetails_fName").html(firstName);
            var lastName = buddyObj.app42.response.users.user.profile.lastName;
            $("#buddyLastName").val(lastName);
            $("#buddyDetails_lName").html(lastName);
            
            session.setAttribute(sessionId,"logInEmail", loggedInEmail,{
                success: function(object) {
                    session.getAttribute(sessionId,"logInEmail",{
                        success: function(object) {
                            var detailsObj = JSON.parse(object)
                            var loggedInEmail = detailsObj.app42.response.session.attributes.attribute.value;
                            $("#defaultLoader").hide();
                            window.location = ('#editProfile');
                            ReloadPage();
                        }
                    });
                }
            });
        },
        error: function(error) {
        }
    })
}

function allAppUsers(){
    var buddy  = new App42User();
    var sessionIdViaRegister = $.session.get('loggedInSessionId');
    var sessionIdViaLogin = $.session.get('loggedInSessionIdViaLogin');
    var userNameThroughRegister  = $.session.get('loggedInName');
    var userNameThroughLogin  = $.session.get('loggedInNameViaLogin');
    buddy.setSessionId(sessionIdViaRegister || sessionIdViaLogin);
    buddy.getAllUsers({
        success: function(object) {
            var userObj = JSON.parse(object)
            var users_list = userObj.app42.response.users.user
            for (var i = 0; i < users_list.length; i++){
                var newUser = users_list[i].userName;
                var newUserProfilePic = users_list[i].profile.officeLandLine;
                if(newUserProfilePic == null){
                    newUserProfilePic = "profilePic/blank.";
                }else{
                    newUserProfilePic = newUserProfilePic;
                }
                if(newUser != userNameThroughLogin && newUser != userNameThroughRegister){
                    $("#appUsers_list").append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="false" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-c"><a href="#"><h2><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a class="ui-link-inherit" href="#friendProfile" onclick="friendProfile('+"'"+newUser+"'"+');" ><img class="profileImageThumbnail" id="friendRequestImage" src="'+newUserProfilePic+"jpg"+'"/><span style="white-space:normal;">'+newUser+'</span></a></div></div></h2></a><a href="#allAppUsersPopUp" id="remove" data-rel="popup" data-position-to="origin" data-transition="flow" onclick = "getFriendName('+"'"+newUser+"'"+');"  title="Accept & Reject" class="ui-li-link-alt ui-btn ui-btn-up-f" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="false" data-iconpos="false" data-theme="f"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="menu" data-iconpos="notext" data-theme="a" title="" class="ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-menu ui-icon-shadow">&nbsp;</span></span></span></span></a></li>');
           
                }
            }
        },
        error: function(error) {
           
            $.mobile.showPageLoadingMsg("a","No Users", "e");
        }
    }); 
} 



function ReloadPage() {
    location.reload();
}
