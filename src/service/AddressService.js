import { HttpService } from "./HttpService";

export class AddressService {

  static getStates() {
    return new Promise((resolve, reject) => {
      HttpService.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(states => resolve(states),
      err => reject(err));
    });
  }

  static getCities(stateId) {
    return new Promise((resolve, reject) => {
      HttpService.get(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`)
      .then(cities => resolve(cities),
      err => reject(err));
    })
  }
}