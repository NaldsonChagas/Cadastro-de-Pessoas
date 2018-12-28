export class PersonViewHelper {

  constructor() {
    this._citySelect = document.querySelector('#city');
    this._stateSelect = document.querySelector('#state');
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

  static showLoad(show) {
    const loadEl = document.querySelector('#load');
    if (show) loadEl.classList.remove('invisible');
    else
      if (!loadEl.classList.contains('invisible'))
        loadEl.classList.add('invisible');
  }
}