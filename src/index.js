import './css/styles.css';

import countriesHbs from './templates/countries.hbs'
import countryHbs from './templates/country.hbs'

import { fetchCountryByName } from './js/fetchCountries';
import getRefs from './js/get-refs';
//import { trim } from 'lodash';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  useIcon: false,
  cssAnimationStyle: 'from-right',
});

const DEBOUNCE_DELAY = 300;
const LENGTH = 10;

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();

    const inputValue = event.target.value;
    const inputValueTrim = inputValue.trim();

    if (!inputValueTrim) {
        refs.cardList.innerHTML = "";
        refs.cardContainer.innerHTML = "";
        return;
    }

    fetchCountryByName(inputValueTrim)
        .then(renderCountryCard)
        .catch(onFetchError)
        //.finally(() => form.reset());
}

function renderCountryCard(country) {
    const markupListCountries = countriesHbs(country);
    const markupCountry = countryHbs(country);

    if (country.length > LENGTH) {
        return Notify.info('Too many matches found. Please enter a more specific name.') 
    }   
        else if (country.length >= 2 && country.length <= LENGTH) {
            refs.cardContainer.innerHTML = markupListCountries;
        }
        else if (country.length === 1) {
            refs.cardContainer.innerHTML = markupCountry;
        } 
}

function onFetchError(error) {
    Notify.failure('Oops, there is no country with that name')

    refs.cardContainer.innerHTML = '';
}