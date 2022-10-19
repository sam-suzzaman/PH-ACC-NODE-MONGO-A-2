const express = require("express");
const tourRouter = express.Router(); // create a router

// Controllers
const {
    tourPostHandler,
    getAllTour,
    getSingleTour,
} = require("../controllers/TourControllers");

// Routes
tourRouter.post("/addTour", tourPostHandler);
tourRouter.get("/getAllTour", getAllTour);
tourRouter.get("/getSingleTour/:ID", getSingleTour);

module.exports = tourRouter; // exporting that router
