import { AddressService } from "./../service/AddressService";

export class PersonController {

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

    AddressService.getStates()
    .then((result) => {
      JSON.parse(result).forEach(state => {
        states.push(state);
      });

      this.addStatesInSelect(states.sort((a, b) => {
        if (a.sigla < b.sigla) return -1;
        return 1;
      }));
    }).catch((err) => {
      console.log(err);
      
    });
  }
}