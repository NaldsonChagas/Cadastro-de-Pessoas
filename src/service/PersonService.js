import { HttpService } from "./HttpService";

export class PersonService {

  static save(person) {
    return new Promise((resolve, reject) => {
      HttpService.post('http://localhost:3000/person', JSON.stringify(person))
        .then(response => {
          resolve(response);
        },
          err => {
            console.log(err);
            reject('Não foi possível salvar os dados da pessoa');
          });
    });
  }

  static list() {
    return new Promise((resolve, reject) => {
      HttpService.get('http://localhost:3000/person')
        .then(person => resolve(person),
          err => reject(err));
    });
  }

  static listById(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(`http://localhost:3000/person/${id}`)
        .then(person => resolve(person),
          err => reject(err));
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      HttpService.delete(`http://localhost:3000/person/${id}`)
        .then(response => resolve(response),
          err => reject(err));
    });
  }

  static put(id, person) {
    return new Promise((resolve, reject) => {
      HttpService.put(`http://localhost:3000/person/${id}`,
        JSON.stringify(person))
        .then(response => resolve(response),
          err => reject(err));
    });
  }
}