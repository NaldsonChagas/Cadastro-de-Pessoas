import { AddressService } from "./../service/AddressService";

export class PersonController {

  constructor() {
    this.getStates();
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
      this.addStatesInSelect(states.sort((a, b) => {
        if (a.sigla < b.sigla) return -1;
        return 1;
      }));

      this.showLoad(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  showLoad(show) {
    const loadEl = document.querySelector('.load');
    if (show) loadEl.classList.remove('invisible');
    else 
      if (!loadEl.classList.contains('invisible')) 
        loadEl.classList.add('invisible');
  }
}