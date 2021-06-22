
//importing express module to this application
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
    console.log()
    response.send(movies)
})
//get method using request params
app.get('/movies/:directer',function (request, response) {
    console.log(request.params.directer)
    response.send(request.params.directer)
})
//get method using request query params
app.get('/movie',function (request, response) {
    console.log(request.query)
    response.send(request.query)
})

//get method using request query params and body params
app.get('/movie/:directer',function (request, response) {
    console.log(request.params.directer)
    console.log(request.query)
    response.send(request.query)
})

//post request to specifies path
app.post('/addMovie', (req, res) => {
    //data will be given in the body params 
    const movie_name = req.body.movie_name
    const year = req.body.year
    const directer = req.body.directer
    const movie = { movie_name, year, directer }
    console.log(req.body)
    movies.push(movie)
    if (res.status(200)) {
        res.json({ status: "success", message: `${movie_name} has been added to the array` })
    } else {
        res.status(404).json({ error: "No such movie found" })
    }
  })  


  //post request to specifies path
app.post('/addMoviequery', (req, res) => {
    const movie_name = req.query.movie_name
    const year = req.query.year
    const directer = req.query.directer
    const movie = { movie_name, year, directer }
    console.log(req.query)
    movies.push(movie)
    if (res.status(200)) {
        res.json({ status: "success", message: `${movie_name} has been added to the array` })
    } else {
        res.status(404).json({ error: "No such movie found" })
    }
  }) 

  //mthod is used to update the year of movie
  app.put('/movieyear', (req, res) => {
    const index = movies.findIndex(item => {
        return (item.movie_name == req.body.movie_name)
    })
    console.log(index);
  
    if (index >= 0) {
        const updatedMovieYear = movies[index];
        updatedMovieYear.year = req.body.year
        res.status(200).json(updatedMovieYear)
    }
    else {
        res.status(404).json({ error: "Updation of year failed" })
    }
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

//Response status
//ok
app.get('/success200', function(request, response) {
    response.status(200)
    response.send("response is success")
})
//created
app.post('/success201', function(request, response) {
    response.status(201)
    response.send("this typically sends after method called post and put")
})

//Accepted
app.post('/success202/:directer', function(request, response) {
    response.status(202)
    response.send("the actual server it gives from local or third party servers")
})
//No centent
app.get('/success204', function(request, response) {
    response.status(204)
    response.send("There is no content to send for this request, but the headers may be useful")
})
//Already Reported 
app.get('/success208', function(request, response) {
    response.status(208)
    response.send("Already Reported")
})

//client server errors

//400 status gives teh bad request
app.get('/clientError400', function(request, response) {
    response.status(400)
    response.send("Bad Request")
})

// /the client must authenticate itself to get the requested response.
app.get('/clientError401/:directer', function(request, response) {
    response.status(401)
    response.send("Not Authorized")
})

app.post('/clientError402/:directer', function(request, response) {
    response.status(402)
    response.send("402 Payment Required")
})

//The client does not have access rights to the content
app.get('/clientError403', function(request, response) {
    response.status(403)
    response.send("The client does not have access rights to the content")
})

app.put('/clientError403/:directer', function(request, response) {
    response.status(403)
    response.send("The client does not have access rights to the content")
})

//The server refuses the attempt to brew coffee with a teapot.
app.get('/clientError418', function(request, response) {
    response.status(418)
    response.send("The server refuses the attempt to brew coffee with a teapot.")
})

app.post('/clientError418/:directer', function(request, response) {
    response.status(418)
    response.send("The server refuses the attempt to brew coffee with a teapot.")
})

//Internal server Error from the server side
app.get('/serverError500', function(request, response) {
    response.status(500)
    response.send("Internal server Error")
})

//gives server error
app.post('/serverError500:/directer', function(request, response) {
    response.status(500)
    response.send("Internal server Error")
})

app.get('.serverError502', function(request, response) {
    response.status(502)
    response.send("Bad Gateway")
})

app.get('/types', function(request, response) {
    response.set('content-type', 'text')
})

//sending png file         
app.get("/image", function(req, res) {
    res.sendFile(__dirname + "/image.png");
});

//sending mp4 file
app.get("/video", function(req, res) {
    res.sendFile(__dirname + "/video.mp4");
});


//listen to port number 4000
app.listen(3012, () => {
    console.log("server is running at port 3012")
})