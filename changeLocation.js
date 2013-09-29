'use strict';

/*

changeLocation for AngularJS v 0.1

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
    
*/

angular.module('changeLocation', [])
.factory('changeLocation', ['$route', '$location',
	function ($route, $location) {
	    return function (CtrlName, params) {
	        params = params || {};
	        var _routesMatching = [];	        
	        var _params = [];
	        for (var _key in params) _params.push(":"+_key);
	        var _paramsCmp = _params.sort().join(', ');
	        function _hasAllParams(_path) {
	            return (_path.match(/:(\w+)/g) || []).sort().join(', ') == _paramsCmp;
	        }

	        for (var path in $route.routes) {
	            if ($route.routes[path].controller === CtrlName) {
	                // for debugging purposes
	                if (!_hasAllParams(path)) {
	                    _routesMatching.push(path);
	                    continue;
	                }
	                var url = path.replace(/:(\w+)/g, function (all, name) {
	                    return params[name];
	                });

	                $location.path(url);

	                return;
	            }
	        }

	        if (_routesMatching.length == 0) {
	            throw "No routes found for Controller: " + CtrlName;
	        } else {
	            var s = "None of the routes found matches exactly the list of passed parameters (" + _paramsCmp + "): \n";
	            s += _routesMatching.join("\n");
	            throw s;
	        }
	    };
	} ])