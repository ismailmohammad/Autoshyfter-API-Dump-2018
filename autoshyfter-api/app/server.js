/*
 * Copyright 2018 AutoShyfter. All Rights Reserved
 * This is an unlicensed repository, any unauthorized use is strictly forbidden by Canadian copyright law.
 *
 */

const dotenv = require('dotenv');
dotenv.load();

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const models = require('./models/all');
const middlewares = require('./middlewares/all')(models);
const portNumber = process.env.port || process.env.PORT || 3000;
const depthLimit = require('graphql-depth-limit');


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mongoose connected");
    });

let controllers = require('./controllers/all')(models);
const typeDefs = require('./graphql/typeDefs');

const resolvers = {
    Query: {
        head_offices: controllers.HeadOfficeController.get,
        vendors: controllers.VendorController.get,
        the_employee: controllers.EmployeeController.getCurrent,
        request_logs: controllers.RequestLogController.list,
        employee: controllers.EmployeeController.get
    },
    HeadOffice: {
        vendors: controllers.HeadOfficeController.vendors,
        created_at: controllers.MiscController.createdAtToISOHelper,
        updated_at: controllers.MiscController.updatedAtToISOHelper
    },
    RequestLog: {
        headers: controllers.RequestLogController.headers,
        created_at: controllers.MiscController.createdAtToISOHelper,
        updated_at: controllers.MiscController.updatedAtToISOHelper
    },
    Vendor: {
        head_office: controllers.VendorController.head_office,
        employees: controllers.VendorController.employees,
        created_at: controllers.MiscController.createdAtToISOHelper,
        updated_at: controllers.MiscController.updatedAtToISOHelper
    },
    Employee: {
        vendor: controllers.EmployeeController.vendor,
        created_at: controllers.MiscController.createdAtToISOHelper,
        updated_at: controllers.MiscController.updatedAtToISOHelper
    },
    EmployeeToken: {
        created_at: controllers.MiscController.createdAtToISOHelper,
        updated_at: controllers.MiscController.updatedAtToISOHelper
    },
    Mutation: {
        // HeadOffice CRUD
        createHeadOffice: controllers.HeadOfficeController.create,
        updateHeadOffice: controllers.HeadOfficeController.update,
        deleteHeadOffice: controllers.HeadOfficeController.delete,

        // Vendor CRUD
        createVendor: controllers.VendorController.create,
        updateVendor: controllers.VendorController.update,

        // Employee CRUD
        createEmployee: controllers.EmployeeController.create,
        updateEmployee: controllers.EmployeeController.update,
        deleteEmployee: controllers.EmployeeController.delete,

        createEmployeeToken: controllers.EmployeeTokenController.create,

        // Shift CRUD
        createShift: controllers.ShiftController.create
    }
};


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(middlewares.bearerAuthenticationMiddleware);
app.use(middlewares.gateInitializationMiddleware);
app.use(middlewares.masterAuthenticationMiddleware);
app.use(middlewares.requestIdentifierMiddleware);

/**
 *  If you want to re-enable the GraphQL playground
 *  set playground and introspection to true. I wanted to
 *  keep it off until polished up soon.
**/

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        master: req.master,
        employee: req.employee,
        body: req.body,
        headers: req.headers,
        connection: req.connection,
        identifier: req.identifier
    }),
    introspection: false,
    playground: false,
    validationRules: [ depthLimit(10) ]
});
server.applyMiddleware({ app });

app.use('/version', controllers.MiscController.version);

// Start the server
app.listen(portNumber, () => {
    console.log(`Go to http://localhost:${process.env.PORT}/graphql to run queries!`);
});