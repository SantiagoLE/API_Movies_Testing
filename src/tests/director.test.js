const supertest = require("supertest")
const app = require("../app")
require("../models")

const URL_BASE = "/api/v1/directors"
let directorId

test("POST -> 'URL_BASE' return status code 201 and res.body.firstName === director.firstName", async() => {

    const director = {
        firstName:"Edward",
        lastName:"Zwick",
        nationality:"USA",
        image:"https://es.wikipedia.org/wiki/Archivo:Edward_Zwick_2016.jpg",
        birthday:"08/10/1952",
    }
  
    const res = await supertest(app).post(URL_BASE).send(director)
   
    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET -> 'URL_BASE' return status code 200 and toHaveLength = 1", async () => {
    const res = await supertest(app).get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE-> `URL_BASE/:id` return status code 200, and res.body.firstName === Edward", async () => {

    const res = await supertest(app).get(`${URL_BASE}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Edward")
})

test("PUT -> 'URL_BASE/:id' should return status code 200 and res.body.firstName = director.firstName", async () => {
    const director = {
        firstName: "Edward"
    }
    const res = await supertest(app)
        .put(`${URL_BASE}/${directorId}`)
        .send(director)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(director.firstName)
})

test("Delete -> 'URL_BASE/:id' should return status code 204 ",async() => {
    const res = await supertest(app).delete(`${URL_BASE}/${directorId}`)
    expect(res.status).toBe(204)
})