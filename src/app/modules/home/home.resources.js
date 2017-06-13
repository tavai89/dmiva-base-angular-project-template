
/* admin resources */

(function () {
    angular.module('App.Home')
        .constant('HomeResourcesConfig', {
            main: {
                base: '*pathhere*',
                endpoints: {
                    load: {
                        method: 'GET'
                    }
                }
            }
        });
})();

