var myStore = angular.module("myStore", []);

myStore.controller("ordersController", ['$scope', '$http', function($scope, $http){
	$scope.completed_orders = gon.completed_orders;
	$scope.current_orders = gon.current_orders;
	$scope.cancelled_orders = gon.cancelled_orders;
	$scope.all_products = gon.products;
	this.tab = 1;
	$scope.search_product = function(key){
		for (var i in $scope.all_products) {
			if ($scope.all_products[i].id == key){
				return $scope.all_products[i].title;
			};
		};
	};

	$scope.cancel_order = function(num){
		var postData = { 'id': $scope.current_orders[num].id , 'statusCode': '訂單取消'};
		$http.post('/admin/orders/change_order_status' , postData);
		$scope.current_orders[num].status = "取消";
		$scope.cancelled_orders.push($scope.current_orders[num]);
		$scope.current_orders.splice(num,1);
	};

	$scope.recover_order = function(num){
		var postData = { 'id': $scope.cancelled_orders[num].id , 'statusCode': '恢復下訂'};
		$http.post('/admin/orders/change_order_status' , postData).success(function(response){
			if (response.result == 'success' ) {
				$scope.cancelled_orders[num].status = "下訂";
				$scope.current_orders.push($scope.cancelled_orders[num]);
				$scope.cancelled_orders.splice(num,1);				
			} else {
				alert("已無庫存，無法恢復訂單");
			};
		});

	};	

	$scope.done_order = function(num){
		var postData = { 'id': $scope.current_orders[num].id , 'statusCode': '訂單完成'};
		$http.post('/admin/orders/change_order_status' , postData);
		$scope.current_orders[num].status = "完成";
		$scope.completed_orders.push($scope.current_orders[num]);
		$scope.current_orders.splice(num,1);
	};

	$scope.undone_order = function(num){
		var postData = { 'id': $scope.completed_orders[num].id , 'statusCode': '改為下訂'};
		$http.post('/admin/orders/change_order_status' , postData);
		$scope.completed_orders[num].status = "完成";
		$scope.current_orders.push($scope.completed_orders[num]);
		$scope.completed_orders.splice(num,1);
	};

}]);

myStore.controller("listController", ['$scope', function($scope){
	this.list = gon.products;
	this.category = gon.category;
	this.c_list = gon.category_dropdown;
	$scope.selection = "顯示全部";
	console.log(gon.category);
	console.log(this.category);

	// 填入各項product的category title
	for (i = 0; i < this.list.length; i++) {		
			for (j = 0; j < this.category.length; j++) {
				if (this.list[i].id === this.category[j][0]) {
					this.list[i].category = this.category[j][1];
				};
			};
	};

	this.specific_product = {
		"id": 0,
		"title": "",
		"link": "",
		"description": "",
		"default_image": "",
		"comments": ""
	};
	this.show = false;
	this.demonstrate_product = function(num) {
		this.show = true;
		var the_id = 0;
		for (i = 0; i < this.list.length; i++) {
			if (this.list[i].id == num) {
				this.specific_product = {
					"id": this.list[i].id,
					"title": this.list[i].title,
					"link": this.list[i].link,
					"description": this.list[i].description,
					"default_image": this.list[i].default_image,
					"comments": this.list[i].comments
				};
				$('#specific_product_id').val(this.list[i].id);
			};
		
		};	

	};



}]);

myStore.controller("productController", ['$scope', function($scope){
	this.specific_product = gon.specific_product;
	this.specific_product.category = gon.category;
}]);	