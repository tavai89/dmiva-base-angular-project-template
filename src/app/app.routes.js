
/* main application routes */

(function () {
    angular.module('App')
        .config(function ($urlRouterProvider, $locationProvider) {

            $locationProvider.html5Mode(false).hashPrefix('!');

            $urlRouterProvider.when('', '/home');
            $urlRouterProvider.when('*path', '/home');
        })
        .run(function ($rootScope, $state, $injector) {

            $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
                if (toState.redirectTo) {
                    if (angular.isString(toState.redirectTo)) {
                        if (toState.redirectTo !== toState.name) {
                            evt.preventDefault();
                            $state.go(toState.redirectTo, toParams);
                        }
                    }
                    if (angular.isFunction(toState.redirectTo)) {
                        var redirectToRoute = toState.redirectTo($injector);
                        if (redirectToRoute && redirectToRoute !== toState.name) {
                            evt.preventDefault();
                            $state.go(redirectToRoute, toParams);
                        }
                    }
                }
            });
        });
})();

