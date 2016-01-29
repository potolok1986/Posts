postsCtrl = function($scope){
	$scope.maxLength = 150;
console.log($scope);
};
angular
	.module("postsApp",[])
	.controller("PostsController",postsCtrl);
