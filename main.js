





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function


function run() {
// Add code you want to run on page load here
const BASE_URL = "https://resource-ghibli-api.onrender.com/films"
const select = document.querySelector('select');
const form = document.querySelector('form');
let recall;
const movie = document.querySelector('#movie');
const review = document.querySelector('#review')    

     fetch(BASE_URL)
     .then((res) => res.json())
     .then((data) => {
    recall = data

    //drop down menu
        for(let i = 0; i < data.length; i++){
            const title = data[i].title;
            const option = document.createElement('option');
        option.textContent = title;
        option.value = title;
        select.append(option);
    }
    })
    //  .catch((err) => console.log(err));
    
     //movie and info display
    select.addEventListener('change', (event) => {
        event.preventDefault();
        const finder = recall.find((element) => element.title === `${select.value}`);
        const displayInfo = document.querySelector('#display-info');
        displayInfo.innerHTML = ''
        const head3 = document.createElement('h3')
        const para = document.createElement('p')
        const para2 = document.createElement('p')
   // movie details
    head3.textContent = `${finder.title}`
    para.textContent = `${finder.release_date}`
    para2.innerHTML = `${finder.description}`
    displayInfo.append(head3, para, para2)
    });
    
    //review section
    form.addEventListener('submit', (event) => {
         event.preventDefault();
    // adding selected movie reviews
    const name = `${select.value}`;
    const value = review.value
    const list = document.createElement('li')
    list.innerHTML = `<strong>${name}: </strong>${value}`;
    const ul = document.querySelector('ul') 
    ul.append(list);
    movie.value = ''
    
    
    // Reset button
    const button = document.querySelector('#reset-reviews')
        button.addEventListener('click', () => {
        ul.innerHTML = ''
    }); 
    
    // error (alert) if review was submitted WITHOUT selecting a film
    const listId = document.querySelector('#ID-list')
        if(select.value === ''){
            list.textContent = value
        window.alert(`Please select a movie first`)
    } else if(select.value === select) {
        list.textContent
    }
    // const listPpl = document.querySelector('#review-list')
    // fetch(`https://resource-ghibli-api.onrender.com/films/${select}`)
    // .then(response => response.json())
    // .then(data => {
    //     // Get the value of the text input
    //     const reviewText = review.value;

    // //     // Create a new list item
    // //     const listItem = document.createElement('li');
    // //     listItem.innerHTML = `<strong>${data.title}</strong> ${reviewText}`;
    //     listPpl.appendChild(list);
    //  })

    
    //show people
    const PEOPLE_URL = "https://resource-ghibli-api.onrender.com/people/"
    const people = document.querySelector('#show-people');    
    people.addEventListener('click', (event) => {                
    event.preventDefault();               
    fetch(PEOPLE_URL)                    
        .then((response) => response.json())            
        .then((people) => {                                
            const pplNames = document.querySelector('#people-names');                
            people.forEach((person) => {                                                        
                    const list = document.createElement('li');                        
                    list.textContent = person.name;                        
                    pplNames.append(list);
            });                       
        });    
});

    // clears form input after submission of reviews
    form.reset();
     })
    };
    
    
    // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
    // So that testing can work as expected for now
    // A non-hacky solution is being researched
    
    setTimeout(run, 1000);