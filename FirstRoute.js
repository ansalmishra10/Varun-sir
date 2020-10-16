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
  Share,




  } from 'react-native';

import React, {Component} from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { TabView, SceneMap,TabBar, } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stringsoflanguages from './Language';
import ReadMore from 'react-native-read-more-text';
import VideoPlayer from 'react-native-video-controls';
const GLOBAL = require('./Global');
import * as Progress from 'react-native-progress';




class FirstRoute extends React.Component {

  constructor(props){
    super(props);


      this.state = {


        value:0,

        imageget1:0,
        imageget2:0,
        imageget3:0,
        imageget4:0,



        loading:'',
        Flatlistitems: [],




      }

  }


   showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }


   
   onShare = async (item) => {

    // alert(JSON.stringify(item.share_link))
    var commonHtml = `${item.share_link}`;



   var a = commonHtml

   try {
      const result = await Share.share({
        message:a ,
        url:''
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }


  };

   



   getLike=(id,item,index)=> {
    var k = this.state.Flatlistitems[index]
    var total =  parseInt(item.total_likes)
     if (item.is_like == false){
       k.is_like = true
       var n = total + 1
       k.total_likes = n.toString()


     }else{
          k.is_like = false
          var n = total - 1
          k.total_likes = n.toString()
     }
  this.state.Flatlistitems[index] = k
  this.setState({Flatlistitems:  this.state.Flatlistitems})
      //total_likes

       const url = GLOBAL.BASE_URL +  'toggle_post_like'

          this.showLoading()

            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000,
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',
                'Authorization': GLOBAL.token
            },

            body: JSON.stringify({

              "user_id":GLOBAL.userID,
              "id": id

            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) {








          //  this.getData();



         // this.props.navigation.replace('AddScreen')

        // AsyncStorage.setItem('userID', responseData.user_id);

}  else {

  alert("Invalid Credentials")
}


      })
      .catch((error) =>{
        console.error(error);
      })
   }


   getComment=(id)=> {

     // alert(JSON.stringify(id))

     GLOBAL.postID = id

       this.props.navigation.navigate('Comment')
   }




  onButtonClick2=()=> {
    this.setState({imageget1:0})
    this.setState({imageget2:1})
    this.setState({imageget3:0})

  }

  onButtonClick3=()=> {
    this.setState({imageget1:0})
    this.setState({imageget2:0})
    this.setState({imageget3:1})

  }

  componentDidMount() {
    // this.onButtonClick1();

    // alert(JSON.stringify(GLOBAL.token))

    this.getData();
  }


  getData=()=> {
    const url = GLOBAL.BASE_URL +  'get_homepage'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000,
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',

                'Authorization': GLOBAL.token
            },

            body: JSON.stringify({

              "user_id": GLOBAL.userID,
              "limit":20,
              "limit_from":this.state.Flatlistitems.length


            })
        })

            .then((response) => response.json())
            .then((responseData) => {


              if (responseData.status == true ) {

// console.log(JSON.stringify(responseData.data))

 const interest = [...this.state.Flatlistitems, ...responseData.data];
        // GLOBAL.house = responseData.address
                  this.setState({ Flatlistitems : interest })
                  // alert(JSON.stringify(this.state.Flatlistitems))


          this.hideLoading()


}else {
  alert("Invalid Credentials")
}








      })
      .catch((error) =>{
        console.error(error);
      })



  }

  handleState=()=> {
    this.setState({imageget4:1})

  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Medium',color:'#1357A2'}} onPress={handlePress}>
        Read more
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Medium',color:'#1357A2'}} onPress={handlePress}>
        Show less
      </Text>
    );
  }


  _handleTextReady = () => {
    // ...
  }

getSelected = (item,index,oindex) =>{


  // alert(JSON.stringify(item))
var flat = this.state.Flatlistitems[index]
for (var i = 0 ; i <flat.options.length; i++){
  flat.options[i].is_selected = "0"

}
  if (item.is_selected == 0){
    flat.options[oindex].is_selected = 1
  }else{
      flat.options[oindex].is_selected = 0
  }

  this.state.Flatlistitems[index] = flat

  this.setState({Flatlistitems:this.state.Flatlistitems})
}
  


  onButtonClick1=(data, is_selected, indexs, index)=> {


    // this.setState({ fetchID: ''})


    // alert(JSON.stringify(this.state.fetchID))

    var k = this.state.Flatlistitems[index]

    for (var i = 0 ; i <k.options.length; i++){
      k.options[i].is_selected = "0"

    }
    if (k.options[indexs].is_selected == "0"){
k.options[indexs].is_selected = "1"

      // alert(JSON.stringify(k.options[indexs].id))
      this.setState({fetchID: k.options[indexs].id})


    }else{
k.options[indexs].is_selected = "0"
    }
    this.state.Flatlistitems[index] = k
    this.setState({Flatlistitems:this.state.Flatlistitems})



  } 
  


  getResult=(id, index)=> {

    // alert(id)

   var j = this.state.Flatlistitems[index].options

   var k = ''

   for (var i = 0; i < j.length; i++) {
      if( j[i].is_selected == '1') {
        k = j[i].id
      }
   }

   if( k == '') {
     alert('Please select value')
     return

   }

   // alert(k)

     const url = GLOBAL.BASE_URL +  'submit_survey_vote'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000,
            headers: {
                'x-api-key': '45A3EF51F38E8ADAFB0DF1AE7BF2D7F3',
                'Content-Type': 'application/json',

                'Authorization': GLOBAL.token
            },

            body: JSON.stringify({
              "user_id": GLOBAL.userID,
               "survey_id": id,
               "survey_option_id": k,


            })
        })

            .then((response) => response.json())
            .then((responseData) => {



               if (responseData.status == true ) {








                   // alert(JSON.stringify(responseData))

                   var v = responseData.data

                    this.state.Flatlistitems[index] = v

                    this.setState({Flatlistitems: this.state.Flatlistitems})

                   // this.getData();





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


  newsFetch=(item)=> {

    // alert(JSON.stringify(item.image))

    GLOBAL.newsData = item

    this.props.navigation.navigate('NewsDetail')
  }


  renderItem=({item, index}) => {
     // alert(JSON.stringify(item.type))
     let { text } = this.props;

    return(

<View>

 {item.type == 1 &&(

  <TouchableOpacity style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:6,marginLeft:'4%',marginTop:12,borderRadius:8}} onPress={()=>this.newsFetch(item)}>
      <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain',borderRadius:25}} source={{ uri: item.author_image}} />

      <View style={{flexDirection:'column',marginLeft:14}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{item.author_name}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{item.published_date}</Text>
      </View>

     </View>


      <View style={{width:'92%',marginTop:12,marginLeft:'4%'}}>

      <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}>
              <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',lineHeight: 20}}>
                {item.title}
              </Text>
      </ReadMore>

      </View>

      <Image style={{height:152,width:'91%',alignSelf:'center',resizeMode:'cover',marginTop:16,borderRadius:8}} source={{ uri: item.image }} />

      <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',marginBottom:16,marginTop:20,justifyContent:'space-between'}}>

       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'35%'}}>


        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getLike(item.id,item,index)}>

        {item.is_like == true && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like2.png')} />
        )}


        {item.is_like == false && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like.png')} />
        )}


        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>{item.total_likes}</Text>


        </TouchableOpacity>





        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getComment(item.id)}>

        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./comment.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5,marginTop:1.5}}>{item.total_comments}</Text>
        </TouchableOpacity>

        </View>
         
        <TouchableOpacity onPress={()=>this.onShare(item)}>
        <Image style={{height:20,width:22,resizeMode:'contain'}} source={require('./share.png')} />
        </TouchableOpacity>

      </View>
   </TouchableOpacity>

 )}

 {item.type == 2 &&(

  <View style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:6,marginLeft:'4%',marginTop:12,borderRadius:8}}>



     {item.is_voted == false && (

      <View>


      {item.survey_type == 1 &&(


      <View>


     <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={{ uri: item.author_image}} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{item.author_name}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{item.published_date}</Text>
      </View>

     </View>

     <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12,width:'91%',lineHeight:23}}>{item.title}</Text>

   {item.options.map((data, indexs) => {



     return (



     <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:'90%',height:50,borderRadius:25,borderWidth:1,borderColor:'#979797',alignSelf:'center',marginTop:16}} onPress={()=>this.onButtonClick1(data, data.is_selected, indexs, index)}>

      {data.is_selected == "0"  && (
      <View style={{marginLeft:20}} >



       <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />


      </View>
      )}

      {data.is_selected == "1"  && (

      <View style={{marginLeft:20}}>



        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />

      </View>

      )}

      
      <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3DCC',marginLeft:13}}>{data.option}</Text>
     
     </TouchableOpacity>







     );

    })}

     <TouchableOpacity style={{height:35,width:120,borderRadius:17.5,backgroundColor:'#1357A2',marginBottom:23,marginTop:23,alignSelf:'center',justifyContent:'center'}} onPress={()=>this.getResult(item.id, index)}>
       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>{stringsoflanguages.sub}</Text>
     </TouchableOpacity>

     </View>

     )}


      {item.survey_type== 2 && item.is_voted == false && (


        <View>

     <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('./user.png')} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{stringsoflanguages.admin}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{stringsoflanguages.time}</Text>
      </View>

     </View>

     
     <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12,width:'94%'}}>{stringsoflanguages.which}</Text>
     

<View style={{width:'90%',alignSelf:'center'}}>


     {item.options.length == 1 && (

       <View>
       <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[0], index,0)}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[0].option}}>

 <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
{item.options[0].is_selected == 0 && (
    <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
)}
{item.options[0].is_selected == 1 && (
    <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
)}

             </View>

           </ImageBackground>




       </TouchableOpacity>


       </View>
     )}

     {item.options.length == 2 && (
       <View style = {{flexDirection:'row'}}>


        <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[0], index,0)}>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[0].option}}>

         <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[0].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[0].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>


           <TouchableOpacity style={{margin:6}}  onPress={()=>this.getSelected(item.options[1], index,1)}>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[1].option}}>

           <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[1].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[1].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>

           </TouchableOpacity>


       </View>
     )}


     {item.options.length == 3 && (
       <View>
       <View style = {{flexDirection:'row'}}>



           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[0], index,0)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[0].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[0].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[0].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>

           </TouchableOpacity>


           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[1], index,1)}>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[1].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[1].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[1].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>


       </View>
       <View style = {{flexDirection:'row'}}>



           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[2], index,2)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[2].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[2].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[2].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>




       </View>
       </View>
     )}
     {item.options.length == 4 && (
       <View>
       <View style = {{flexDirection:'row'}}>



          <TouchableOpacity style={{ margin:6 }}  onPress={()=>this.getSelected(item.options[0], index,0)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[0].option}}>

                         <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[0].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[0].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
          </TouchableOpacity> 
           
           <TouchableOpacity style={{margin:6}}  onPress={()=>this.getSelected(item.options[1], index,1)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[1].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[1].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[1].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
          </TouchableOpacity> 


       </View>
       <View style = {{flexDirection:'row'}}>



           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[2], index,2)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain'}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[2].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}} >
             {item.options[2].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[2].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>
           
           <TouchableOpacity style={{margin:6}} onPress={()=>this.getSelected(item.options[3], index,3)}>
           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.options[3].option}}>

             <View style={{alignSelf:'flex-end',marginTop:8,marginRight:8}}>
             {item.options[3].is_selected == 0 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle.png')} />
             )}
             {item.options[3].is_selected == 1 && (
                 <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
             )}
             </View>

           </ImageBackground>
           </TouchableOpacity>




       </View>
       </View>
     )}

     </View>




     <TouchableOpacity style={{height:35,width:120,borderRadius:17.5,backgroundColor:'#1357A2',marginBottom:23,marginTop:20,alignSelf:'center',justifyContent:'center'}} onPress={()=>this.getResult(item.id, index)}>
       <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>{stringsoflanguages.sub}</Text>
     </TouchableOpacity>


        </View>
      )}

     </View>

     )}


     {item.is_voted == true && item.survey_type== 2 && (

      <View>

    <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('./user.png')} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{stringsoflanguages.admin}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{stringsoflanguages.time}</Text>
      </View>

     </View>


     <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12,marginBottom:10,width:'91%',lineHeight:23}}>{item.title}</Text>


     
     <View style={{width:'90%',alignSelf:'center'}}>

     {item.options_result.length == 1 && (
       <View>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:12}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[0].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[0].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>




       </View>
     )}

     {item.options_result.length == 2 && (
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:12}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[0].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[0].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:12}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[1].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[1].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>


       </View>
     )}


     {item.options_result.length == 3 && (
       <View>
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:12}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[0].option}}>

             <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

             <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
{item.options_result[0].votes_percentage} %

             </Text>


             </View>

           </ImageBackground>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:12}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[1].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[1].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>


       </View>
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:12}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[2].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[2].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>




       </View>
       </View>
     )}
     {item.options_result.length == 4 && (
       <View>
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:12}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[0].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[0].votes_percentage} %

           </Text>


           </View>
           </ImageBackground>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:12}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[1].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[1].votes_percentage} %

           </Text>


           </View>

           </ImageBackground>


       </View>
       <View style = {{flexDirection:'row'}}>




           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:10}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[2].option}}>


           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[2].votes_percentage} %

           </Text>


           </View>
           </ImageBackground>

           <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:10}} imageStyle={{borderRadius:4}}   source={{ uri: item.options_result[3].option}}>

           <View style = {{backgroundColor:'rgba(0,0,0,0.6)',width:150,height:120,borderRadius:5}}>

           <Text style = {{color:'white',marginTop:40,alignSelf:'center',fontSize:22}}>
      {item.options_result[3].votes_percentage} %
           </Text>


           </View>

           </ImageBackground>




       </View>
       </View>
     )}

    </View>



      <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',marginBottom:16,marginTop:15,justifyContent:'space-between'}}>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'35%'}}>

        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getLike(item.id,item,index)}>
        {item.is_like == true && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like2.png')} />
        )}


        {item.is_like == false && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like.png')} />
        )}


        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>{item.total_likes}</Text>
        </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getComment(item.id)}>
        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./comment.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5,marginTop:1.5}}>{item.total_comments}</Text>
        </TouchableOpacity>

        </View>
       
       <TouchableOpacity onPress={()=>this.onShare(item)}>
        <Image style={{height:20,width:22,resizeMode:'contain'}} source={require('./share.png')} />
        </TouchableOpacity>
      </View>



     </View>

     )}

     {item.is_voted == true && item.survey_type== 1 && (

      <View>

      <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={{ uri: item.author_image}} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{item.author_name}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{item.published_date}</Text>
      </View>

     </View>


     <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:16,marginTop:12,marginBottom:30,width:'91%',lineHeight:23}}>{item.title}</Text>


         {item.options_result.map((data1, key) => {

           var h = parseInt(data1.votes_percentage)/100

           return (




              <View style={{flexDirection:'row',alignItems:'center',width:'90%',alignSelf:'center',marginTop:20,elevation:2}}>
     <View style={{flexDirection:'column',width:'28%'}}>
       <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9',lineHeight:20}}>{data1.option}</Text>

     </View>

     <View style={{flexDirection:'row',alignItems:'center',height:'auto',width:'72%',marginLeft:2}}>



        <Progress.Bar progress={h} width={208} unfilledColor ={'#e3e3e3'} showsText = {true} formatText = {'he'} height = {25} borderColor={'white'} borderTopRightRadius={12.5} borderBottomRightRadius={12.5}  color = {'#1357A2'}/>

        <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Heavy',color:'#1357A2',marginLeft:5}}>{data1.votes_percentage}%</Text>
     </View>
    </View>











            );

         })}


       
       <View style={{width:'90%',alignSelf:'center'}}>

       {item.options_result.length == 2 &&(
        <View style={{width:'70%',height:130,borderBottomWidth:1,borderColor:'#BBBBBB',borderLeftWidth:1,marginLeft:'28%',backgroundColor:'white',marginTop:-100}}>
        </View>

        )}


        {item.options_result.length == 3 &&(
        <View style={{width:'70%',height:180,borderBottomWidth:1,borderColor:'#BBBBBB',borderLeftWidth:1,marginLeft:'28%',backgroundColor:'white',marginTop:-150}}>
        </View>

        )}


        {item.options_result.length == 4 &&(
        <View style={{width:'70%',height:200,borderBottomWidth:1,borderColor:'#BBBBBB',borderLeftWidth:1,marginLeft:'28%',backgroundColor:'white',marginTop:-170}}>
        </View>

        )}
       </View>

      

       


       <View style={{width:'90%',alignSelf:'center',marginTop:12}}>

       <View style={{width:'65%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:'28%'}}>


     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>0</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>20</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>40</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>60</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>80</Text>
     <Text style={{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#8D9AA9'}}>100</Text>


       </View>



      </View>


      <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',marginBottom:16,marginTop:25,justifyContent:'space-between'}}>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'35%'}}>

        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getLike(item.id,item,index)}>
        {item.is_like == true && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like2.png')} />
        )}


        {item.is_like == false && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like.png')} />
        )}


        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>{item.total_likes}</Text>
        </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getComment(item.id)}>
        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./comment.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5,marginTop:1.5}}>{item.total_comments}</Text>
        </TouchableOpacity>

        </View>
        
        <TouchableOpacity onPress={()=>this.onShare(item)}>
        <Image style={{height:20,width:22,resizeMode:'contain'}} source={require('./share.png')} />
        </TouchableOpacity>
      </View>



     </View>

     )}




   </View>

 )}

 {item.type == 3 &&(

  <View style={{width:'92%',height:'auto',backgroundColor:'white',elevation:2,marginBottom:6,marginLeft:'4%',marginTop:12,borderRadius:8}}>
    <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginTop:15}}>
      <Image style={{height:50,width:50,resizeMode:'contain'}} source={{ uri: item.author_image}} />

      <View style={{flexDirection:'column',marginLeft:15}}>
      <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#161F3D'}}>{item.author_name}</Text>
      <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#0000004D'}}>{item.published_date}</Text>
      </View>

     </View>

      <View style={{marginTop:24}}>
     <VideoPlayer style={{ height:230,width:'92%',alignSelf:'center'}}
        onEnd={()=> this.setState({playVideo:false})}
        source={{ uri: item.recorded_path}}
        navigator={ this.props.navigator }
        />
        </View>

    <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',marginBottom:16,marginTop:25,justifyContent:'space-between'}}>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'35%'}}>

        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getLike(item.id,item,index)}>
        {item.is_like == true && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like2.png')} />
        )}


        {item.is_like == false && (
        <Image style={{width:25,height:22,resizeMode:'contain'}} source={require('./like.png')} />
        )}


        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5}}>{item.total_likes}</Text>
        </TouchableOpacity>

       <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.getComment(item.id)}>
        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./comment.png')} />
        <Text style={{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#161F3D',marginLeft:4.5,marginTop:1.5}}>{item.total_comments}</Text>
        </TouchableOpacity>

        </View>


        <TouchableOpacity onPress={()=>this.onShare(item)}>
        <Image style={{height:20,width:22,resizeMode:'contain'}} source={require('./share.png')} />
        </TouchableOpacity>
      </View>

   </View>

 )}

</View>

)
}

_keyExtractor=(item, index)=>item.key;



  renderItem2=({item, indexs ,index}) => {
// console.log(indexs)
      // console.log(index)

    return(

         <View>




             <ImageBackground style={{width:150,height:120,resizeMode:'contain',margin:6}} imageStyle={{borderRadius:4}}   source={{ uri: item.option}}>

               <TouchableOpacity style={{alignSelf:'flex-end',marginTop:8,marginRight:8}} onPress={()=>this.getSelected(item, item.is_selected, index)}>
                <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('./circle2.png')} />
               </TouchableOpacity>

             </ImageBackground>




         </View>

      )

  }


  _keyExtractor2=(item, index)=>item.key;




  render() {


    return(


  <SafeAreaProvider style={{backgroundColor:'white'}}>
        <StatusBar
             backgroundColor = "black"


           />
       <ScrollView style={{width :Dimensions.get('window').width,backgroundColor:'#e3e3e3'}}>


       <FlatList style={{marginTop:5}}
                       data={this.state.Flatlistitems}

                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
                       onEndReachedThreshold={0.5}
                             onEndReached={() => this.getData()}
          />







  </ScrollView>

  </SafeAreaProvider>

      );
  }
}

export default FirstRoute;