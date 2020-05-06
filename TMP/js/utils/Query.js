export default class Query {
  constructor() {
  }

  static get(url:string , parameters:Object) {
    var parts = []
    for (var i in parameters) {
        if (parameters.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(parameters[i]));
        }
    }
    return url + "?" + parts.join("&");
}
}
