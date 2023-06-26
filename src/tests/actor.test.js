const supertest = require("supertest")
const app = require("../app")
require("../models")


const URL_BASE = "/api/v1/actors"
let actorId

test("POST -> 'URL_BASE' return status code 201 and res.body.firstName === actor.firstName", async() => {

    const actor = {
        firstName:"Leonardo",
        lastName:"DiCaprio",
        nationality:"USA",
        image:"https://es.wikipedia.org/wiki/Archivo:Leonardo_Dicaprio_Cannes_2019.jpg",
        birthday:"11/11/1974",
    }
  
    const res = await supertest(app).post(URL_BASE).send(actor)
    // console.log(res.body)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GET -> 'URL_BASE' return status code 200 and toHaveLength = 1", async () => {
    const res = await supertest(app).get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE-> `URL_BASE/:id` return status code 200, and res.body.firstName === Leonardo", async () => {

    const res = await supertest(app).get(`${URL_BASE}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Leonardo")
})

test("PUT -> 'URL_BASE/:id' should return status code 200 and res.body.firstName = actor.firstName", async () => {
    const actor = {
        firstName: "Leonardo"
    }
    const res = await supertest(app)
        .put(`${URL_BASE}/${actorId}`)
        .send(actor)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actor.firstName)
})



test("Delete -> 'URL_BASE/:id' should return status code 204 ",async() => {
    const res = await supertest(app).delete(`${URL_BASE}/${actorId}`)
    expect(res.status).toBe(204)
})