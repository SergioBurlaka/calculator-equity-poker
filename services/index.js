

module.exports = function (ngModule) {
    require('./calculation-service.js')(ngModule);
    require('./card-generator-service.js')(ngModule);
    require('./find-winner-service.js')(ngModule);
    require('./find-combination-service.js')(ngModule);
    require('./all-combinations-service.js')(ngModule);
    // require('./calculate-equity-service.js')(ngModule);
};