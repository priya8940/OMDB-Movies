const btnEle=document.getElementById('btn');
const searchInputElement=document.getElementById('search-input');
const container=document.getElementById('search-results');
//declaring a array for adding fevorate movies
const favoriteMovies = [];

//adding eventlistener to to btnEle

btnEle.addEventListener('click',async (event)=>{
    event.stopPropagation();
    
       //SEARCHING elements which user have entered
         const searchPattern = searchInputElement.value;
         searchInputElement.value="";
       //fetching data from the given libraray
        const respons=await fetch(`https://www.omdbapi.com/?s=${searchPattern}&page=2&apikey=ee731cd5`)
         //coverting data to json format
         const data= await respons.json();
         const movieArray=data.Search;

         //insert search pattern of array if it is not there
         let isPatterenFound = false;
         for(const existingPatteren of searchPatterns){
             if(existingPatteren === searchPattern){
                 isPatterenFound = true;
                 break;
             }
         }
     
         if(isPatterenFound ===false){
                 searchPatterns.push(searchPattern);
         }
        //for next search to remove previous data from container
            container.innerHTML = "";

             //for loop for iterating  evry element of array
             for(let movie of movieArray){
                   //2creating image element and setting src attribute
                     
                   let imgEle=document.createElement('img');
                   imgEle.setAttribute('src',movie.Poster);
                
                 //1creating div element and setting class result-item
                let divEle=document.createElement('div');
                divEle.setAttribute('class','result-item');

                //setting event listener for movie event
                divEle.addEventListener('click',movieDetails); 

                //3adding movie id
                 divEle.id = movie.imdbID;
                //4adding image element as child of div element
                divEle.appendChild(imgEle);
                 //creating icon Element for the like button
                let iEle=document.createElement('i');
               
                //setting classes to icon element
                iEle.classList.add('class', "fa-regular")
                iEle.classList.add('class', "fa-heart");

                //setting like dislike event listener
                iEle.addEventListener('click',likeOrDislike);
                //inserting icon element in to div
                divEle.appendChild(iEle);

                //putting newly created div element in to container
                container.appendChild(divEle);

             }
              suggestionContainer.style.display='none';
           
    })
//liking and disliking

function likeOrDislike(event){
    event.stopPropagation();
    const parent=event.target.parentElement;
    const movieId=parent.id;
       //i tag class list
   if(event.target.classList.contains('favorite')){
       //icon is red, we need to turn it white
       event.target.classList.remove('favorite');
       event.target.classList.remove('fa-solid');
       event.target.classList.add('fa-regular');
         //search movieId in array and remove it
         let ind = -1;
         for(let i=0; i<favoriteMovies.length;i++){
             if(favoriteMovies[i]===movieId){
                 ind = i;
             }
         }
         if(ind!=-1){
             favoriteMovies.splice(ind,1);
         }

   }else{
       //icon is white, we need to turn it Red
       event.target.classList.add('favorite');
       event.target.classList.add('fa-solid');
       event.target.classList.remove('fa-regular');

       //check if movie is already in the array
       let ind = -1;
       for(let i=0; i<favoriteMovies.length;i++){
           if(favoriteMovies[i].id===movieId){
               ind = i;
           }
       }
       //add movie id to fav array
       if(ind===-1){
           favoriteMovies.push(parent);
       }
       
   }
  // console.log(favoriteMovies);
}
//liked movie page
 const likedButton=document.getElementById('fevorate-movies');
 likedButton.addEventListener('click',(event)=>{
    event.stopPropagation();
    container.innerHTML="";
    for(let movie of favoriteMovies){
       container.appendChild(movie);
    }
 })
 async function movieDetails(event){
    //to stop bubbling we use this stopPropagation
    event.stopPropagation();
    //console.log(event.target.parentElement.id);
    const respons = await fetch(`http://www.omdbapi.com/?apikey=ee731cd5&i=${event.target.parentElement.id}`);
    const data = await respons.json();
    container.innerHTML = "";
    const h3Ele = document.createElement('h3');
    h3Ele.innerText = `TITLE : ${data.Title}`;

    const pYearEle = document.createElement('p');
    pYearEle.innerText = `YEAR : ${data.Year}`;

    const pRatedEle = document.createElement('p');
    pRatedEle.innerText = `RATED : ${data.Rated}`;

    const pReleasedEle = document.createElement('p');
    pReleasedEle.innerText = `RELEASED : ${data.Released}`;

    const pGenreEle = document.createElement('p');
    pGenreEle.innerText = `GENERE : ${data.Genre}`;

    const pActorsEle = document.createElement('p');
    pActorsEle.innerText = `ACTOR : ${data.Actors}`;

    const pPlotEle = document.createElement('p');
    pPlotEle.innerText = `PLOT : ${data.Plot}`;

    const pLanguageEle = document.createElement('p');
    pLanguageEle.innerText = `LANGUAGE : ${data.Language}`;

    const pCountryEle = document.createElement('p');
    pCountryEle.innerText = `COUNTRY : ${data.Country}`;

    const pTypeEle = document.createElement('p');
    pTypeEle.innerText = `TYPE : ${data.Type}`;

    const divEle = document.createElement('div');
    divEle.classList.add('details');
    divEle.appendChild(h3Ele);
    divEle.appendChild(pYearEle);
    divEle.appendChild(pRatedEle);
    divEle.appendChild(pReleasedEle);
    divEle.appendChild(pGenreEle);
    divEle.appendChild(pActorsEle);
    divEle.appendChild(pPlotEle);
    divEle.appendChild(pLanguageEle);
    divEle.appendChild(pCountryEle);
    divEle.appendChild(pTypeEle);
    const imgEle = document.createElement('img');
    imgEle.setAttribute('src',data.Poster);

    const divEle2 = document.createElement('div');
    divEle2.classList.add('movie-details');

    divEle2.appendChild(imgEle);
    divEle2.appendChild(divEle);

    container.appendChild(divEle2);


 }
 searchInputElement.addEventListener('keyup', searchEntelligence);
 const searchPatterns = [];
 const suggestionContainer = document.getElementById('search-suggestions');
 
 function searchEntelligence(event){
    console.log(event.target.value);
    suggestionContainer.style.display='block';
    if(searchInputElement.value===''){
        suggestionContainer.style.display='none';
    }
    suggestionContainer.innerHTML = "";
    const typedValue = event.target.value;
    for(const existingPattern of searchPatterns){
        if(existingPattern.includes(typedValue)){
            const suggetionItemDivEle = document.createElement('div');
            suggetionItemDivEle.classList.add('suggestions-item');

            const pEle = document.createElement('p');
            pEle.innerText = existingPattern;
            suggetionItemDivEle.appendChild(pEle);
            suggetionItemDivEle.addEventListener('click',pickEntelligence);
            suggestionContainer.appendChild(suggetionItemDivEle);
        }
    }
}

function pickEntelligence(event){
    searchInputElement.value = event.target.innerText;
    suggestionContainer.style.display='none';
}
