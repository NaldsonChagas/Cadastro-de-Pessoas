import { HttpService } from "./HttpService";

export class AddressService {

  static getStates() {
    return new Promise((resolve, reject) => {
      HttpService.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(states => resolve(states),
      err => reject(err));
    });
  }

  getCities() {

  }
}