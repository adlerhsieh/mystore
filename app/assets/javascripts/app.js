var myStore = angular.module("myStore", []);

myStore.controller("ordersController", ['$scope', function($scope){
	$scope.orders_list = gon.orders;
	$scope.all_products = gon.products;

	$scope.search_product = function(key){
		for (var i in $scope.all_products) {
			if ($scope.all_products[i].id == key){
				return $scope.all_products[i].title;
			};
		};
	};
}]);

myStore.controller("listController", ['$scope', function($scope){
	this.list = gon.products;
	this.specific_product = gon.specific_product;
}]);