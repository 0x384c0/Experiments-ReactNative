import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ImageCell from '../../components/cells/ImageCell'

    var
    GOOGLE_API_CX = "013770233867257397766:e7fh4k86up8",
    GOOGLE_API_KEY = "AIzaSyD-qVniTDTaTWgqkBpbCb38LsLR-Rxj9e4",
    GOOGLE_API_IMAGES_URL = "https://www.googleapis.com/customsearch/v1"
    
export default class GoogleImagesSearchScene extends Component {
  
//   // Initialize the hardcoded data
  constructor(props) {
    super(props); //boilerplate
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});//boilerplate
    this.state = { dataSource: ds.cloneWithRows([]), enableEmptySections: true };//boilerplate
  }
  
  
  render() {
    return (
      <View style={{marginTop: 80}}>
        <Text>Images Google</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ImageCell text={rowData.title} />}
          enableEmptySections={true}
        />
      </View>
    )
  }
  
  componentDidMount(){
    console.log("componentDidMount")
    this.searchImages('Google')
  }
  
   searchImages(query: String){
     console.log("searchImages - " + query)
     
     var 
       url = new URL(GOOGLE_API_IMAGES_URL),
        params = {
                  q: query,
                  start: "1",
                  alt:"json",
                  searchType:"image",
                  cx: GOOGLE_API_CX,
                  key: GOOGLE_API_KEY
            }
     
     for (var key in params) {//boilerplate
         var value = params[key];//boilerplate
         url.searchParams.append(key, value) //boilerplate
     }//boilerplate
     console.log("href - " + url.href)
     
     fetch(url.href)
       .then((response) => { return response.json()})//boilerplate
       .then((json) => { this.setDataSource(json.items) })
       .done() //boilerplate
  }
  
  setDataSource(movies: Array<any>) {
    var dataSource = this.state.dataSource.cloneWithRows(movies)//boilerplate
    this.setState({ dataSource: dataSource})
  }
  
}