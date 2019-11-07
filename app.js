var app = angular.module('cdg', [require('angular-route'),'angularUtils.directives.dirPagination']);

app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "views/servidor.html",
		controller : "servidorController",
        access: { requiredLogin: false }
	});
	$routeProvider.when("/pessoas", {
		template: "CARALHOOOO",
		// templateUrl : "views/pessoa.html",
		controller : "pessoaController",
        access: { requiredLogin: false }
	});
	$routeProvider.when("/servidores", {
		templateUrl : "views/servidor.html",
		controller : "servidorController",
        access: { requiredLogin: false }
	});
});

