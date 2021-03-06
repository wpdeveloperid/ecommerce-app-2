'use strict';

/**
 * @ngdoc overview
 * @name ecommerceApp
 * @description
 * # ecommerceApp
 *
 * Main module of the application.
 */
angular
  .module('ecommerceApp', [
    'ecommerceApp.moltin',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/store', {
        templateUrl: 'views/store.html',
        controller: 'StoreCtrl',
        controllerAs: 'store',
        resolve: {
          categories: function ($q, MoltinAuth) {
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function (moltin) {
              moltin.Category.List(null, function (categories) {
                deferred.resolve(categories);
              });
            })
            return deferred.promise;
          }
        }
      })
      .when('/category/:id', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl',
        controllerAs: 'category',
        resolve: {
          category: function ($q, $route, MoltinAuth) {
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function (moltin) {
              moltin.Category.Get($route.current.params.id, function (category) {
                deferred.resolve(category);
              });
            })
            return deferred.promise;
          },
          products: function ($q, $route, MoltinAuth) {
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function (moltin) {
              moltin.Product.List({category: $route.current.params.id}, function (products) {
                deferred.resolve(products);
              });
            })
            return deferred.promise;
          }
        }
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'cart'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
