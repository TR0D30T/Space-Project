const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');



/* Replaced for fetch()

function getJSON(url) {
  //Set Json function to return a promise
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      resolve(data);
    } else {
      reject( Error(xhr.statusText) );
    }
  };
  //On error conectivity reject promise
  xhr.onerror = () => reject(Error('A network error ocurred') );
  xhr.send();
  });
}
*/

function getProfiles(json) {
  const profiles = json.people.map( person => {
    const craft = person.craft;
    //Return a promise for each iteration from Map
    //return getJSON(wikiUrl + person.name);    CHANGED TO ->
    return fetch(wikiUrl + person.name ) 
    //Parse data to JSON
    //Pass a function that accepts the response via a parameter
    .then( response => response.json() )
    //New parameter profile to pass as function, to return object
    .then( profile => {
      // ... ->Spread operator. To copy all properties from
      // a profile object on to this new object
      //Then in this object, include CRAFT property 
      return { ...profile, craft }
    })
    .catch( err => console.log('Error Fetching Wiki', err))
  }); 
  //If Promise.All() finds any error it will be *catched* and reject the entire promise
  return Promise.all(profiles);
}




function generateHTML(data) {
  data.map( person => {
      const section = document.createElement('section');
      peopleList.appendChild(section);
      section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <span>${person.craft}</span>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
  })
  
}

btn.addEventListener('click', (event) => {
  event.target.textContent = "Loading . . .";
  //Pass to Json a promise -> fetch replaces Json.
  //fetch() / inside () goes url 
  fetch(astrosUrl)
    //To access and use the data, parse data to JSON first.
    //Pass a function that accepts the response via a parameter
    .then( response => response.json() )
    .then(getProfiles)
    .then( generateHTML)
    .catch( err => console.log(err) )
    //Finally takes a funcgion when the promise is settled.
    .finally( () => event.target.remove() )
});