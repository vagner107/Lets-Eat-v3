
            var pushNotification;
            
            function onDeviceReady() {
                console.log('Device ok. Evento ativado.');
                
			
				try 
				{ 
                	pushNotification = window.plugins.pushNotification;
		        console.log('<li>Registrando o ' + device.platform + '</li>');
                	if (device.platform == 'android' || device.platform == 'Android' ||
                            device.platform == 'amazon-fireos' ) {
			pushNotification.register(successHandler, errorHandler, {"senderID":"557084083002","ecb":"onNotification"});		// required!
					} else {
                    	pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
                	}
                }
				catch(err) 
				{ 
					txt="Um erro ocorreu.\n\n"; 
					txt+="Descrição do erro: " + err.message + "\n\n"; 
					alert(txt); 
				} 
            }
            
            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                       console.log('<li>push-notificação: ' + e.alert + '</li>');
                     // showing an alert also requires the org.apache.cordova.dialogs plugin
                     navigator.notification.alert(e.alert);
                }
                    
                if (e.sound) {
                    // playing a sound also requires the org.apache.cordova.media plugin
                    var snd = new Media(e.sound);
                    snd.play();
                }
                
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            
            // handle GCM notifications for Android
            function onNotification(e) {
                  console.log('<li>EVENTO -> RECEBIDO:' + e.event + '</li>');
                
                switch( e.event )
                {
                    case 'registered':
					if ( e.regid.length > 0 )
					{
						  console.log('<li>REGISTRANDO -> REGID: \n\n' + e.regid + "\n\n</li>");
                          window.localStorage.setItem('localregid', e.regid);
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
						console.log("regID = " + e.regid);
					}
                    break;
                    
                    case 'message':
                    	// if this flag is set, this notification happened while we were in the foreground.
                    	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    	if (e.foreground)
                    	{
							  console.log('<li>--NOTIFICAÇÕES IN LINE--' + '</li>');
						      
						        // on Android soundname is outside the payload. 
					                // On Amazon FireOS all custom attributes are contained within payload
					                var soundfile = e.soundname || e.payload.sound;
					                // if the notification contains a soundname, play it.
					                // playing a sound also requires the org.apache.cordova.media plugin
					                var my_media = new Media("/android_asset/www/"+ soundfile);

							my_media.play();
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart)
								  console.log('<li>--NOTIFICAÇÕES RECEBIDAS--' + '</li>');
							else
							  console.log('<li>--BACKGROUND NOTIFICATION--' + '</li>');
						}
							
						  console.log('<li>MENSAGEM -> MSG: ' + e.payload.message + '</li>');
                        //android only
						  console.log('<li>MENSAGEM -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                        //amazon-fireos only
                          console.log('<li>MENSAGEM -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
                    break;
                    
                    case 'error':
						  console.log('<li>ERRO -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
						  console.log('<li>EVENTO -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                  console.log('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
			
            function successHandler (result) {
                  console.log('<li>sucesso:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                 console.log('<li>erro:'+ error +'</li>');
            }
            
			document.addEventListener('deviceready', onDeviceReady, true);


            // var token = window.localStorage.getItem('yourTokenKey');
            

            // if(token > '' && e.regid > ''){

            //     console.log("Teste SENDER ID :" + token);
            //     var res = token.split("|"); // criar array pela string separando as pelo '|'


            //     console.log("Teste SENDER ID 1:" + token);


            //     var LOCAL_REG_ID = 'localregid';

            //     window.localStorage.setItem('localregid', e.regid);

            //     // $.ajax({
            //     //   type: "POST",
            //     //   url: "http://app.rjag.com.br/app-IOS/cadastro.php",
            //     //   data: { email: res[0] , senderid: e.regid},
            //     //   complete: function(data){
                            
            //     //         }
            //     // });

            //  }
            //  $http({
            //      url: 'http://app.rjag.com.br/app-IOS/cadastro.php', 
            //      method: "POST",
            //      params: {email:res[0], senderid:true}
            //  });

