export class HttpService {

  static get(url) {
    return new Promise((resolve, reject) => {
      HttpService.request('GET', url)
    .then(response => resolve(response)
    , err => reject(err));
    });
  }

  static request(method, url, json) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.responseText);
          }
        }
      }

      if (json) xhr.send(json);
      else xhr.send();
    });
  }

}