
(function () {
    'use strict';

    angular
        .module('App.SharedComponents')
        .directive('demoComponent', demoComponent);

    demoComponent.$inject = [];

    function demoComponent() {

        var directive = {
            bindToController: true,
            controller: demoComponentController,
            controllerAs: 'vm',
            restrict: 'EA',
            link: link,
            replace: true,
            templateUrl: 'app/shared/demo-component-template/demo.component.template.html',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
        }
    }

    demoComponentController.$inject = [];

    function demoComponentController() {
        var vm = this;
    }
})();