var app = {
    // Application Constructor
    initialize: function() {
        
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        alert("deviceready");
        alert("oh");
                
            try{
                    app.initPushNotificationRegister();    
            }
            catch(ex){
                        alert(ex.message);
            }
    },
    
    initPushNotificationRegister: function(){
        var pushNotification = window.plugins.pushNotification;
        alert("hi");
        
        if ( device.platform == 'android' || device.platform == 'Android'){
            alert("android");
            pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"155321093307","ecb":"app.onNotificationGCM"});
        } 
        else {
//            pushNotification.register(app.tokenHandler,app.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }

    },
    
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        alert('Callback Success! Result = '+result);
    },
    
    errorHandler:function(error) {
        alert("errHandler"+error);
    },
    
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
//                $("#redidtxtareas").val(e.regid);
                if ( e.regid.length > 0 )
                {
                    alert(e.regid);
                    //store to db
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
//              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    },
    
    tokenHandler: function(result) {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        dbmanager.checkFirstRun(function(returnData){
            if(returnData.rows.length==0){
                //postDeviceInfo("new", result);
            }    
        });
    },
    
    onNotificationAPN: function(event) {
        if ( event.alert )
        {
            navigator.notification.alert(event.alert);
        }

        if ( event.sound )
        {
            var snd = new Media(event.sound);
            snd.play();
        }

        if ( event.badge )
        {
            pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        }
    }
};