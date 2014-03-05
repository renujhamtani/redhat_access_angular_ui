'use strict';

angular.module('RedhatAccessCases', [
  'ui.router',
  'ui.bootstrap'
])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('case', {
      url: '/case/{id:[0-9]{1,8}}',
      templateUrl: 'partials/case.html',
      controller: 'DetailsController',
      resolve: {
//        loggedIn: function($q, $stateParams) {
//          var deferred = $q.defer();
//
//          strata.checkLogin(function(loggedIn) {
//            if (loggedIn) {
//              deferred.resolve(loggedIn);
//            } else {
//              deferred.reject(loggedIn);
//            }
//          });
//
//          return deferred.promise;
//        },
        caseJSON: function($q, $stateParams) {
          var deferred = $q.defer();
          var id = $stateParams.id;

          strata.cases.get(
              id,
              function(response) {
                deferred.resolve(response);
              },
              function(error) {
                deferred.reject(error);
              }
          );

          return deferred.promise;
        },
        attachmentsJSON: function($q, $stateParams) {
          var deferred = $q.defer();
          var id = $stateParams.id;

          strata.cases.attachments.list(
              id,
              function(response) {
                deferred.resolve(response);
              },
              function(error) {
                deferred.reject(error);
              }
          );

          return deferred.promise;
        },
        commentsJSON: function($q, $stateParams) {
          var deferred = $q.defer();
          var id = $stateParams.id;

          strata.cases.comments.get(
              id,
              function(response) {
                deferred.resolve(response);
              },
              function(error) {
                deferred.reject(error);
              }
          );

          return deferred.promise;
        }
      }
    });

    $stateProvider.state('new', {
      url: '/case/new',
      templateUrl: 'partials/new_case.html',
      controller: 'NewController',
      resolve: {
        productsJSON: function($q, $stateParams) {
          var deferred = $q.defer();

          strata.products.list(
              function(response) {
                deferred.resolve(response);
              },
              function(error) {
                deferred.reject(error);
              }
          );

          return deferred.promise;
        }
      }
    });
  });
