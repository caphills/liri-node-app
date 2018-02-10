// add code to read and set any environment variables with the dotenv package:
var dotenv = require("dotenv").config()

//require Twitter package to request Twitter API
var Twitter = require("twitter");

  // require package "request" for omdb API
var request = require("request");

 //require package for Spotify API
var Spotify = require('node-spotify-api');

 // fs is a core Node package for reading and writing files
var fs = require("fs");

//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

// create a process.argv variable for printing out "node" command line arguments
var operation = process.argv[2];
var params = "";
for(i = 3; i < process.argv.length; i++){
	params = params + " " + process.argv[i]
}
// switch cases to call function if the below is entered in the liri command
switch(operation) {
	case "my-tweets":
		doTwit();
		break;
	case "spotify-this-song":
		doSpotify(params);
		break;
	case "movie-this":
		doMovies(params);
		break;
	case "do-what-it-says":
		doWhatItSays(params);
		break;
	default:
		console.log("re-enter your liri command!");
}

function doTwit() {

	var client = new Twitter(keys.twitter);
	
	var parameter = {screen_name: "hollela72"};
	/*get tweets using the params*/
	client.get('statuses/user_timeline', parameter, function(error, tweets, response) {
	// if there is error
		if(error){
			console.log(error)	
		} else{
			for(i=0; i<tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
				console.log('******');
			}
		}
	});
}
// function for pulling in artist, song name, link to song and album using sportify

function doSpotify(song) {
	if(song === "") {
		song = "the sign";	
	}

	// console.log("song title: "+song)

	var spotify = new Spotify(keys.spotify);	
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}
	  	console.log("title: " + data.tracks.items[0].name);
	  	console.log("artist: " + data.tracks.items[0].artists[0].name);
	  	console.log("album: " + data.tracks.items[0].album.name);
	  	if(data.tracks.items[0].preview_url != null) {
	 		console.log("previewLink: " + data.tracks.items[0].preview_url);
	  	} else{
	  		console.log("no url");
	  	}
	});
}

function doMovies(movie) {
	// default mr nobody if no movie title entered
 	if(!movie) {
	 	movie= "Mr Nobody";
	 	console.log(movie);
 	} 
 	// trim and replace spaces with +
	movie = movie.trim().replace(" ","+");

	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
	request.get(queryURL, function(err, res, body){
	
		var movieObject = JSON.parse(body); // console.log(movieObject);
	   	var imdb_rating;
	   	var rottenTomatoes;
	   // loop through the Ratings array of objects  
	   for (i = 0; i<movieObject.Ratings.length; i++){
	     if (movieObject.Ratings[i].Source === 'Internet Movie Database') {
	       imdb_rating = movieObject.Ratings[i].Value;
	     }
	     else if (movieObject.Ratings[i].Source === 'Rotten Tomatoes') {
	       rottenTomatoes = movieObject.Ratings[i].Value;
	     }
	   }

	  // output movie with the info requested
	   console.log('Title: '+movieObject.Title);
	   console.log('Year: '+movieObject.Year);
	   if (imdb_rating){
	     console.log('IMDB Rating: '+imdb_rating);
	   };
	   if (rottenTomatoes){
	     console.log('Rotten Tomatoes Score: '+rottenTomatoes);
	   };

	   console.log('Country: '+movieObject.Country);
	   console.log('Language: '+movieObject.Language);
	   if (movieObject.Plot != 'N/A'){
	     console.log('Plot: '+movieObject.Plot);
	   }
	   console.log('Actors: '+movieObject.Actors);
	});
}
// function if typed what it says
function doWhatItSays(params) {
	console.log("doWhatItSays is under construction!");
	
	fs.readFile("random.txt", "UTF-8", function(error,data){
	if(!error){

	doWhatiItSays = data.split(",");
	input = doWhatItSays[2];
	console.log(params);
 //this function, grabs user input and then runs the function to display the "do-what-it-says" parameters
	}
	});
}



