import supertest from 'supertest'; 
import { expect } from 'chai';
import app from '../index.js';

const requestWithSupertest = supertest(app);
let newReviewId = "";

// Auto test for GET
describe('Testing GET /movies endpoint', function() {

    it('responds with a valid HTTP status code and number of movies', async function() {
        const DEFAULT_MOVIES_PER_PAGE = 20;
        const response = await requestWithSupertest.get("/api/v1/movies");

        expect(response.status).to.equal(200);
        expect(response.body.movies.length).to.equal(DEFAULT_MOVIES_PER_PAGE);
    });
});

// Auto test for GET movie by ID
describe('Testing GET /movies/id/:id endpoint', function() {

    it('responds with a valid HTTP status code', async function() {
        const DEFAULT_MOVIES_ID = "573a1390f29313caabcd4135";
        const response = await requestWithSupertest.get(`/api/v1/movies/id/${DEFAULT_MOVIES_ID}`);

        if (response.status !== 200) {
            console.log(response.body); // Log the response body for debugging
            console.log(response.error.message); // Log the error message for debugging
          }
        expect(response.status).to.equal(200);
    });
});

// Auto test for GET ratings
describe('Testing GET /movies/ratings endpoint', function() {

    it('responds with a valid HTTP status code', async function() {
        const DEFAULT_MOVIES_ID = "573a139029313caabcd4135";
        const response = await requestWithSupertest.get("/api/v1/movies/ratings");

        expect(response.status).to.equal(200);
    });
});


// Auto test for POST
describe('Testing POST /reviews endpoint', function() {
    it('responds with a valid HTTP status code and acknowledged = true', async function() {

        const DEFAULT_MOVIE_ID = "573a1390f29313caabcd4135";
        const DEFAULT_REVIEW = "This movie is OK by me!";
        const DEFAULT_USER_ID = "1234";
        const DEFAULT_USER_NAME = "Jane Doe";
        
        const res = await requestWithSupertest
            .post("/api/v1/movies/review")
            .set('Content-Type', 'application/json')
            .send({ "movie_id": DEFAULT_MOVIE_ID, 
                    "review": DEFAULT_REVIEW, 
                    "user_id": DEFAULT_USER_ID, 
                    "name": DEFAULT_USER_NAME
                });
               
        newReviewId = res.body.response.insertedId;
        expect(res.status).to.equal(200);
        expect(res.body.response.acknowledged).to.equal(true);
    });
});


// Auto test for PUT
describe('Testing PUT /reviews endpoint', function() {
    it('responds with a valid HTTP status code and modifiedCount = 1', async function() {

        const DEFAULT_REVIEW_ID = newReviewId;
        const DEFAULT_REVIEW = "Actually, after giving it a little thought I think this is actually a bad movie.";
        
        const res = await requestWithSupertest
            .put("/api/v1/movies/review")
            .set('Content-Type', 'application/json')
            .send({ "review_id": DEFAULT_REVIEW_ID, 
                    "review": DEFAULT_REVIEW
                });

        expect(res.status).to.equal(200);
        expect(res.body.response.modifiedCount).to.equal(1);
    });
});


// Auto test for DELETE
describe('Testing DELETE /reviews endpoint', function() {

    it('responds with a valid HTTP status code and deletedCount = 1', async function() {

        const DEFAULT_REVIEW_ID = newReviewId;
        
        const res = await requestWithSupertest
            .delete("/api/v1/movies/review")
            .set('Content-Type', 'application/json')
            .send({ "review_id": DEFAULT_REVIEW_ID });

        expect(res.status).to.equal(200);
        expect(res.body.response.deletedCount).to.equal(1);
    });
});
