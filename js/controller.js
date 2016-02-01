moment.locale("ru");
var config = {
	maxLength: 150,                 // Максимальное колличесво символов Заметки
	minLength: 1,                  // Минимальное количество символов Заметки
	timeUpdate: 60000,             // Время обовление даты публикации в милисекундах
	storageName: "postsStorage"    // Название локального хранилища
};


// В данном объекте хранится разница времени настоящего с временем заметки из хранилища в минутах,
// и текстовые значения подписи соответствующие дате создания заметки,  указываются в порядке возрастания

var timeList = {
	0: "Только что.",
	1: "1 минуту назад.",
	2: "2 минуты назад.",
	5: "Около 5 минут назад.",
	10: "Около 10 минут назад.",
	20: "Менее 30 минут назад.",
	30: "Более 30 минут назад.",
	50: "Час назад",
	90: "2 часа назад",
	120: "max"                     // max означает что все что выше этого значения будет отображаться автоматически через стандарт moment.js
};
var MyLocalStorage = {
	_storage: [],
	_storageName: "postsStorage",
	_updateStorage: function () {
		localStorage.setItem(this._storageName, angular.toJson(this._storage));
	},
	responseLocalStorage: function () {
		this._storage = [];
		if (localStorage.getItem(this._storageName)) {
			this._storage = (JSON.parse(localStorage.getItem(this._storageName)));
		}
		return this._storage;
	},
	addToStorage: function ($scope) {
		var newPost = {
			"text": $scope.postText.replace(/([^>])\n/g, '$1<br/>'),
			date: new moment(),
			dateStr: ""
		};
		$scope.posts.push(newPost);
		this._storage.push(newPost);
		this._updateStorage();
	},
	delToStorage: function ($scope) {
		$scope.posts.splice($scope.posts.length - $scope.$index - 1, 1);
		this._storage.splice(this._storage.length - $scope.$index - 1, 1);
		this._updateStorage();
	},
	dateTransform: function (date) {
		var today = new moment(),
			dateStorage = new moment(date),
			dateString = "",
			result = today.diff(dateStorage, "minutes");
		for (var time in timeList) {
			if (result >= time) {
				timeList[time] === "max" ? dateString = moment(date).calendar() : dateString = timeList[time]
			}
		}
		return dateString;
	},
	addPostOnKeys: function () {
		var buttonCod = ["17", "13"],
			pressed = {};
		document.onkeydown = function (e) {
			e = e || window.event;
			pressed[e.keyCode] = true;
			for (var i = 0; i < buttonCod.length; i++) {
				if (!pressed[buttonCod[i]]) {
					return;
				}
			}
			this.getElementById('btnSubmit').click();
		};
		document.onkeyup = function (e) {
			e = e || window.event;
			delete pressed[e.keyCode];
		};
	}
};

postsCtrl = function ($scope, $interval) {
	$scope.maxLength = config.maxLength;
	$scope.minLength = config.minLength;
	$scope.posts = MyLocalStorage.responseLocalStorage() || [];
	MyLocalStorage.responseLocalStorage();
	$scope.addPost = function () {
		MyLocalStorage.addToStorage($scope);
		this.postText = "";
		this.dateUpdate();
	};
	$scope.deletePost = function () {
		MyLocalStorage.delToStorage(this)
	};
	$scope.dateUpdate = function () {
		angular.forEach($scope.posts, function (value) {
			value["dateStr"] = MyLocalStorage.dateTransform(value["date"]);
		});
	};
	$scope.dateUpdate();
	$interval(function () {
		$scope.dateUpdate();
	}, config.timeUpdate);

};
angular
	.module("postsApp", ['ngSanitize'])
	.controller("PostsController", postsCtrl);


MyLocalStorage.addPostOnKeys();


