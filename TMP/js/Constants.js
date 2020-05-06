import { Platform }  from 'react-native'
export default class Constants {
  static getBarHeigh(){
    return Platform.OS === 'ios' ? 64 : 54
  }
}
Constants.GOOGLE_API_CX = "013770233867257397766:e7fh4k86up8",
Constants.GOOGLE_API_KEY = "AIzaSyD-qVniTDTaTWgqkBpbCb38LsLR-Rxj9e4",
Constants.GOOGLE_API_IMAGES_URL = "https://www.googleapis.com/customsearch/v1"
