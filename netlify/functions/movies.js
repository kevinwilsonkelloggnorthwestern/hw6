// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  //console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

    for (let i=0; i < moviesFromCsv.length; i++) {
// loop through the CSV data, if the year matches the items year
// and genre is in the genre name, create an object and push it to the movies array

let moviePost = moviesFromCsv[i]
if(moviesFromCsv[i].startYear == year && moviesFromCsv[i].genres.includes(genre) ){
returnValue.numResults = returnValue.numResults + 1

//create movies array
let movieObject = {
  movieTitle: moviePost.primaryTitle,
  movieYear: year,
  movieGenre: moviePost.genres
}

//push object into array
returnValue.movies.push(movieObject)

}  

}

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(returnValue) // a string of data
    }
  }
}