import React, { Component,PropTypes } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

class ImageScene extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View
        style={styles.row}>
          <Image
            style={styles.cellImage}
            resizeMode={"contain"}
            source={{uri: this.getThumbnailLink() }}
          />
            <View style={styles.textContainer}>
              <Text
                style={styles.title}>
                title - {this.props.item.title}
              </Text>
            </View>
      </View>
    )
  }

  getThumbnailLink(){
    try {
      return this.props.item.image.thumbnailLink
    } catch (e) {
      return "https://bytesizemoments.com/wp-content/uploads/2014/04/placeholder3.png"
    }
  }


}

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  movieYear: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});


export default ImageScene
