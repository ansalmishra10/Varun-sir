import React, {Component} from 'react';
import { StyleSheet, Text, View, Button,Dimensions,Image,TouchableOpacity,Alert } from 'react-native';
import Backend from "./Backend.js";
import {GiftedChat,Bubble} from "react-native-gifted-chat-video-support";
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import ActionSheet from 'react-native-actionsheet'

var randomString = require('random-string');
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
type Props = {};
const options = {
    title: 'Select Document',
    maxWidth:300,
    maxHeight:500,

    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class Message extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chat Consulation',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    constructor(props) {
        super(props);


        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            mystatus:false,
            results: [],
            messages: [],
            texts:'',

        };

    }





    // renderBubble(props) {
    //
    //     return (
    //         <View>
    //             <Text style={{color:'black'}}>{props.currentMessage.user.name}</Text>
    //         </View>
    //     );
    // }
    componentWillMount() {
      

    }

    fetchFile=(index)=>{
      if (index == 0){
        const options = {
  title: 'Select Image',
  
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                const url = GLOBAL.BASE_URL +  'file_upload_for_chat'
                const data = new FormData();
                
                // you can append anyone.
                data.append('file', {
                    uri:response.uri,
                    type: 'image/jpeg', // or photo.type
                    name: 'image.png'
                });
                fetch(url, {
                    method: 'post',
                    body: data,
                    headers: {
                        'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                        'Content-Type': 'multipart/form-data',
                        'language': GLOBAL.lang,
                    }

                }).then((response) => response.json())
                    .then((responseJson) => {
                        //       this.hideLoading()
                        //alert(JSON.stringify(responseJson))
                     

                       var x = randomString({
                                      length: 20,
                                      numeric: true,
                                      letters: true,
                                      special: false,
                                      exclude: ['a', 'b']
                                  });

                                  var array = [];
                                  var users = {
                                      _id: GLOBAL.userID,
                                      name: GLOBAL.myname,
                                  }
                                  var today = new Date();
                                  /* today.setDate(today.getDate() - 30);
                                  var timestamp = new Date(today).toISOString(); */
                                  var timestamp = today.toISOString();
                                  var dict = {
                                      text: 'Attachment',
                                      user: users,
                                      createdAt: timestamp,
                                      _id: x,
                                      video: responseJson.file_url,

                                      // etc.
                                  };
                                  array.push(dict)
                                  //Backend.load()

// alert(JSON.stringify(responseJson.))
                                  Backend.sendMessage(array)




                    }

                  );




                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };


            }


  // Same code as in above section!
});
      } else if (index == 1){
        const options2 = {
  title: 'Select video',
   mediaType: 'video',
  path:'video',
  quality: 1
};

ImagePicker.showImagePicker(options2, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
              console.log(response)
                const source = { uri: response.uri };

                const url = GLOBAL.BASE_URL +  'file_upload_for_chat'
                const data = new FormData();
                
                // you can append anyone.
                data.append('file', {
                    uri:response.uri,
                    type: 'video/mp4', // or photo.type
                    name: 'video.mp4'
                });
                fetch(url, {
                    method: 'post',
                    body: data,
                    headers: {
                        'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                        'Content-Type': 'multipart/form-data',
                        'language': GLOBAL.lang,
                    }

                }).then((response) => response.json())
                    .then((responseJson) => {
                        //       this.hideLoading()
                        console.log(JSON.stringify(responseJson))
                     

                       var x = randomString({
                                      length: 20,
                                      numeric: true,
                                      letters: true,
                                      special: false,
                                      exclude: ['a', 'b']
                                  });

                                  var array = [];
                                  var users = {
                                      _id: GLOBAL.userID,
                                      name: GLOBAL.myname,
                                  }
                                  var today = new Date();
                                  /* today.setDate(today.getDate() - 30);
                                  var timestamp = new Date(today).toISOString(); */
                                  var timestamp = today.toISOString();
                                  var dict = {
                                      text: 'Attachment',
                                      user: users,
                                      createdAt: timestamp,
                                      _id: x,
                                      video: responseJson.file_url,

                                      // etc.
                                  };
                                  array.push(dict)
                                  //Backend.load()

// alert(JSON.stringify(responseJson.))
                                  Backend.sendMessage(array)




                    }

                  );




                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };


            }


  // Same code as in above section!
});
      }

    }


    renderBubble = (props,index) => {
        var a = false;
        if (props.currentMessage.status == true){
        a = true;
        }else{
            a = false;
        }
        //
        // if (props.currentMessage.user_id != GLOBAL.user_id ){
        //
        // }
        return (

                <View style={{paddingRight: 12}}>




                    <Bubble {...props}
                    wrapperStyle={{
                                            left: {
                                                backgroundColor: '#e1e1e1',
                                            },
                                            right: {
                                                backgroundColor: '#C7BC31',borderBottomLeftRadius:8,borderBottomRightRadius:8,borderTopLeftRadius:8
                                            }
                                        }} />
                    {props.currentMessage.user_id != GLOBAL.userID  &&  (
                        <View>

                        </View>
                    )}

                    {props.currentMessage.user_id == GLOBAL.userID  &&  (
                        <View>
                        </View>
                    )}






                </View>

        )
    }

    uploadImage = () => {
        const ext = this.state.imageUri.split('.').pop(); // Extract image extension
        const filename = `${uuid()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });
        firebase
            .storage()
            .ref(`tutorials/images/${filename}`)
            .putFile(this.state.imageUri)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    let state = {};
                    state = {
                        ...state,
                        progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
                    };
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        const allImages = this.state.images;
                        allImages.push(snapshot.downloadURL);
                        state = {
                            ...state,
                            uploading: false,
                            imgSource: '',
                            imageUri: '',
                            progress: 0,
                            images: allImages
                        };
                        AsyncStorage.setItem('images', JSON.stringify(allImages));
                    }
                    this.setState(state);
                },
                error => {
                    unsubscribe();
                    alert('Sorry, Try again.');
                }
            );
    };

    showActionSheet= ()=>{

      this.ActionSheet.show()
      
//       ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 const source = { uri: response.uri };

//                 const url = GLOBAL.BASE_URL +  'file_upload_for_chat'
//                 const data = new FormData();
                
//                 // you can append anyone.
//                 data.append('file', {
//                     uri:response.uri,
//                     type: 'image/jpeg', // or photo.type
//                     name: 'image.png'
//                 });
//                 fetch(url, {
//                     method: 'post',
//                     body: data,
//                     headers: {
//                         'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
//                         'Content-Type': 'multipart/form-data',
//                     }

//                 }).then((response) => response.json())
//                     .then((responseJson) => {
//                         //       this.hideLoading()
//                         //alert(JSON.stringify(responseJson))
                     

//                        var x = randomString({
//                                       length: 20,
//                                       numeric: true,
//                                       letters: true,
//                                       special: false,
//                                       exclude: ['a', 'b']
//                                   });

//                                   var array = [];
//                                   var users = {
//                                       _id: GLOBAL.userID,
//                                       name: GLOBAL.myname,
//                                   }
//                                   var today = new Date();
//                                   /* today.setDate(today.getDate() - 30);
//                                   var timestamp = new Date(today).toISOString(); */
//                                   var timestamp = today.toISOString();
//                                   var dict = {
//                                       text: 'Attachment',
//                                       user: users,
//                                       createdAt: timestamp,
//                                       _id: x,
//                                       image: responseJson.file_url,

//                                       // etc.
//                                   };
//                                   array.push(dict)
//                                   //Backend.load()

// // alert(JSON.stringify(responseJson.))
//                                   Backend.sendMessage(array)




//                     }

//                   );




//                 // You can also display the image using data:
//                 // const source = { uri: 'data:image/jpeg;base64,' + response.data };


//             }
//         });
    }


    getlog = ()=>{


        const url =  GLOBAL.BASE_URL  + 'lat_long_address'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'language': GLOBAL.lang,
            },


            body: JSON.stringify({
                "latitude": 23.6666,
                "longitude":77.4554,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {
                    GLOBAL.chatstatus = true

           //this.setState({mystatus:true})
                    this.getlog()

                }else{
                    GLOBAL.chatstatus = false
                    this.setState({mystatus:false})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    renderMessageVideo=()=> {

    }


    renderActions=() =>{
        return(
            <TouchableOpacity onPress={()=>this.showActionSheet()}>
                <Image style={{width:22, height:22, resizeMode:'contain', marginLeft:9, marginBottom:12}}
                       source={require('./clip.png')}/>
            </TouchableOpacity>
        )
    }
    login = () => {
        this.props
            .navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Landing',
                        params: { someParams: 'parameters goes here...' },
                    }),
                ],
            }))
    }

    renderChatFooter = () => {
      if (this.state.texts != ""){
        return  <Text style = {{fontSize:14,margin:10}}> {this.state.texts}</Text>;
      }

          // if (this.state.isTyping) {
          //   if (this.typingTimeoutTimer == null) {
          //     this.startTimer();
          //   }
          //   return <TypingIndicator />;
          // }
        return null;
      };
    render() {


        return (
      <View style = {{flex:1,backgroundColor:'#fcfcfe',width:window.width,height:'100%'}}>

      <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like to use ?'}
          options={['Choose picture', 'Choose Video', 'Choose Document', 'Cancel']}
          cancelButtonIndex={3}
          
          onPress={(index) => { this.fetchFile(index) }}
        />


      <View style = {{height:60,backgroundColor:'white',flexDirection:'row',width:window.width,justifyContent:'space-between',elevation:3}}>


          <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
          <Image
                                          source={require('./left.png')}
                                          style={{width:22, height: 25,marginLeft:20,marginTop:22,resizeMode:'contain'}}


                                      />

          </TouchableOpacity>



          <Text style = {{color:'black',fontFamily:'AvenirLTStd-Heavy',fontSize:20,marginLeft:-60,alignSelf:'center'}} >
                                 Chat 
                              </Text>


          <Text style = {{color:'white',fontFamily:'AvenirLTStd-Heavy',fontSize: 3,marginLeft:-20,alignSelf:'center'}} >
                                 
                              </Text>




      </View>



            <GiftedChat
                    renderActions={this.renderActions}
                    extraData={this.state}
                    renderUsernameOnMessage = {true}
                    messages={this.state.messages}
                    renderChatFooter={this.renderChatFooter}
            
                    onSend={message => {


  var dd =    JSON.stringify({
    message:message[0].text,
                               booking_id : 5,
  sender_id:GLOBAL.userID,
  sender_type:'user',
  reciever_id:3,
  reciever_type : "doctor",

  chat_group_id:GLOBAL.bookingid

                           })

  console.log(dd)


                      Backend.sendMessage(message);



                    }}
                    renderBubble={this.renderBubble}
                    onInputTextChanged = {text =>{
                        Backend.updateTyping(text)

                        // alert(text)

                    }

                    }
                    user={{
                        _id: GLOBAL.userID,
                        name: GLOBAL.myname
                    }}
                />



            </View>

            




        );
    }


    componentDidMount() {
        this.getlog()
      //  GLOBAL.mystatus = "Online";



        // Backend.updateMessage(message => {
        //     alert(JSON.stringify(message))
        //
        //
        // })


        Backend.loadMessages(message => {
          //  alert(JSON.stringify(message))

            if (message.text == ''){


                for (var i = 0; i< this.state.messages.length;i++){

                         //  if (this.state.messages[i].anotherid == GLOBAL.user_id) {


                               if (this.state.messages[i].status == false) {

                                   let {messages} = this.state;
                                   let targetPost = messages[i];

                                   // Flip the 'liked' property of the targetPost
                                   targetPost.status = true;

                                   // Then update targetPost in 'posts'
                                   // You probably don't need the following line.
                                   // posts[index] = targetPost;

                                   // Then reset the 'state.posts' property
                                   this.setState({messages});
                               }
                         //  }
                   // alert(JSON.stringify(this.state.messages))
                }

                                   this.setState({messages:this.state.messages});

                return {
                    messages: this.state.messages
                };
                       //  var a = this.state.messages[i]
                       //
                       //
                       //  a.status = true
                       //
                       // // this.setState({messages:a})
                  //  this.setState({messages:})
             //   }


            } else {

                this.setState(previousState => {


                    return {
                        messages: GiftedChat.append(previousState.messages, message)
                    };
                });
            }
        });


       ;

        // Backend.updateMessage(message => {
        //     alert(JSON.stringify(message))
        //
        //
        // })

        Backend.loadMessagess(message => {
          // alert(JSON.stringify(message.typinganother))
            if (message.typinganother == true){
                var s = message.name +  ' is typing ...'
                this.setState({texts:s})
            }else{
                this.setState({texts:''})
            }

        });
    }
    componentWillUnmount() {
        Backend.closeChat();
    }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex: 1,
        backgroundColor :'#001739'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})