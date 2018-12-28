export class PersonViewHelper {

  constructor() {
    this._citySelect = document.querySelector('#city');
    this._stateSelect = document.querySelector('#state');

    this._telephone = document.querySelector('#telephone');
    this._cpf = document.querySelector('#cpf');

    this.cpfMask();
    this.telephoneMask();
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

      if (this._cpf.value.charAt(3) != '.' && this._cpf.value.length > 3) {
        this._cpf.value = this._cpf.value.slice(0, 3) + '.' + 
        this._cpf.value.slice(4);
      }

      if (this._cpf.value.charAt(7) != '.' && this._cpf.value.length > 7) {
        this._cpf.value = this._cpf.value.slice(0, 7) + '.' + 
        this._cpf.value.slice(8);
      }

      if (this._cpf.value.charAt(11) != '-' && this._cpf.value.length > 11) {
        this._cpf.value = this._cpf.value.slice(0, 11) + '-' + 
        this._cpf.value.slice(12);
      }
    });
  }

  telephoneMask() {

  }

  static showLoad(show) {
    const loadEl = document.querySelector('#load');
    if (show) loadEl.classList.remove('invisible');
    else
      if (!loadEl.classList.contains('invisible'))
        loadEl.classList.add('invisible');
  }
}