import Rx                                     from 'rx'
import React, { Component }                   from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl
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
      listOfImages: new Array(),
      dataSource: ds.cloneWithRows([]),
      isLoading: false,
      query: '',
      pageNumber: 1,
      hasMoreItems: true
    }//boilerplate
  }
//lifecycle
  componentDidMount(){
    console.log("componentDidMount()")
    //this.searchImages('Google')
  }
//render
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          ref="searchBar"
          onSearchChange={this.onSearchChange.bind(this)}
          isLoading={false}
          placeholder="Search image ..."
          onFocus={() => this.refs.listView && this.refs.listView.getScrollResponder().scrollTo({ x: 0, y: 0 })}
        />
        <ListView
          ref="listView"
          dataSource={this.state.dataSource}
          renderSeparator={this.renderSeparator}
          onEndReached={this.onEndReached.bind(this)}
          renderFooter={this.renderFooter.bind(this)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
          refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading && (this.state.listOfImages || 0) != 0}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
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
    //console.log("renderFooter() isLoading - " + this.state.isLoading);
    if (this.state.isLoading) {
      return <ActivityIndicator style={styles.scrollSpinner} />
    } else {
      return <View style={styles.scrollSpinner} />
    }
  }
//UI Actions
  onRefresh(){
    console.log("refresh");
    this.onSearchChange(this.state.query)
  }
  onSearchChange(text: Object){
    console.log("onSearchChange() text: " + text)
    this.state.tabeDataBinding.onNext(text)
  }
  onRowPress(image: Object,rowID: number | string){
    console.log("onTouch() title - " + image.title + " rowID - " + rowID)
    Actions.ImageScene( {image: image} )
  }
  onEndReached(){
    //console.log("onEndReached() listOfImages.length - " + this.state.listOfImages.length + " query - " + this.state.query + " isLoading - " + this.state.isLoading);
    if (
      !this.state.hasMoreItems ||
      this.state.isLoading ||
      (this.state.listOfImages.length || 0) == 0
     ){ return }
     this.loadMoreImages()
  }
//others TODO: move to viewModel
//public
  searchImages(query: String){
    var currentPageNumber = 1
    this.setState({
      isLoading: true,
      pageNumber: currentPageNumber,
      query: query,
      hasMoreItems: true,
      listOfImages: [],
      dataSource: this.state.dataSource.cloneWithRows([])
    })
    this.loadImages(this.state.query, currentPageNumber)
  }
  loadMoreImages(){
    var currentPageNumber = this.state.pageNumber + 1
    this.setState({
      isLoading: true,
      pageNumber: currentPageNumber
    })
    this.loadImages(this.state.query, currentPageNumber)
  }

//private
  loadImages(query: String, page: number){
    console.log("loadImages() query: " + query + " page: " + page + " caller: " + arguments.callee.caller.name)
    var
    url = Constants.GOOGLE_API_IMAGES_URL,
    params = {
      q: query,
      start: page,
      alt: "json",
      searchType: "image",
      cx: Constants.GOOGLE_API_CX,
      key: Constants.GOOGLE_API_KEY
    },
    href = Query.get(url, params)

    //console.log(href);
    fetch(href)
       .then((response) => { return response.json()})//boilerplate
       .then((json)     => { if (json.items.length != 0) { this.setDataSource(json.items)} })
       .catch((e)       => { this.onError()} )
       //.catch((error)   => { console.error(error.stack)})
       .done() //boilerplate

  }
  getFakeImagesList(){
    var images = []
    for (var i = 0; i < 20; i++) {
      var image = new Image("Daily Limit Exceeded")
      image.title = "query: " + this.state.query + "\npage: " + this.state.pageNumber + "\nitem: " + i
      images.push(image)
    }
    return images
  }
//
  setDataSource(images: Array<any>) {

    var oldListOfImages = this.state.listOfImages

    var newListOfImages = oldListOfImages.length == 0 ? images : oldListOfImages.concat(images)

    // for (var i in oldListOfImages) {
    //   newListOfImages.push(oldListOfImages[i]);
    // }


    var dataSource = this.state.dataSource.cloneWithRows(newListOfImages)
    //console.log("setDataSource() images.length - " + images.length + " listOfImages.length - " + this.state.listOfImages.length + "newListOfImages.length - " + newListOfImages.length)

    this.setState({
      dataSource: dataSource,
      isLoading: false,
      listOfImages: newListOfImages
    })

  }
  onError(){
    //this.setState({hasMoreItems: false})
    this.setDataSource(this.getFakeImagesList())
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
