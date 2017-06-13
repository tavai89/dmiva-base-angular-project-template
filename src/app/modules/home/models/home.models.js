
(function () {
    'use strict';

    angular
        .module('App.Home')
        .factory('HomeModels', HomeModels);

    HomeModels.$inject = [];

    function HomeModels() {
        var service = {
            someConfig: someConfig
        };

        return service;

        ////////////////

        function someConfig() {
            return {};
        }
    }
})();