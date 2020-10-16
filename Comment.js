import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  Dimensions,
  AsyncStorage,
  BackHandler,



  } from 'react-native';

import React, {Component} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
const GLOBAL = require('./Global');





class Comment extends React.Component {

  constructor() {
    super();
     this.state={

        
        comment:'',
        loading:'',
        num:'',
        Flatlistitems: [],
       
     }
  }


   showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }


  componentDidMount() {
    // alert(JSON.stringify(GLOBAL.postID))
    this.getComment();
    
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }


   componentWillUnmount(){

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

   }



   handleBackButton=()=>{

     this.props.navigation.replace('ManageScreen')

     // Alert.alert(
     //  'Exit From App' ,
     //  'Do you want to exit from App?',
     //  [
     //    { text: 'Yes', onPress: () => BackHandler.exitApp()  },
     //    { text: 'No', onPress: () => console.log('No Pressed')  }
     //  ],

     //  { cancelable: false },

     //  );

     return true;
   }
   

  getLike=(id)=> {

    const url = GLOBAL.BASE_URL +  'toggle_comment_like'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'language': GLOBAL.lang,
                'Authorization': GLOBAL.token
            },
            
            body: JSON.stringify({
              "user_id": GLOBAL.userID,
              "id": id,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               if (responseData.status == true ) { 


       

        
                  // alert(JSON.stringify(responseData))
                  this.getComment();
                  

          this.hideLoading()
        
      
}else {
  alert("Invalid Credentials")
}
               
             

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })


  }
  
  getComment=()=> {

      const url = GLOBAL.BASE_URL +  'fetch_post_comments'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'language': GLOBAL.lang,
                'Authorization': GLOBAL.token
            },
            
            body: JSON.stringify({
              "user_id": GLOBAL.userID,
              "id": GLOBAL.postID,
              "limit":10,
              "limit_from":0
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               if (responseData.status == true ) { 


       

        
                  this.setState({ Flatlistitems : responseData.data })
                  this.setState({ num: responseData.total_post_comments })
                  

          this.hideLoading()
        
      
}else {
  alert("Invalid Credentials")
}
               
             

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
  }

  sendComment=()=> {

    // alert(JSON.stringify(this.state.comment))

      const url = GLOBAL.BASE_URL +  'add_post_comment'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'language': GLOBAL.lang,
                'Authorization': GLOBAL.token
            },
            
            body: JSON.stringify({
              "user_id": GLOBAL.userID,
              "id": GLOBAL.postID,
              "comment": this.state.comment 
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


               // alert(JSON.stringify(responseData))
               this.setState({ comment: ''});
               this.getComment();
                
             

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

  }


  renderItem=({item}) => {
       // console.log(item.image)
    return(

<View>

<View style={{height:'auto',width:'92%',alignSelf:'center',flexDirection:'row',marginBottom:10}}>

<Image style={{height:40,width:40,resizeMode:'cover',borderRadius:20}} source={{ uri: item.user_image}} />

<View style={{flexDirection:'column',marginLeft:15,width:'85%'}}>

<Text style={{fontSize:17,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',lineHeight:20}}>{item.name}</Text>
<Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#4E586E',marginTop:2,lineHeight:20}}>{item.created_at}</Text>
<Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D80',width:'100%',marginTop:5,lineHeight:20}}>{item.comment}</Text>

<View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
 
 <TouchableOpacity onPress={()=>this.getLike(item.id)}>

 {item.is_like == false && (
 <Image style={{height:15,width:17,resizeMode:'contain'}} source={require('./like.png')} />
 )}

 {item.is_like == true && (
 <Image style={{height:15,width:17,resizeMode:'contain'}} source={require('./like2.png')} />
 )}
 </TouchableOpacity>

 <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:5}}>{item.comment_likes}</Text>
</View>

<View style={{height:2,backgroundColor:'#0000000D',width:'100%',marginTop:12,marginBottom:5}}>
</View>
</View>

</View>



 </View>

)
}

_keyExtractor=(item, index)=>item.key;



  render() {
    return(

      <SafeAreaProvider style={{backgroundColor:'white'}}>
        <StatusBar
             backgroundColor = "white"
         

           />

           <View style = {{height:60,backgroundColor:'white',flexDirection:'row',width:'100%',alignItems:'center',borderBottomWidth:1,borderColor:'#e3e3e3',elevation:2}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.replace('ManageScreen')}>
                            <Image
                                source={require('./left.png')}
                                style={{width: 25, height: 28,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'black',fontFamily:'AvenirLTStd-Heavy',fontSize:22,marginLeft:100}}>
                         Comment
              
          


                       </Text>


                    </View>

                    
                       


                      {this.state.Flatlistitems.length == 0 &&( 

                        <ScrollView style={{height:'auto'}}>
                        
                       <Text style={{fontSize:22,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',alignSelf:'center',marginTop:'80%'}}>No Comments</Text>
                        
                        
                        </ScrollView>

                       )}


                      {this.state.Flatlistitems.length != 0 &&(

                        <ScrollView style={{height:'auto'}}>
                        
                       <Text style={{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D',marginLeft:16,marginTop:18}}>{this.state.num} comments</Text>
                        

                        <FlatList style={{marginTop:20,marginBottom:65}}
                       data={this.state.Flatlistitems}
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
                       /> 

                       </ScrollView> 

                      )}  

                    

                    <KeyboardAwareScrollView style={{position: 'absolute', left: 0, right: 0, bottom: 0}} behavior="position">

                    <View style={{height:70,width:'100%',flexDirection:'row',alignItems:'center',backgroundColor:'white',borderWidth:1,borderColor:'#e3e3e3',justifyContent:'space-between',shadowOffset:{  width: 0,  height: -7,  },
shadowColor: 'black',
shadowOpacity: 1.0}}>
           <TextInput
           style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',marginLeft:15,color:'#161F3D',width:'84%',height:70}}
           placeholder="Add a comment…"
           placeholderTextColor="#161F3D"
           multiline={true}
           numberOfLines={3}
           onChangeText={(text) => this.setState({comment: text})}
           value={this.state.comment}
           />
           
           <TouchableOpacity style={{marginRight:18}} onPress={()=>this.sendComment()}>
           <Image style={{width:20,height:20,resizeMode:'contain'}} source={require('./send.png')} />
           </TouchableOpacity>

            </View>
                     </KeyboardAwareScrollView>

                  </SafeAreaProvider>  

                );

                }

              }

   export default Comment;