var MyLocalStorage = {
	storage:[],
	_storageName : "postsStorage",
	responseLocalStorage : function () {
		this.storage = [];
		if(localStorage.getItem(this._storageName)){
			this.storage = (JSON.parse(localStorage.getItem(this._storageName)));
		}
		return this.storage;
	},
	addToStorage: function($scope){
		var newPost = {
			"text": $scope.postText,
			date: new Date().getMinutes()
		};

		$scope.posts.push(newPost);
		this.storage.push(newPost);
		localStorage.setItem(this._storageName,angular.toJson(this.storage));
	}

};

postsCtrl = function($scope){
	$scope.maxLength = 15;
	$scope.minLength = 1;
	$scope.posts = MyLocalStorage.responseLocalStorage() || [];
	MyLocalStorage.responseLocalStorage();
	$scope.addPost = function () {
		MyLocalStorage.addToStorage($scope);
		this.postText = "";
	};
	$scope.deletePost = function(){
		$scope.posts.splice(this.$index,1);
	}

};
angular
	.module("postsApp",[])
	.controller("PostsController",postsCtrl);

