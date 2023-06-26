const supertest = require("supertest")
const app = require("../app")
require("../models")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")


const URL_BASE = "/api/v1/movies"
let movieId

test("POST -> 'URL_BASE' return status code 201 and res.body.name === movie.name", async () => {

    const movie = {
        name: "Diamante de sangre",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lavanguardia.com%2Fpeliculas-series%2Fpeliculas%2Fdiamante-de-sangre-1372%2Factores&psig=AOvVaw1RXqCkjdC87T60wMZL8AVh&ust=1687835006441000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMCa7sv53_8CFQAAAAAdAAAAABAE",
        synopsis: "Sierra Leona, 1999, el país lleva ocho años de guerra civil. Facciones rebeldes, como el Frente Revolucionario Unido ―FRU―, aterrorizan a los campesinos y los obligan a trabajar en las minas de diamantes, que sirven para financiar la guerra.",
        releaseYear: "2006"
    }

    const res = await supertest(app).post(URL_BASE).send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movie.name)
})

test("GET -> 'URL_BASE' return status code 200 and toHaveLength = 1", async () => {
    const res = await supertest(app).get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE-> `URL_BASE/:id` return status code 200, and res.body.name === Diamante de sangre", async () => {

    const res = await supertest(app).get(`${URL_BASE}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Diamante de sangre")
})

test("PUT -> 'URL_BASE/:id' should return status code 200 and res.body.name = movie.name", async () => {
    const movie = {
        name: "Diamante de sangre"
    }
    const res = await supertest(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(movie)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movie.name)
})


// /movies/:id/actors
test("POST 'URL', should return status code 200 and res.body.length === 1", async () => {

    const actorBody = {
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "USA",
        image: "https://es.wikipedia.org/wiki/Archivo:Leonardo_Dicaprio_Cannes_2019.jpg",
        birthday: "11/11/1974",
    }

    const actor = await Actor.create(actorBody)

    const res = await supertest(app)
        .post(`${URL_BASE}/${movieId}/actors`)
        .send([actor.id])

    // console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await actor.destroy()
})


// /movies/:id/directors
test("POST 'URL', should return status code 200 and res.body.length === 1", async () => {

    const directorBody = {
        firstName:"Edward",
        lastName:"Zwick",
        nationality:"USA",
        image:"https://es.wikipedia.org/wiki/Archivo:Edward_Zwick_2016.jpg",
        birthday:"08/10/1952",
    }
    const director = await Director.create(directorBody)
    // console.log(director)

    const res = await supertest(app)
        .post(`${URL_BASE}/${movieId}/directors`)
        .send([director.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await director.destroy()
})


// /movies/:id/genres
test("POST 'URL', should return status code 200 and res.body.length === 1", async () => {

    const genreBody = {
        name:"Accion"    
    }

    const genre = await Genre.create(genreBody)
    
    const res = await supertest(app)
        .post(`${URL_BASE}/${movieId}/genres`)
        .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await genre.destroy()
})



test("Delete -> 'URL_BASE/:id' should return status code 204 ", async () => {
    const res = await supertest(app).delete(`${URL_BASE}/${movieId}`)
    expect(res.status).toBe(204)
})