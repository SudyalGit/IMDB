// favorite movies list
let favMovies=[];

let home=document.querySelector("#home");
let search=document.querySelector("#search-bar");
let favorite=document.querySelector("#favorite");
let cardsContainer=document.querySelector("#cards-container");
let searchIcon=document.querySelector("#search-bar-icon");

//notification
function notification(msg){
	alert(msg);
}

//fetching movies
async function fetchMovies(string){
	const url=`https://omdbapi.com/?s=${string}&page=1&apikey=fc1fef96`;
	
	const response=await fetch(url);
	const data=await response.json();
	renderMovies(data.Search);
}

//render movies
function renderMovies(movies){
	if(movies){
		cardsContainer.innerHTML='';
		for(let movie of movies){
			const card=document.createElement("div");
			card.className='card';
			
			if(isFavMovie(movie.imdbID)){
				card.innerHTML=`<img class="card-img" src="${movie.Poster}" alt="${movie.Title}">
				<div class="name">${movie.Title}</div>
				<div class="year">${movie.Year}</div>
				<button data-id="${movie.imdbID}" class="detail">Detail</button>
				<button data-favid="${movie.imdbID}" class="favorite">Favorite&emsp;<i style="color:rgb(245,197,24);" class="fa-solid fa-star"></i></button>`;
				
			}else{
				card.innerHTML=`<img class="card-img" src="${movie.Poster}" alt="${movie.Title}">
				<div class="name">${movie.Title}</div>
				<div class="year">${movie.Year}</div>
				<button data-id="${movie.imdbID}" class="detail">Detail</button>
				<button data-favid="${movie.imdbID}" class="favorite">Favorite&emsp;<i class="fa-solid fa-star"></i></button>`;
			}
			
			cardsContainer.append(card);
		}
	}
	return;
}

//fetching movie details
async function fetchDetails(id){
	const url=`https://www.omdbapi.com/?i=${id}&apikey=fc1fef96`;
	
	const response=await fetch(url);
	const data=await response.json();
	renderDetails(data);
}

// rendering details of the movie
function renderDetails(movie){
		cardsContainer.innerHTML='';

		const div=document.createElement("div");
		div.className='movie-detail';

		div.innerHTML=`<img src="${movie.Poster}" alt="${movie.Title}">
		<div class="container">
		  <div class="movie-rating"><i class="fa-solid fa-star"></i>&emsp;${movie.imdbRating}</div>
		  <div class="movie-title">Title : ${movie.Title}</div>
		  <div class="movie-year">Year : ${movie.Year}</div>
		  <div class="movie-lang">Language : ${movie.Language}</div>
		</div>`;
		
		cardsContainer.append(div);
}
	
//is movie favorite or not
function isFavMovie(id){
		for(let fav of favMovies){
			if(fav.imdbID==id)
			return true;
		}
		return false;
}

//adding to the favorite
async function addFav(id){
	if(!isFavMovie(id)){
		const url=`https://omdbapi.com/?i=${id}&page=1&apikey=fc1fef96`;
		
		const response=await fetch(url);
			const data=await response.json();
			favMovies.unshift(data);

			notification(data.Title+" added to your Favorites list");
		}else{
			deleteFav(id);
		}
}

//deleting from favorite list
function deleteFav(id){
	newFav=favMovies.filter((fav)=>{
		return fav.imdbID!=id;
	})
	favMovies=newFav;
	notification("Removed from Favorite");
}

//rendering favorite
function renderFavMovies(){
	cardsContainer.innerHTML='';
	for(let fav of favMovies){
		const card=document.createElement("div");
		card.className='card';
		card.innerHTML=`<img class="card-img" src="${fav.Poster}" alt="${fav.Title}">
        <div class="name">${fav.Title}</div>
        <div class="year">${fav.Year}</div>
        <button data-id="${fav.imdbID}" class="detail">Detail</button>
        <button data-notfavid="${fav.imdbID}" class="favorite">Remove Favorite&emsp;<i style="color:red" class="fa-solid fa-star"></i></button>`;
		cardsContainer.append(card);
	}
}


cardsContainer.addEventListener('click', (e)=>{
	if(e.target.dataset.id){
		fetchDetails(e.target.dataset.id);
	}

	if(e.target.dataset.favid){
		if(!isFavMovie(e.target.dataset.favid)){
			e.target.style='color:rgb(245,197,24);';
			e.target.innerHTML=`Favorite&emsp;<i style="color:rgb(245,197,24);" class="fa-solid fa-star"></i>`;
		}else{
			e.target.style='color:white;';
			e.target.innerHTML=`Favorite&emsp;<i class="fa-solid fa-star"></i>`;
		}
		addFav(e.target.dataset.favid);
	}

	if(e.target.dataset.notfavid){
		deleteFav(e.target.dataset.notfavid);
		renderFavMovies();
	}	
})

search.addEventListener('keyup', ()=>{
	fetchMovies(search.value);
})

home.addEventListener('click', ()=>{
	cardsContainer.innerHTML='';
})

searchIcon.addEventListener('click', ()=>{
	fetchMovies(search.value);
})

favorite.addEventListener('click',renderFavMovies);








































// function fetchMovies(){
// 	const fetchMovie=fetch(`https://omdbapi.com/?s=${search}&page=1&apikey=a8dba247`);
// }

// function fetchSearchMovie(search){
// 	// movies=[];
// 	const fetchMovie=fetch(`https://omdbapi.com/?s=${search}&page=1&apikey=a8dba247`);
// 	// console.log(fetchMovie);

// 	fetchMovie.then((response)=>{
// 		// console.log(response);
// 		const jsonResponse=response.json();
// 		// console.log(jsonResponse);
// 		jsonResponse.then((data)=>{
// 			// console.log("hi");
// 			// console.log(data);
// 			if(data.Response=="True"){
// 				movies=data.Search;
// 				console.log(movies);
// 			}
// 	});
// 	})
// }

// fetchSearchMovie("race");

// function renderMovies(){
// 	cardsContainer.innerHTML="";
// 	console.log("movie-rendering");
// 	console.log(movies.length);

// 	for(let i=0;i<movies.length;i++){
// 		let div=document.createElement("div");
// 		div.className="card";
		
// 		// console.log("hi");
// 		// console.log(movie.Poster);
// 		console.log(movies[i].Poster);
// 		console.log(movies[i].Poster);
// 		div.innerHTML=`<img class="card-img" src="${movies[i].Poster}" alt="${movies[i].Title}">
//         <div class="name">${movies[i].Title}</div>
//         <div class="year">${movies[i].Year}</div>
//         <button class="detail">Detail</button>
//         <button class="favorite">Favorite</button>`;
		
// 		cardsContainer.append(div);
// 	}

	
// 		// console.log(cardsContainer);
// 	// console.log(cardsContainer);
	
// 	// for(let movie of movies){
// 	// 	let div=document.createElement("div");
// 	// 	div.className="card";
		
// 	// 	// console.log("hi");
// 	// 	// console.log(movie.Poster);
		
// 	// 	div.innerHTML="movie-1";
		
// 	// 	cardsContainer.append(div);
// 	// 	// console.log(cardsContainer);
// 	// }

// 	// console.log("movie-rendering finishes");
	
	
	
	
// 	// console.log(movies[0].Poster);
	
	
	
	
// }

// renderMovies();
// console.log(cardsContainer);

// search.addEventListener('keyup', ()=>{
// 	let searchString=search.value;
// 	// console.log(searchString.length);

// 	if(searchString.length>0){
// 		// console.log("hi");
// 		fetchSearchMovie(searchString);
// 		renderMovies();
		
// 	}
// })

// renderMovies();




// home.addEventListener('click',fetchSearchMovie);