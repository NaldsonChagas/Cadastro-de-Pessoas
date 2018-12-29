export class PersonViewHelper {

  constructor() {
    const $ = document.querySelector.bind(document);
    
    this._name = $('#name');
    this._telephone = $('#telephone');
    this._cpf = $('#cpf');
    this._state = $('#state');
    this._city = $('#city');

    this._tbody = $('#persons-table');

    this._lastTrClicked;

    this.cpfMask();
    this.telephoneMask();
  }

  addInSelect(options) {
    const isState = options[0].sigla;

    if (!isState) this._city.innerHTML = '';
    options.forEach(option => {
      const optionEl = document.createElement('option');

      if (isState) {
        optionEl.text = option.sigla;
        optionEl.value = option.id;
        this._state.add(optionEl);
      } else {
        optionEl.text = option.nome;
        optionEl.value = option.nome;
        this._city.add(optionEl);
      }
    });
  }

  addPersonTable(person) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdCpf = document.createElement('td');
    const inputId = document.createElement('input');

    inputId.value = person.id;
    inputId.name = 'id';
    inputId.type = 'hidden';

    tdName.textContent = person.name;
    tdName.appendChild(inputId);
    tr.appendChild(tdName);
    tdCpf.textContent = person.cpf;
    tr.appendChild(tdCpf);

    tr.style.cursor = 'pointer';

    this._addTrEvent(tr);

    this._tbody.appendChild(tr);
  }

  _addTrEvent(tr) {
    tr.addEventListener('click', () => {
      this._lastTrClicked = tr;
      const idBoxAction = document.querySelector('#id-box-action');
      idBoxAction.value = tr.childNodes[0].childNodes[1].value;
      PersonViewHelper.showBoxAction(true);
    });
  }
 
  removeTr() {
    this._tbody.removeChild(this._lastTrClicked);
  }

  fillsForm(person) {
    this._name.value = person.name;
    this._telephone.value = person.telephone;
    this._cpf.value = person.cpf;
    this._state.value = person.state;
    this._city.value = person.city;
  }

  cpfMask() {
    this._cpf.addEventListener('input', () => {
      if (isNaN(this._cpf.value.slice(-1))) {
        this._cpf.value = this._cpf.value
          .substring(0, this._cpf.value.length - 1);
        return;
      }

      if (this._cpf.value.length == 3 || this._cpf.value.length == 7) {
        this._cpf.value += '.';
      } else if (this._cpf.value.length == 11) {
        this._cpf.value += '-';
      }

      this.checkMaskInput(3, '.', this._cpf);
      this.checkMaskInput(7, '.', this._cpf);
      this.checkMaskInput(11, '-', this._cpf);
    });
  }

  telephoneMask() {
    this._telephone.addEventListener('input', () => {
      if (isNaN(this._telephone.value.slice(-1))) {
        this._telephone.value = this._telephone.value
          .substring(0, this._telephone.value.length - 1);
        return;
      }

      if (this._telephone.value.length == 2) {
        this._telephone.value += ' ';
      }

      if (this._telephone.value.length == 7) {
        this._telephone.value += '-';
      }

      this.checkMaskInput(2, ' ', this._telephone);
      this.checkMaskInput(7, '-', this._telephone);
      
    });
  }

  checkMaskInput(index, char, input) {
    if (input.value.charAt(index) != char && input.value.length > index) {
      input.value = input.value.slice(0, index) + char +
        input.value.slice(index + 1);
    }
  }

  static showBoxAction(show) {
    const boxAction = document.querySelector('#box-action');
    if (show) boxAction.classList.remove('invisible');
    else 
      if (!boxAction.classList.contains('invisible'))
        boxAction.classList.add('invisible');
  }

  static showLoad(show) {
    const loadEl = document.querySelector('.light-background');
    if (show) loadEl.classList.remove('invisible');
    else
      if (!loadEl.classList.contains('invisible'))
        loadEl.classList.add('invisible');
  }
}