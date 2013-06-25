App42_BuddyManagement
=====================

App42 Client SDK sample for HTML5.

Making Friends, Creating Groups, Share Notifications with your friends using [App42CloudAPI] (http://api.shephertz.com/apis) javascript SDK.

_Features List :__

1. User Authentication. 
2. User Profile Integration.
3. Multiple Avatar Management.
4. Session Storage.
5. Making Buddies.
6. Create Groups.
7. Share Notifications with your friends And Groups who has use this app.
8. Support all mobile browsers and HTML5 compatible desktop browsers.

# Running Sample:

1. [Register] (https://apphq.shephertz.com/register) with App42 platform
2. Go to dashboard and click on the App Create .
3. Fill all the mandatory fields and and checked the ACL true to get your APIKey and SecretKey.

__Initialize App42 :__

Edit index.html file and put your APIKey and SecretKey overhere.

```
App42.initialize("API KEY","SECRET KEY");

```

#Design Details:

__App42 User:__

Initialize App42User 

```
var buddy  = new App42User();

```

Sign up for a new account.

```
// Getting Values From TextBoxes.
var userName = $("#userName").val();
var pwd = $("#userPwd").val();
var email = $("#userEmail").val();
// Creating New User.
buddy.createUser(userName, pwd, email,{        
success: function(object) {
// callback response when user is successfully created.
},
error: function(error) {
// callback when user already created or email already existes.
}
});
```
Adding Profile Details On Registration Page.

```
//Getting Values.
var firstName = $("#fName").val();
var lastName = $("#lName").val();
buddy.setFirstName(firstName);
buddy.setLastName(lastName);
// Update User Profile, By Setting his/her FirstName & LastName.
buddy.createOrUpdateProfile(userName,{                   
success: function(object) {
// Calling New Function "moreDetails()",For Getting More Profile Details From User. 
},
error: function(error) {
// callback when error occurred.               
}
}); 

```
Authenticate existing account.

```
var userName = $("#loginName").val();
var pwd = $("#loginPwd").val();
// Authenticating User.
buddy.authenticate(userName, pwd,{
success: function(object) {
// get userName and sessionId from authenticate user response
var userObj = JSON.parse(object)
var name = userObj.app42.response.users.user.userName;
var sId =  userObj.app42.response.users.user.sessionId;
// Save LoggedIn UserName with sessionId to browser's local storage.
$.session.set('loggedInNameViaLogin', name);
$.session.set('loggedInSessionIdViaLogin', sId);
},
error: function(error) {
// callback when user not found.
}
});
```
Adding More Profile Details When user Is Redirected To his/her Profile.

```
//Getting Values From Edit Profile Page.
var frstName = $("#buddyFirstName").val();
var lstName = $("#buddyLastName").val();
var mobNo = $("#mobNo").val();
var city = $("#city").val();
var sex = $('input[name=radioSex]:checked').val();
var profilePic = $.session.get('profilePicViaUpload');
var profilePicName = $.session.get('profilePicNameViaUpload');
//Setting Values In User Profile.
userObj.setFirstName(frstName);
userObj.setLastName(lstName);
userObj.setSex(sex);
userObj.setDateOfBirth(new Date());
userObj.setCity(city);
userObj.setMobile(mobNo);
userObj.setOfficeLandLine(profilePic);
userObj.setHomeLandLine(profilePicName);
```
Getting LoggedIn UserName And SessionId From Local Storage.

```
// Get LoggedIn UserName And SessionId From Authenticate Response. And Set in to 
var userName  = $.session.get('loggedInNameViaLogin');
var sessionId = $.session.get('loggedInSessionIdViaLogin');
//Setting SessionId In User Object("buddy") For The LoggedIn User.
buddy.setSessionId(sessionId);
```
Saving Profile.

```
// Updating User Profile, With Updated Values From Edit Profile Page.
buddy.createOrUpdateProfile(userName,{   
success: function(object) {
// Getting Updated Details.
},
error: function(error) {
// callback when error occurred.
}
});
```
Get Profile Details Of LoggedIn User.

```
// Getting Profile Details.
buddy.getUser(userName,{
success: function(object) {
// Get Updated Profile.
var detailsObj = JSON.parse(object)
var friendName = detailsObj.app42.response.users.user.userName
var firstName = detailsObj.app42.response.users.user.profile.firstName;
var lastName = detailsObj.app42.response.users.user.profile.lastName;
var city = detailsObj.app42.response.users.user.profile.city;
var mobile = detailsObj.app42.response.users.user.profile.mobile;
var sex = detailsObj.app42.response.users.user.profile.sex;
// Getting Avatar URL From "officeLandLine".
var buddyProfilePic = detailsObj.app42.response.users.user.profile.officeLandLine;
},
error: function(error) {
// callback when error occurred.
}
});
```
Get All Buddy_Sample_App users.

```
// Get All Buddy_App Existing Users For Making Friends And Sharing.
// All Users Are Those persons, 
// Who Are Registered (Through Sign Up) In Buddy_App With Same "API KEY" & "SECRET KEY".
buddy.getAllUsers({
success: function(object) {
// List Of All Buddy_Sample_App Users, Who Are Registered In SignUp Phase.
},
error: function(error) {
// When App Has No User Yet.
}
});
```
Get Friend Profile.

```
var friendName = "Your Friend Name";

// Getting Friend Profile.
buddy.getUser(friendName || name, {
Success:function(object){

// Getting Profile Details.
var detailsObj = JSON.parse(object)
var friendName = detailsObj.app42.response.users.user.userName
var firstName = detailsObj.app42.response.users.user.profile.firstName;
var lastName = detailsObj.app42.response.users.user.profile.lastName;
var city = detailsObj.app42.response.users.user.profile.city;
var mobile = detailsObj.app42.response.users.user.profile.mobile;
var sex = detailsObj.app42.response.users.user.profile.sex;

// Getting Avatar URL From "officeLandLine".
var buddyProfilePic = detailsObj.app42.response.users.user.profile.officeLandLine;
},
error:function(object){
// callback when error occurred.
}
});
```
LogOut, Invalidate Session, Clear Local Storage.

```
var session = new App42Session();
// Invalidate Session
session.invalidate(sessionIdViaRegister || sessionIdViaLogin,{     
success: function(object) {
// Clearing Local Storage.
$.session.clear();                                       
},
error: function(error) {
// callback when error occurred.
}
});

```    
  __App42 Upload:__
  
Initialize App42Upload 

```
var upload  = new App42Upload();
var userName = "Get UserName From Local Storage";
var imageName = "name"+ new Date().getTime();
//Getting Path Of Uploaded Files.
var filePath = document.getElementById("filePath");
var file = filePath.files[0];
var fileType = "IMAGE";
var description = "Profile Avatar";

```
Upload Avatar.

```
// Uploading Avatar.
upload.uploadFileForUser(imageName, userName, file, fileType, description, {   
Success:function(object){
// Get Avatar Url And Set As "officeLandLine" In User profile.
},
error:function(object){
// callback when error occurred.
}
});
```
Get All Photos.

```
upload.getAllFilesByUser(buddyNameThroughRegister || buddyNameThroughLogin, {   
Success:function(object){
//  Get All Photos.
},
error:function(object){
// No Files Found.
}
});
```    
  __App42 Storage:__
  
Initialize App42Storage 

```
var storage  = new App42Storage();
var dbName = "NotificationList";     
var collectionName = "NewNote";        
var json = "{\"NOTE\":'"+noteName+"',\"OWNER\":'"+owner+"'}";  
```
Create And Share Notification With Friends.

```
storage.insertJSONDocument(dbName, collectionName, json,{
Success:function(object){
var storageObj = JSON.parse(object)
//Get DocID From Success object,
var DocId = storageObj.app42.response.storage.jsonDoc._id.$oid
//For Sharing With Friends You Have To-
//Revoke Access From Public,
//And Grant Access For All Friends.
},
error:function(object){
// callback when error occurred.
}
});
```
Revoke Access From Public On A Particular Doc.

```
//Creating List Of Persons, For Revoke Action.
var aclListRevoke = new Array();
var point1={
user:"PUBLIC",
permission:Permission.READ
};
aclListRevoke.push(point1)
// Revoke Access From "Public", So That No One Can See This Notification Except LoggedIn User.
storage.revokeAccessOnDoc(dbName, collectionName, noteId, aclListRevoke, {    
success: function(object) {
// Now, No One Can See This Notification Except LoggedIn User.
},
error: function(error) {
// Callback when error occurred.
}
});
```
Grant Access For Friends.

```
var buddiesList = new Array();
// Grant Access For Friends ("buddiesList"), So That Only They Can See This Notification.
storage.grantAccessOnDoc(dbName, collectionName, noteId, buddiesList,{ 
success: function(object) {
},
error: function(error) {
}
}); 
```
Share Notification With Friends In An Particular Group.

```
storage.insertJSONDocument(dbName, collectionName, json,{
Success:function(object){
//Revoke Access From Public, And Grant Access For All Friends In The Given Group.
},
error:function(object){
// callback when error occurred.
}
});
```

 __App42 BuddyManagement:__
  
Initialize App42Buddy.

```
var buddy = new App42Buddy();
var userName = "LoggedIn UserName".
var buddyName = "With Whome U Want To Communicate".
var message = "HI... Wanna Be My Friend ?";  
```
Send Friend Request To Existing Buddy_App User.

```
//Send Friend Request To Friend.
buddy.sendFriendRequest(userName, buddyName, message, {  
success:function(object){
// Friend Request Is SuccessFully Sent.
},
error:function(object){
// Error Occurred, If Request Is Already Sent,
// Or You Are  Already Friend With This Person,
// Or That Person Is Already Sent You a Friend Request.
}
}); 
```
Get Friend Requests Of Existing Buddy_App Users.

```
// Get Requests Of Persons, Who Wants To Be Friend With Current LoggedIn User.
buddy.getFriendRequest(userName, { 
success:function(object){
// Get The List Of Requests.
},
error:function(object){
// CallBack If Error Occurred.
}
});
```
Accept Pending Friend Requests Of Existing Buddy_App Users.

```
// By Accepting Friend request, The Buddy_App User Is Added In Your FriendList.

// Accept Friend Request.
buddy.acceptFriendRequest(userName, buddyName, {  
success:function(object){
// The Buddy_App User "buddyName" Is Added In Your FriendList.
},
error:function(object){
// CallBack If Error Occurred.
}
});
```
Reject Pending Friend Requests Of Existing Buddy_App Users.

```
// By Rejecting Friend request, The Buddy_App User Is Not Added In Your FriendList.

// Reject Friend Request.
buddy.rejectFriendRequest(userName, buddyName, {  
success:function(object){
// The Buddy_App User "buddyName" Is Not Added In Your FriendList.
},
error:function(object){
// CallBack If Error Occurred.
}
});
```

Get All Buddies(Friends) Of LoggedIn User.

```
// Getting All Friends.
buddy.getAllFriends(userName, {  
success:function(object){
// List Of Friends.
// With Whome User Can Create Groups And Share Updates.
},
error:function(object){
// CallBack If Error Occurred.
}
});
```
Create Group Of Buddies(Friends) By LoggedIn User.

```
var groupName = "GroupName".
// //Creating Group.
buddy.createGroupByUser(userName, groupName , { 
success:function(object){
// Group Is SuccessFully Created.
// Now, User Can Add Friends To Group And Share Updates With Desired Group Members.
},
error:function(object){
// Error Occurred If GroupName Is Already Exists.
}
});
```
Add Friend To Group, By LoggedIn User.

```
var friendName = "MyFriend".
// Adding Friend To Group.
buddy.addFriendToGroup(userName, groupName, friendName, {
success:function(object){
// Friend Is SuccessFully Added To Group("groupName").
// Now, User Can Share Updates With Desired Group Members.
},
error:function(object){
// Error Occurred If Friend Is Already Added To This Group.
}
});
```
Get All Groups.

```
// Getting Groups.
buddy.getAllGroups(userName, {  
success:function(object){
// Showing The Groups Which Are Created By LoggedIn User, 
// As Well As Groups In Which The LoggedIn User Is Added By Friends.
},
error:function(object){
// Error Occurred If No Group Found.
}
});
```
Get All Friends In An Desired Group.

```
var ownerName = "Owner Of Group".
//Getting All Friends In An Particular Group.
buddy.getAllFriendsInGroup(userName, ownerName, groupName, { 
success:function(object){
// Showing The List Of Friends In The Requested Group.
},
error:function(object){
// Error Occurred If No Friends Found.
}
});
```
