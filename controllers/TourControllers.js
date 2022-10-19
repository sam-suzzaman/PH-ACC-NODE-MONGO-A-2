const { db } = require("./../models/TourModel");
const TourModel = require("./../models/TourModel"); // import module

// Sorting:
const trandingTour = async (req, res) => {
    try {
        const allTours = await TourModel.find({}).sort({ likes: -1 }).limit(3); // return all tour data
        res.status(201).json({
            status: "success",
            data: allTours,
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message,
        });
    }
};

const getCheapestTour = async (req, res) => {
    try {
        const allTours = await TourModel.find({}).sort({ price: 1 }).limit(3); // return all tour data
        res.status(201).json({
            status: "success",
            data: allTours,
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message,
        });
    }
};

const queryBasedSort = async (req, res) => {
    const queryText = Object.values(req.query)[0];
    const sort = {};
    sort[queryText] = -1;

    try {
        const data = await TourModel.aggregate([{ $sort: sort }]);

        res.status(201).json({
            status: "success",
            data: data,
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message,
        });
    }
};

const getQueryBasedTour = async (req, res) => {
    const query = req.query;
    try {
        const querySearchTour = await TourModel.find(query);
        res.status(201).json({
            status: "success",
            data: querySearchTour,
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message,
        });
    }
};

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
    let { page, limit = 3 } = req.query;

    if (page) {
        page = parseInt(page);
        limit = parseInt(limit);

        const skipValue = (page - 1) * limit;

        // loading the product/tours that contains on current page number
        const currentPageTours = await TourModel.find({})
            .skip(skipValue)
            .limit(limit);

        const totalTours = await TourModel.countDocuments({});

        // calculating page number that used for pagination in frontend
        const pageCount = Math.ceil(totalTours / limit);

        res.status(200).json({
            status: "success",
            pageCount,
            data: {
                currentPageTours,
            },
        });
    } else {
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
    }
};

// Post Handlers
const tourPostHandler = async (req, res) => {
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
    trandingTour,
    getCheapestTour,
    getQueryBasedTour,
    queryBasedSort,
};
