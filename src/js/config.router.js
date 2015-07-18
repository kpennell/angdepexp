'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider','$locationProvider',
      function ($stateProvider,  $urlRouterProvider, $locationProvider) {

        $urlRouterProvider
             .otherwise('/denver/shows');
         $stateProvider
             .state('denver', {
                 abstract: true,
                 url: '/denver',
                 templateUrl: 'tpl/app.html',
                 resolve: {
                   user: ['simpleLogin', function(simpleLogin) {
                   return simpleLogin.getUser();
                   }]
                 }
             })

             .state('denver.shows', {
                 url: '/shows',
                 templateUrl: 'tpl/vibesample.html',
                 controller: 'ShowsCtrl'
             })
             .state('denver.signin', {
                 url: '/signin',
                 templateUrl: 'tpl/signin.html',
                 controller: 'SignInCtrl',
                 resolve: {
                     deps: ['$ocLazyLoad',
                       function( $ocLazyLoad ){
                             return $ocLazyLoad.load('js/controllers/signinctrl.js');

                     }]
                 }
             })
              .state('denver.account', {
                 url: '/account',
                 templateUrl: 'tpl/account.html',
                 controller: 'AccountCtrl',
                 authRequired: true,
                 resolve: {
                     deps: ['$ocLazyLoad',
                       function( $ocLazyLoad ){
                             return $ocLazyLoad.load('js/controllers/AccountCtrl.js');

                     }],
                   user: ['simpleLogin', function(simpleLogin) {
                   return simpleLogin.getUser();
                   }]

                 }
             })

              .state('denver.favorites', {
                 url: '/favorites',
                 templateUrl: 'tpl/favorites.html',
                 controller: 'FavoritesCtrl',
                 authRequired: true,
                 resolve: {
                     deps: ['$ocLazyLoad',
                       function( $ocLazyLoad ){
                             return $ocLazyLoad.load('js/controllers/favoritesctrl.js');

                     }],
                   user: ['simpleLogin', function(simpleLogin) {
                   return simpleLogin.getUser();
                   }]

                 }
             })

              .state('denver.about', {
               url: '/about',
               templateUrl: 'tpl/about.html'
             })







      }
    ]
  );
