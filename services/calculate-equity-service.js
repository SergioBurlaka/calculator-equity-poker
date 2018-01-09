

module.exports = function (ngModule) {
    ngModule.factory('calculateEquityService', calculateEquityService);

    calculateEquityService.$inject = ['$http', '$httpParamSerializerJQLike'];


    function calculateEquityService($http,$httpParamSerializerJQLike) {


        var service = {
            calculateEquity: calculateEquity
        };


        return service;



        function calculateEquity(dataForCalculation) {

            var config = {
                method: 'POST',
                url: '/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataForCalculation
            };

            return $http(config);

        }


    }
};
