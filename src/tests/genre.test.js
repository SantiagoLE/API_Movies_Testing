const supertest = require("supertest")
const app = require("../app")
require("../models")

const URL_BASE = "/api/v1/genres"
let genreId

test("POST -> 'URL_BASE' return status code 201 and res.body.name === genre.name", async() => {

    const genre = {
        name:"Accion"    
    }
  
    const res = await supertest(app).post(URL_BASE).send(genre)
   
    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(genre.name)
})

test("GET -> 'URL_BASE' return status code 200 and toHaveLength = 1", async () => {
    const res = await supertest(app).get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE-> `URL_BASE/:id` return status code 200, and res.body.name === Accion", async () => {

    const res = await supertest(app).get(`${URL_BASE}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Accion")
})

test("PUT -> 'URL_BASE/:id' should return status code 200 and res.body.name = genre.name", async () => {
    const genre = {
        name: "Accion"
    }
    const res = await supertest(app)
        .put(`${URL_BASE}/${genreId}`)
        .send(genre)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genre.name)
})

test("Delete -> 'URL_BASE/:id' should return status code 204 ",async() => {
    const res = await supertest(app).delete(`${URL_BASE}/${genreId}`)
    expect(res.status).toBe(204)
})