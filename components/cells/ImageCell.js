import React, { Component, } from 'react'
import {
  View,
  Text,
} from 'react-native'

class ImageCell extends Component {

  static propTypes = {
    text: React.PropTypes.string.isRequired
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
          The - {this.props.text}
        </Text>
      </View>
    )
  }
}

export default ImageCell