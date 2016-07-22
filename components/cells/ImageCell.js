import React, { Component,PropTypes } from 'react'
import {
  View,
  Text,
} from 'react-native'

class ImageCell extends Component {

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
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          title - {this.props.item.title}
        </Text>
      </View>
    )
  }
}

export default ImageCell
