var productsObj;
var contactUsObj;
var aboutUsObj;
var businessObj;
var mainApp = angular.module('SapientApp', ['ui.router']);

mainApp.config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
        });

        $stateProvider.state('aboutus', {
            url: '/aboutus',
            templateUrl: 'views/aboutus.html',
            controller: 'AboutusController'
        });
        $stateProvider.state('projects', {
            url: '/projects',
            templateUrl: 'views/projects.html',
            controller: 'ProjectsController'
        });
        $stateProvider.state('contactus', {
            url: '/contactus',
            //templateUrl: 'views/about.html'
            // the main template will be placed here (relatively named)
            views: {
                '': {
                    templateUrl: 'views/contact.html',
                    controller: 'ContactController'
                },
                // the child views will be defined here (absolutely named)
                'columnOne@contactus': {
                    templateUrl: 'views/contact/contact-business.html',
                    controller: 'ContactController'
                },
                // for column two, we'll define a separate controller 
                'columnTwo@contactus': {
                    templateUrl: 'views/contact/contact-data.html',
                    controller: 'ContactController'
                }
            }
        });

        $urlRouterProvider.otherwise('/home');
    }
]);


mainApp.controller('SapientController', ['$scope', '$http', function ($scope, $http) {
    $http.get('JSON/carousel-data.json').
    success(function (data, status, headers, config) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            switch (data[i].heading) {
                case "Products":
                    productsObj = data[i];
                    break;
                case "Contact Us":
                    contactUsObj = data[i];
                    break;
                case "About Us":
                    aboutUsObj = data[i];
                    break;
                case "Sapient":
                    businessObj = data[i];
                    break;
            }
        }
        //console.log(businessObj);
    }).error(function (data, status, headers, config) {
        // log error
    });
}]);

mainApp.controller('AboutusController', ['$scope', function ($scope) {
    $scope.imageUrl = aboutUsObj.image;
    $scope.headerText = aboutUsObj.heading;
    //text TODO
}]);

mainApp.controller('ContactController', ['$scope', function ($scope) {
    $scope.imageUrl = contactUsObj.careersImage;
    $scope.headerText = contactUsObj.heading;
    $scope.roles = businessObj.roles;
    console.log($scope.roles);
    
    $scope.mainRoleChecked = function(){
        for(var role in businessObj.roles){
            role.checked = true;   
        }
    }
}]);

mainApp.controller('ProjectsController', ['$scope', function ($scope) {
    $scope.imageUrl = productsObj.image;
    $scope.headerText = productsObj.heading;
}]);
