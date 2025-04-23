import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
const nameUrlSuffix = "name/";
const allUrlSuffix = "all/";


function getCountries(filter) {
    const req = axios.get(`${baseUrl}${allUrlSuffix}`);
    return req.then((res) => {
        return res.data.filter(country => {
            return country.name.common.toLowerCase().includes(filter) || country.name.official.toLowerCase().includes(filter);
        });
    });
}

export default {
    getCountries,
};
