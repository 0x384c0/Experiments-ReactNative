import Rx from 'rx'
import React, { Component } from 'react'
import { View, Text, ListView} from 'react-native'
import { Actions } from 'react-native-router-flux'

import ImageCell from '../../components/cells/ImageCell'
import SearchBar from '../../components/others/SearchBar'

    var
    GOOGLE_API_CX = "013770233867257397766:e7fh4k86up8",
    GOOGLE_API_KEY = "AIzaSyD-qVniTDTaTWgqkBpbCb38LsLR-Rxj9e4",
    GOOGLE_API_IMAGES_URL = "https://www.googleapis.com/customsearch/v1"

var tabeData//find vay to store it in class

export default class GoogleImagesSearchScene extends Component {

  testRx() {
    this.subject = new Rx.Subject()
    this.subscription = this.subject
      .debounce(500)
      .subscribe(
      (x)   => { console.log('Next: ' + x) },
      (err) => { console.log('Error: ' + err) },
      ()    => { console.log('Completed') }
    )
    this.subject.onNext(1)
    this.subject.onNext(2)
    this.subject.onNext(5)
    this.subject.onCompleted()
    this.subscription.dispose()
  }

// Initialize the hardcoded data
  constructor(props) {
    super(props)
    this.initState()
    //this.testRx()
    this.bind()
  }

  bind(){
    tabeData = new Rx.Subject()
    var subscription = tabeData
      .debounce(1000)
      .subscribe(
      (query) => {this.searchImages(query)},//boilerplate
      (e) => { console.error('Error: ' + e) },
      ()    => { console.log('Completed') }
    )
  }
  initState(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})//boilerplate
    this.state = { dataSource: ds.cloneWithRows([])}//boilerplate
  }

  render() {
    return (
      <View >
        <SearchBar
          onSearchChange={this.onSearchChange}
          isLoading={false}
          onFocus={() => this.refs.listview && this.refs.listview.getScrollResponder().scrollTo({ x: 0, y: 0 })}
        />
        <Text>Images Google</Text>
        <ListView
          ref="listview"
          dataSource={this.state.dataSource}
          renderRow={(item) => <ImageCell item={item} />}
          enableEmptySections={true}
        />
      </View>
    )
  }
  componentDidMount(){
    console.log("componentDidMount")
    //this.searchImages('Google')
  }

  onSearchChange(event: Object){
    var filter = event.nativeEvent.text.toLowerCase()
    console.log("onSearchChange - " + filter)
    console.log(this.testVar)
    tabeData.onNext(filter)
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
       .then((json)     => { this.setDataSource(json.items) })
       .catch((error)   => { this.setDataSource(this.getFakeImagesList()); console.log("error - " + error)})
       //.catch((error)   => { console.error(error.stack)})
       .done() //boilerplate
  }

  setDataSource(images: Array<any>) {
    var dataSource = this.state.dataSource.cloneWithRows(images)//boilerplate
    this.setState({ dataSource: dataSource})
  }

  getFakeImagesList(){

    var Image = (title) => {
     this.title = title
    }

    var images = []
    for (var i = 0; i < 10; i++) {
      var image = new Image("Daily Limit Exceeded")
      image.title = "Daily Limit Exceeded"
      images.push(image)
    }
    return images
  }

}
