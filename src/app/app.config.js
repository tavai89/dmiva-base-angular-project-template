
/* main application config */

(function () {
    angular.module('App')
        .constant('AppConfig', {
            appName: 'App',
            version: '0.0.1',
            environment: 'auto',
            environments: {
                'dev-local': {
                },
                'dev': {
                },
                'test': {
                },
                'prod': {
                }
            }
        });
})();

