export class HttpService {

  static get(url) {
    return new Promise((resolve, reject) => {
      HttpService.request('GET', url)
        .then(response => resolve(response),
          err => reject(err));
    });
  }

  static post(url, object) {
    return new Promise((resolve, reject) => {
      HttpService.request('POST', url, object)
        .then(response => resolve(response),
          err => reject(err));
    });
  }

  static request(method, url, object) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url, true);

      xhr.setRequestHeader("Content-type", "application/json");

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.responseText);
          }
        }
      }

      if (object) xhr.send(object);
      else xhr.send();
    });
  }

}