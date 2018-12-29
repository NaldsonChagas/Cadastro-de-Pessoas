import { AddressService } from "./../service/AddressService";
import { PersonViewHelper } from "../viewsHelper/PersonViewHelper";
import { Person } from "../models/Person";
import { PersonService } from "../service/PersonService";
import { HttpService } from "../service/HttpService";

export class PersonController {

  constructor() {
    this._viewHelper = new PersonViewHelper();

    const $ = document.querySelector.bind(document);
    this._name = $('#name');
    this._telephone = $('#telephone');
    this._cpf = $('#cpf');
    this._state = $('#state');
    this._city = $('#city');

    this._tbody = document.querySelector('#persons-table');
  }

  savePerson() {
    document.querySelector('#form-person').addEventListener('submit', (e) => {
      e.preventDefault();

      const person = this._createPerson();

      PersonService.save(person)
        .then(response => console.log(response),
          err => console.log(err));
    });
  }

  listAll() {
    PersonService.list()
    .then(persons => {
      JSON.parse(persons).forEach(person => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdTelephone = document.createElement('td');
        const tdCpf = document.createElement('td');

        tdName.textContent = person._name;
        tr.appendChild(tdName);
        tdTelephone.textContent = person._telephone;
        tr.appendChild(tdTelephone);
        tdCpf.textContent = person._cpf;
        tr.appendChild(tdCpf);

        this._tbody.appendChild(tr);
      });      
    }, err => console.log(err));
  }

  _createPerson() {
    return new Person(this._name.value,
      this._telephone.value,
      this._cpf.value,
      this._state.value,
      this._city.value
    );
  }

  loadStates() {
    const states = []
    PersonViewHelper.showLoad(true);
    AddressService.getStates()
      .then((result) => {
        JSON.parse(result).forEach(state => {
          states.push(state);
        });
        this._viewHelper.addInSelect(states.sort((a, b) => {
          if (a.sigla < b.sigla) return -1;
          return 1;
        }));
        PersonViewHelper.showLoad(false);
      }).catch((err) => {
        console.log(err);
      });
    this.addEventInState();
  }

  loadCities(stateId = 12) {
    const cities = [];
    PersonViewHelper.showLoad(true);
    AddressService.getCities(stateId)
      .then((result) => {
        JSON.parse(result).forEach(city => {
          cities.push(city);
        });
        this._viewHelper.addInSelect(cities.sort((a, b) => {
          if (a.nome < b.nome) return -1;
          return 1;
        }));
        PersonViewHelper.showLoad(false);
      }, err => console.log(err));
  }

  addEventInState() {
    document.querySelector('#state')
      .addEventListener('change', () => {
        this.loadCities(document.querySelector('#state').value);
      });
  }
}