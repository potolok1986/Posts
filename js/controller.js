var posts = [{"text":"первая тестовая заметка","date":"18.00"}];
postsCtrl = function($scope){
	$scope.maxLength = 15;
	$scope.minLength = 2;
	$scope.posts = posts.reverse();
	$scope.addPost = function () {
		$scope.posts.push({
			"text":this.postText,
			"data": new Date().getHours()
		});
		this.postText = "";

	};
	$scope.deletePost = function(){
		console.log(this.$index);
		$scope.posts.splice(this.$index,1);
	}

};
angular
	.module("postsApp",[])
	.controller("PostsController",postsCtrl);
