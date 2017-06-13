
/* main application module */

(function () {
    angular.module('App', [
        'ngAnimate',
        'ngResource',
        'ngCookies',
        'ui.router',
        'ui.bootstrap',
        'ui.grid',
        'ui.grid.edit',
        'ui.grid.grouping',
        'ui.grid.pagination',
        'ui.grid.resizeColumns',
        'ui.grid.moveColumns',
        'ui.grid.saveState',
        'ui.grid.selection',
        'ngFileUpload',
        'cgBusy',
        'LocalStorageModule',
        'localytics.directives',
        'toaster',
        'autocomplete',
        'App.SharedComponents',
        'App.Home'
    ])
        .config(function config($compileProvider, $httpProvider, $uibModalProvider) {
            /* Place any initialization or providers setup here */
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);

            $uibModalProvider.options = {
                backdrop: 'static',
                keyboard: true
            };

            ///

            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }

            // disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            // extra
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

            $httpProvider.useApplyAsync(true);
        })
        .run(function run($rootScope, $timeout, $uibModalStack) {
            $rootScope.$on('$stateChangeSuccess', function () {
                $timeout(function () {
                    $uibModalStack.dismissAll();
                });
            });
        });
})();

