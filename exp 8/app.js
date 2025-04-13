// app.js
var app = angular.module('bookApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/binding', {
      templateUrl: 'partials/binding.html',
      controller: 'MainController'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'MainController'
    })
    .when('/books', {
      templateUrl: 'partials/book.html',
      controller: 'MainController'
    })
    .when('/service', {
      templateUrl: 'partials/service.html',
      controller: 'MainController'
    })
    .otherwise({
      redirectTo: '/binding'
    });
});

app.factory('AuthService', function() {
  var credentials = { username: 'Sneha', password: '1234' };
  return {
    authenticate: function(user) {
      return user.username === credentials.username && user.password === credentials.password;
    }
  };
});

app.filter('bookFilter', function() {
  return function(books, searchText) {
    if (!searchText) return books;
    searchText = searchText.toLowerCase();
    return books.filter(function(book) {
      return book.title.toLowerCase().includes(searchText) ||
             book.author.toLowerCase().includes(searchText) ||
             book.genre.toLowerCase().includes(searchText);
    });
  };
});

app.controller('MainController', function($scope, AuthService) {
  $scope.welcomeMessage = "Welcome to AngularJS";
  $scope.user = { name: '', mood: '😊' };
  $scope.loginData = {};
  $scope.loginSuccess = false;
  $scope.loginError = false;

  $scope.login = function() {
    if (AuthService.authenticate($scope.loginData)) {
      $scope.loginSuccess = true;
      $scope.loginError = false;
      $scope.successMessage = "Login successful!";
    } else {
      $scope.loginSuccess = false;
      $scope.loginError = true;
      $scope.errorMessage = "Invalid username or password.";
    }
  };

  $scope.books = [
    { title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Adventure" },
    { title: "1984", author: "George Orwell", genre: "Dystopian" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic" }
  ];
});
