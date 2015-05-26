'use strict';
/*jshint camelcase: false */
angular.module('RedhatAccess.ascension').controller('YourCases', [
    '$scope',
    'STATUS',
    'CaseDetailsService',
    'securityService',
    'AUTH_EVENTS',
    '$rootScope',
    'TOPCASES_EVENTS',
    function ($scope, STATUS, CaseDetailsService, securityService, AUTH_EVENTS,$rootScope,TOPCASES_EVENTS) {
    	$scope.CaseDetailsService = CaseDetailsService;

        $scope.init = function () {
        	CaseDetailsService.getYourcases();
        };
        $scope.fetchCaseDetail = function(kase) {
            $rootScope.$broadcast(TOPCASES_EVENTS.topCaseFetched);
        	CaseDetailsService.getCaseDetails(kase);
        };

        if (securityService.loginStatus.isLoggedIn) {
            $scope.init();
        }

        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            $scope.init();
        });

    }
]);
