changeLocation for AngularJS v 0.1
===========
Simple service for redirecting by controller name, with exact parameters binding.

Usage example:
    call:
        changeLocation('PersonDetailController', {Id: $scope.person.Id});
    this will cause the service to look for routes which lead to 'PersonDetailController',
    but only the route which parameters list exactly matches the parameters object provided will be used
    in the example case, the second route will be matched:

    $routeProvider.when('/person', { controller: 'PersonDetailController' });
    $routeProvider.when('/person/:Id', { controller: PersonDetailController });
    
    be aware that the parameters list must match EXACTLY, that is - calling:
        changeLocation('PersonDetailController', {ShowPhoto:false, Id: $scope.person.Id});
    won't match any of the above routes, but will match this one
    $routeProvider.when('/person/:Id/:ShowPhoto', { controller: PersonDetailController });    

Known limitations:
    * routes referencing controller by function reference (not name) might not work properly

Author:
    Micha³ migajek Gajek
    http://migajek.com/
