
(function() {
    angular.module('App.Home')
        .config(function($stateProvider) {
            $stateProvider
                .state('home', {
                    title: 'Home',
                    url: '/home',
                    templateUrl: 'app/modules/home/views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'home',
                    resolve: {
                    }
                });
        });
})();

