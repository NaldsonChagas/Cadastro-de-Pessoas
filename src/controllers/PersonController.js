import { AddressService } from "./../service/AddressService";
import { PersonViewHelper } from "../viewsHelper/PersonViewHelper";
import { Person } from "../models/Person";
import { PersonService } from "../service/PersonService";

export class PersonController {

  constructor() {
    this._viewHelper = new PersonViewHelper();

    const $ = document.querySelector.bind(document);
    this._name = $('#name');
    this._telephone = $('#telephone');
    this._cpf = $('#cpf');
    this._state = $('#state');
    this._city = $('#city');
  }

  savePerson() {
    document.querySelector('#form-person').addEventListener('submit', (e) => {
      e.preventDefault();

      const person = this._createPersonFromHTML();

      PersonService.save(person)
        .then(response => {
          PersonService.listLast(JSON.parse(response))
            .then(p => this._viewHelper.addPersonTable(
              this._createPersonFromJson(JSON.parse(p).person)),
              err => console.log(err))
        }, err => console.log(err));
    });
  }

  listAll() {
    PersonService.list()
      .then(persons => {
        JSON.parse(persons).forEach(person => {
          this._viewHelper.addPersonTable(this._createPersonFromJson(person));
        });
      }, err => console.log(err));
    this.btnBoxActionEvents();
  }

  _createPersonFromJson(json) {
    return new Person(json._id,
      json._name,
      json._telephone,
      json._cpf,
      json._state,
      json._city);
  }

  _createPersonFromHTML() {
    return new Person(undefined,
      this._name.value,
      this._telephone.value,
      this._cpf.value,
      this._state.value,
      this._city.value
    );
  }

  btnBoxActionEvents() {
    const idBoxAction = document.querySelector('#id-box-action');
    const updateBtn = document.querySelector('#update-btn');
    const deleteBtn = document.querySelector('#remove-btn');
    const cancelActionBtn = document.querySelector('#cancel-action-button');

    deleteBtn.addEventListener('click', () => {
      PersonService.delete(idBoxAction.value)
        .then(response => {
          PersonViewHelper.showBoxAction(false);
          this._viewHelper.removeTr();
          console.log(response);
        }, err => console.log(err));
    });

    cancelActionBtn.addEventListener('click', () => {
      PersonViewHelper.showBoxAction(false);
    });
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