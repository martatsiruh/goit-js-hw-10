export function fetchCountryByName(name){
    const BASE_URL = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
    
    return fetch(BASE_URL)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.status === 404) {
                throw new Error(data.status)
            } else {
                return data
        }
    })
}
