import { AddressService } from "./../service/AddressService";

export class PersonController {

  constructor() {
    this.getStates();
    this.getCities();
  }

  addStatesInSelect(states) {
    const stateEl = document.querySelector('#state');

    states.forEach(UF => {
      const option = document.createElement('option');

      option.value = UF.id;
      option.text = UF.sigla;

      stateEl.add(option);    
    });
  }

  getStates() {
    const states = []
    this.showLoad(true);
    AddressService.getStates()
    .then((result) => {

      JSON.parse(result).forEach(state => {
        states.push(state);
      });
      console.log(states);
      this.addStatesInSelect(states.sort((a, b) => {
        if (a.sigla < b.sigla) return -1;
        return 1;
      }));

      this.showLoad(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  addCitiesInSelect(cities) {
    const citiesEl = document.querySelector('#city');

    cities.forEach(city => {
      const option = document.createElement('option');
      option.text = city.nome;
      option.value = city.nome;

      citiesEl.add(option);
    });
  }

  getCities(stateId = 12) {
    const cities = [];

    AddressService.getCities(stateId)
    .then((result) => {
      JSON.parse(result).forEach(city => {
        cities.push(city);
      });
      
      this.addCitiesInSelect(cities.sort((a, b) => {
        if (a.nome < b.nome) return -1;
        return 1;
      }));

    }, err => console.log(err));
  }

  showLoad(show) {
    const loadEl = document.querySelector('.load');
    if (show) loadEl.classList.remove('invisible');
    else 
      if (!loadEl.classList.contains('invisible')) 
        loadEl.classList.add('invisible');
  }
}