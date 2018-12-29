import { HttpService } from "./HttpService";

export class PersonService {

  static save(person) {
    return new Promise((resolve, reject) => {
      HttpService.post('http://localhost:3000/person', JSON.stringify(person))
        .then(response => {
          resolve('Pessoa salva com sucesso');
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
}