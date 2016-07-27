import Rx                                     from 'rx'
import React, { Component }                   from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  ActivityIndicator
 }                                            from 'react-native'
import { Actions }                            from 'react-native-router-flux'

import ImageCell  from '../../components/cells/ImageCell'
import SearchBar  from '../../components/others/SearchBar'
import Image      from '../../models/Image'
import Constants  from '../../Constants'
import Query      from '../../utils/Query'

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
    var subscription = this.state.tabeDataBinding
      .debounce(1000)
      .subscribe(
      (query) => { this.searchImages(query)},//boilerplate
      (e)     => { console.error('Error: ' + e) },
      ()      => { console.log('Completed') }
    )
  }
  initState(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})//boilerplate
    this.state = {
      tabeDataBinding : new Rx.Subject(),
      dataSource: ds.cloneWithRows([]),
      isLoading: false,
      query: '',
      pageNumber: 1,
    }//boilerplate
  }
//lifecycle
  componentDidMount(){
    console.log("componentDidMount")
    this.searchImages('Google')
  }
//render
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          ref="searchBar"
          onSearchChange={this.onSearchChange}
          isLoading={false}
          placeholder="Search image ..."
          onFocus={() => this.refs.listView && this.refs.listView.getScrollResponder().scrollTo({ x: 0, y: 0 })}
        />
        <ListView
          ref="listView"
          dataSource={this.state.dataSource}
          renderSeparator={this.renderSeparator}
          onEndReached={this.onEndReached}
          renderFooter={this.renderFooter}
          renderRow={(image,sectionID,rowID,highlightRowFunc) => this.renderRow(image,sectionID,rowID,highlightRowFunc)}//TODO:fix it: if use this.renderRow, this. will be != GoogleImagesSearchScene
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
        />
      </View>
    )
  }
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
        onPress={() => { this.onRowPress(image,rowID)}}
      />
    )
  }
  renderFooter(){
    if (true) {
      return <ActivityIndicator style={styles.scrollSpinner} />
    } else {
      return <View style={styles.scrollSpinner} />
    }
  }
//UI Actions
  onSearchChange(event: Object){
    var filter = event.nativeEvent.text.toLowerCase()
    console.log("onSearchChange - " + filter)
    console.log(this.testVar)
    this.state.tabeDataBinding.onNext(filter)
  }
  onRowPress(image: Object,rowID: number | string){
    console.log("onTouch title - " + image.title + "\nrowID - " + rowID)
    Actions.ImageScene( {image: image} )
  }
  onEndReached(){

  }
//others TODO: move to viewModel
  searchImages(query: String){

    this.state.query = query

    var
    url = Constants.GOOGLE_API_IMAGES_URL,
    params = {
      q: query,
      start:   this.state.pageNumber,
      alt: "json",
      searchType: "image",
      cx: Constants.GOOGLE_API_CX,
      key: Constants.GOOGLE_API_KEY
    },
    href = Query.get(url, params)

    console.log("searchImages query - " + query)
    console.log("searchImages href -  " + href)

    fetch(href)
       .then((response) => { console.log("to json");        return response.json()})//boilerplate
       .then((json)     => { console.log("set data");       this.setDataSource(json.items) })
       .catch((e)       => { console.log("error - " + e);   this.setDataSource(this.getFakeImagesList())} )
       //.catch((error)   => { console.error(error.stack)})
       .done() //boilerplate
  }
  setDataSource(images: Array<any>) {
    var dataSource = this.state.dataSource.cloneWithRows(images)//boilerplate
    this.setState({ dataSource: dataSource})
  }
  getFakeImagesList(){
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
  scrollSpinner: {
    marginVertical: 20,
  },
});

export default GoogleImagesSearchScene
