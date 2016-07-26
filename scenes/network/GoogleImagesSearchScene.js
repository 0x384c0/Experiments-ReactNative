import Rx from 'rx'
import React, { Component } from 'react'
import { View, Text, ListView, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'

import ImageCell from '../../components/cells/ImageCell'
import SearchBar from '../../components/others/SearchBar'

    var
    GOOGLE_API_CX = "013770233867257397766:e7fh4k86up8",
    GOOGLE_API_KEY = "AIzaSyD-qVniTDTaTWgqkBpbCb38LsLR-Rxj9e4",
    GOOGLE_API_IMAGES_URL = "https://www.googleapis.com/customsearch/v1"

var tabeData//find vay to store it in class

class GoogleImagesSearchScene extends Component {

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

// Initializeta
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
//lifecycle
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          onSearchChange={this.onSearchChange}
          isLoading={false}
          onFocus={() => this.refs.listview && this.refs.listview.getScrollResponder().scrollTo({ x: 0, y: 0 })}
        />
        <Text>Images Google</Text>
        <ListView
          ref="listview"
          dataSource={this.state.dataSource}
          renderSeparator={this.renderSeparator}
          renderRow={(image,sectionID,rowID,highlightRowFunc) => this.renderRow(image,sectionID,rowID,highlightRowFunc)}//TODO:fix it: if use this.renderRow, this. will be != GoogleImagesSearchScene
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
        />
      </View>
    )
  }
  componentDidMount(){
    console.log("componentDidMount")
    //this.searchImages('Google')
  }
//render
  renderSeparator(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  }
  renderRow(
    image: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <ImageCell
        image={image}
        onPress={() => { this.imageDidSelected(image,rowID)}}
      />
    )
  }


//others
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

  imageDidSelected(image: Object,rowID: number | string){
    console.log("onTouch title - " + image.title + "\nrowID - " + rowID)
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
    for (var i = 0; i < 20; i++) {
      var image = new Image("Daily Limit Exceeded")
      image.title = "Daily Limit Exceeded"
      images.push(image)
    }
    return images
  }

}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});

export default GoogleImagesSearchScene
