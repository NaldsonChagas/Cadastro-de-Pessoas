export class Person {

  constructor(id, name, telephone, cpf, state, city) {
    this._id = id;
    this._name = name;
    this._telephone = telephone;
    this._cpf = cpf;
    this._state = state;
    this._city = city;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get telephone() {
    return this._telephone;
  }

  get cpf() {
    return this._cpf;
  }

  get state() {
    return this._state;
  }

  get city() {
    return this._city;
  }
}