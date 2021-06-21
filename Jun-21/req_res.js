
//importing the express module to this application
const { response } = require('express')
const express = require('express')
let app = express() //instance is created

app.use(express.json())

//sample data
movies = [
    {
        movie_name: "Harry Potter",
        year: 2006,
        directer: "Chris Columbus"
    }
]
//get method to get the data from movies
app.get('/movies',function (request, response) {
  response.cookie("year", '2006', { expires: new Date(Date.now() + 2000), httpOnly: true })
  response.clearCookie('movie_name')
  response.location('back');
  console.log(response.get('location'))
  //c]set the content type to the headers
  response.set('Content-Type', 'text/plain')
  //it will give the contenttype which was set above line in the response
  console.log(response.get('content-type'))
  //it will return content type is json type because data is given in the form of json
  console.log(request.is('application/json'))
  console.log(request.get('content-type'))
  //response.end() will end the respoonse without having any data
  //response.end()
  //response.status(404).end()
  //it checks weather request connection is secure ot not
  console.dir(request.protocol === 'https')
  console.log(request.accepts('image/png'))
  //response.download('know.txt')
  response.send(movies)
  console.dir(request.fresh)
})

app.all('/allmovies',function (request, response) {
  response.send(movies)
})

//delete request to specifies path
app.delete('/delete', (req, res) => {
  const movie = req.body.movie_name
  const movieIndex = movies.findIndex(item => {
      return (item.movie_name === movie)
  })
  if (movieIndex >= 0) {
      movies.splice(movieIndex, 1);
      res.status(200).json({ status: "success", message: `${movie} has been removed from the array` })
  }
  else {
      res.status(404).json({ error: "No such movie found" })
  }
})
//put request to update the year for specified path
app.put('/movieyear', (req, res) => {
  const index = movies.findIndex(item => {
      return (item.movie_name == req.body.movie_name)
  })
  console.log(index + 1);

  if (index >= 0) {
      const updatedMovieYear = movies[index];
      updatedMovieYear.year = req.body.year
      res.status(200).json(updatedMovieYear)
  }
  else {
      res.status(404).json({ error: "Updation of year failed" })
  }
})

//app.disable('trust proxy')
//used to get the path of all the methods requested
var blog = express()
var blogAdmin = express()

app.use('/blog', blog)
blog.use('/admin', blogAdmin)

console.dir(app.path()) // ''
console.dir(blog.path()) // '/blog'
console.dir(blogAdmin.path()) // '/blog/admin'

app.get('/file', function (request, response) {
  //Transfers the file at the given path, path must be an absolute path to the file.
  response.sendFile(__dirname + '/know.txt')
  //sending the status code as a response to teh server
  response.sendStatus(200)
  
})

app.get('/status', function (request, response) {
  response.type('.txt')
  response.set('Content-Type', 'text/plain')
  response.send(movies)
  
  
  if (response.status == 200) {
    console.log(response.status)
  }
})
//post request to specifies path
app.post('/addMovie', (req, res) => {
  const movie_name = req.body.movie_name
  const year = req.body.year
  const directer = req.body.directer
  const movie = { movie_name, year, directer }
  movies.push(movie)
  if (res.status(200)) {
      res.json({ status: "success", message: `${movie_name} has been added to the array` })
  } else {
      res.status(404).json({ error: "No such movie found" })
  }
})

//returns the rendered HTMl view via of callback function
app.set('view engine', 'ejs');
app.render('secondProject\renderHTML', function (err, html) {
  if (err) console.log(err);
  console.log(html);
});

app.route('/events')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
  })

//converts the data into json using stringify
app.get('/a', function(request, response) {
  //version is not supp in param so it will get "deprecated"
  request.param('movie_name')
  response.json(movies)
})


//checks weather content-type is correct or not
//gives information content-type in header
app.get('/', function (req, res) {
  console.log(res.attachment('secondProject\know.txt'))
  //in the response body it redirects google
  res.redirect('http://google.com')
  res.jsonp(movies)
  console.log(req.get('Accept'));  
  //request sends the json format it gives output as json 
  //if not gives false 
  console.log(req.accepts('application/json')); 
  res.end();
});

//listen to port number 4000
app.listen(4000, () => 
    console.log("server is runnning at 4000")
)