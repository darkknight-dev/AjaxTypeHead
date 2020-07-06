const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const restapi = 'https://reqres.in/api/users';

// first of all we need an empty array to put our cities into...

const cities = [];

// Then we are going to fetch the data from the API

const prom = fetch(restapi);
console.log(prom);
fetch(endpoint).then(blob => blob.json()) //fetch returns a promise, then blob.json() itself returns a promise
    .then(data => cities.push(...data));// Raw data which contains the massive array

//Next thing we need to do is when someone types into the text box, I need to run a function that is going
// to take this massive array and filter it down into a subset where you can then listen for it..

function findMatches(wordToMatch, cities) // This function take actual word to search and cities array as arguments that is going to filter
{
    return cities.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi'); // g means global which is going to look through the entire string for the speific one, i means case insensitive
        // return place.city.match(/new/i) This does not work, actually we need a variable becuase we will be changing the values to search
        // so we use regex variable using RegExp

        return place.city.match(regex) || place.state.match(regex);

        // In the browser console use findMatches ('bos', cities) to validate this

    });
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//Next thing is to create display function, that is going to be called whenever someone changes value on text box
// Then we will selecting the text box using query selector and listen to events
function displayMatches() {
    console.log(this.value);
    const matchArray = findMatches(this.value, cities);
    console.log(matchArray); // This actually find the array only.. not the actual city or state value

    // Now need the data frpm the array so, loop over the array using Map, map is to manipulate the data
    //without affecting the number of elements

    const html = matchArray.map(place => {

        // This one is for formatting finally
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `<li>

        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>`
    }).join('');
    // Map is going to return an array when we really want one string. So, we can call it dot join at the end
    //and that will turn from an aary with multiple items into one big string
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);



// This is for my understanding

console.log("Start");
const user = loginUser("sri @gmail.com", 12345, () => {
    console.log(user);
});


console.log("Finish");

function loginUser(email, password, callback) {
    // console.log("Hey there")
    setTimeout(() => {
        callback({ userEmail: email });
    }, 5000);
}



// This is the way to return the data from asynchronous code using callbacks in es5
function getMessage(callback) {
    setTimeout(() => {
        callback("Hello");
    }, 3000);
}
function myFunction(message) {
    console.log("hey" + message);
}


const msg = getMessage(myFunction);
//myFunction is the actual Callback function, You can use the data from async code only through the Callback
//function. See above console.log(message) can't be accessed anywhere apart from this.




// In ES6, we don't need callback, instead we have resolve

function getMessage1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello");
        }, 3000);
    })
}

getMessage1()
    .then(myFunction);
    //The data we received from the promise is passed on to the function where we can actually display the data

