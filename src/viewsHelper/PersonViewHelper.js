export class PersonViewHelper {

  constructor() {
    this._citySelect = document.querySelector('#city');
    this._stateSelect = document.querySelector('#state');

    this._cpf = document.querySelector('#cpf');

    this._tbody = document.querySelector('#persons-table');

    this._lastTrClicked;

    this.cpfMask();
  }

  addInSelect(options) {
    const isState = options[0].sigla;

    if (!isState) this._citySelect.innerHTML = '';
    options.forEach(option => {
      const optionEl = document.createElement('option');

      if (isState) {
        optionEl.text = option.sigla;
        optionEl.value = option.id;
        this._stateSelect.add(optionEl);
      } else {
        optionEl.text = option.nome;
        optionEl.value = option.nome;
        this._citySelect.add(optionEl);
      }
    });
  }

  addPersonTable(person) {
    this._tbody.innerHTML = '';
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

      this.checkCPFInput(3, '.');
      this.checkCPFInput(7, '.');
      this.checkCPFInput(11, '-');
    });
  }

  checkCPFInput(index, char) {
    if (this._cpf.value.charAt(index) != char && this._cpf.value.length > index) {
      this._cpf.value = this._cpf.value.slice(0, index) + char +
        this._cpf.value.slice(index + 1);
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