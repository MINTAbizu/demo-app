const express = require('express');
const IndexController = require('../controllers/index').IndexController;

const setRoutes = (app) => {
    const router = express.Router();
    const controller = new IndexController();

    router.get('/items', controller.getItems.bind(controller));
    router.post('/items', controller.createItem.bind(controller));

    app.use('/api', router);
};

module.exports = setRoutes;