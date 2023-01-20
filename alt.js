// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    // Add code you want to run on page load here
    const BASE_URL = "https://resource-ghibli-api.onrender.com/films"
    const select = document.querySelector('select');
    const form = document.querySelector('form');
   //  const body = document.querySelector('body');
    let recall;
   //  const reviewId = document.querySelector('#review-id');
    const movie = document.querySelector('#movie');
   
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
               movie.append(option);
           }
       })
       .catch((err) => console.log(err));
   
   // movie and info display
       select.addEventListener('change', (event) => {
           event.preventDefault();
           const finder = recall.find((element) => element.title === `${select.value}`);
           const displayInfo = document.querySelector('#display-info');
           displayInfo.innerHTML = ''
           const head3 = document.createElement('h3')
           const para = document.createElement('p')
           const para2 = document.createElement('p')
           // movie details section gets populated with movie description depending on the film sleected
           head3.textContent = `${finder.title}`
           para.textContent = `${finder.release_date}`
           para2.innerHTML = `${finder.description}`
           displayInfo.append(head3, para, para2)
       });
   
   // review section
       form.addEventListener('submit', (eReview) => {
           eReview.preventDefault();
           // add reviews based on the film selected
           const name = `${select.value}`;
           // const finder = recall.find((element) => element.title === `${name}`);
           const review = document.querySelector('#review')
           // const input = document.querySelector('#review-input');
           const value = review.value
           const list = document.createElement('li')
           list.innerHTML = `<strong>${name}: </strong>${value}`;
           const ul = document.querySelector('ul') 
           ul.appendChild(list);
           movie.value = ''
   
            // error (alert) if review was submitted WITHOUT selecting a film
           // const ul1 = document.querySelector('#review-id')
           const listId = document.querySelector('#ID-list')
            if(movie.value === ''){
               list.textContent = value
               window.alert(`Please select a movie first`)
           }else if(movie.value === select) {
               list.textContent = value
           }
   
   
           // resets the reviews (empties the ul content)
           const resetButton = document.querySelector('#reset-reviews')
           resetButton.addEventListener('click', () => {
               ul.innerHTML = ''
           }); 
           
          
           
           // clears input after submission of review
           form.reset();
       })
   }
   
   // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
   // So that testing can work as expected for now
   // A non-hacky solution is being researched
   
   setTimeout(run, 1000);
   