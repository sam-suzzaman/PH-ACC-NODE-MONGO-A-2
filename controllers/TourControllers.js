const TourModel = require("./../models/TourModel"); // import module

// Delete Tour Data
const deleteTour = async (req, res) => {
    try {
        //  app.delete('/deleteTour/:tourID', deleteTour)
        await TourModel.findByIdAndDelete(req.params.ID);
        res.status(200).json({
            status: "success",
            message: "Tour deleted Successfully",
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message,
        });
    }
};
// Update handler
const updateTour = async (req, res) => {
    const tourID = req.params.ID;
    try {
        //  app.patch('/updateTour/:tourID', updateTour)
        const updatedTour = await TourModel.findByIdAndUpdate(
            tourID,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({
            status: "success",
            data: {
                len: updatedTour.length,
                updatedTour,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message,
        });
    }
};
// GET Handlers

const getSingleTour = async (req, res) => {
    const tourID = req.params.ID;
    try {
        //  tourRouter.get("/getSingleTour/:ID", getSingleTour);
        const singleTour = await TourModel.findById(tourID);

        // adding likes value
        let likeCount = singleTour.likes;
        likeCount = likeCount + 1;
        const tourWithLike = { likes: likeCount };

        // save new data
        const updatedTour = await TourModel.findByIdAndUpdate(
            tourID,
            tourWithLike,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: "success",
            data: {
                updatedTour,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message,
        });
    }
};

const getAllTour = async (req, res) => {
    try {
        const allTours = await TourModel.find({}); // return all tour data
        res.status(201).json({
            status: "success",
            data: allTours,
        });
    } catch (err) {
        console.log(`all tour getting error is: ${err.message}`);
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
};

// Post Handlers
const tourPostHandler = async (req, res) => {
    console.log(req.body);
    try {
        const newTour = await TourModel.create(req.body);
        res.status(201).json({
            status: "success",
            data: newTour,
        });
    } catch (err) {
        console.log(`tour posting error is: ${err.message}`);
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
};

module.exports = {
    tourPostHandler,
    getAllTour,
    getSingleTour,
    updateTour,
    deleteTour,
};
