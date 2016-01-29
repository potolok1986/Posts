var posts = [{"text":"первая тестовая заметка","date":"18.00"}];





postsCtrl = function($scope){
	$scope.maxLength = 15;
	$scope.minLength = 2;
	$scope.posts = posts;
	$scope.addPost = function () {
		this.postText = "";

		console.log(this);
	};

};
angular
	.module("postsApp",[])
	.controller("PostsController",postsCtrl);
