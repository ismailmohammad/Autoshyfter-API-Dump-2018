module.exports = (models) => {
    return {
        bearerAuthenticationMiddleware: require('./bearerAuthenticationMiddleware')(models),
        masterAuthenticationMiddleware: require('./masterAuthenticationMiddleware'),
        gateInitializationMiddleware: require('./gateInitializationMiddleware'),
        requestIdentifierMiddleware: require('./requestIdentifierMiddleware')
    }
};