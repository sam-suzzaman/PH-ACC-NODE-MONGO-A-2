const express = require("express");
const tourRouter = express.Router(); // create a router

// Controllers
const {
    tourPostHandler,
    getAllTour,
    getSingleTour,
    updateTour,
    deleteTour,
    trandingTour,
    getCheapestTour,
} = require("../controllers/TourControllers");
// const {
//     tourPostHandler,
//     getAllTour,
//     getSingleTour,
//     updateTour,
//     deleteTour,
//     trandingTour,
//     getCheapestTour,
//     getQueryBasedTour,
//     queryBasedSort,
// } = require("../controllers/TourControllers");

// Routes
tourRouter.post("/POST/tours", tourPostHandler);
tourRouter.get("/GET/tours", getAllTour);
tourRouter.get("/GET/tours/:ID", getSingleTour);
tourRouter.get("/GET/tour/trending", trandingTour);
tourRouter.get("/GET/tour/cheapest", getCheapestTour);
// tourRouter.get("/getQueryBasedTour", getQueryBasedTour); // no
// tourRouter.get("/getQueryBasedSort", queryBasedSort); // no
tourRouter.patch("/PATCH/tour/:ID", updateTour);
tourRouter.delete("/DELETE/tour/:ID", deleteTour);

module.exports = tourRouter; // exporting that router
