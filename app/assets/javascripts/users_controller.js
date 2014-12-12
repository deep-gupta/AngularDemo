
var myapplication = angular.module('myapplication', ["ngResource", 'ngRoute', "Devise"]);

	myapplication.config(function(AuthProvider) {
        //alert("1");
        //SignIn
        AuthProvider.loginPath('/users/sign_in.json');
        AuthProvider.loginMethod('POST');
        AuthProvider.resourceName('user');
        
        // Logout
        AuthProvider.logoutPath('/users/sign_out.json');
        AuthProvider.logoutMethod('DELETE');
    });
    
    myapplication.config(function ($routeProvider) 
      { 
		  //alert("2");
		$routeProvider 
        .when('/', { templateUrl: '/app/views/devise/sessions/new.html.erb', controller: 'Demo' }) 
        .when('/users/sign_in', { templateUrl: '/app/views/devise/sessions/new.html.erb', controller: 'Demo' })
        .when('/users', { templateUrl: '/app/views/users/index.html.erb', controller: 'Demo' });
      });


myapplication.controller('Demo', ['$scope', '$http', '$resource', 'Auth', function($scope, $http, $resource, Auth) { 
	//console.log(Devise.Auth)
	
	//alert("3");
	$scope.sign_in_function = function() {
		var credentials = {
            email: $scope.sign_in_user_email,
            password: $scope.sign_in_user_password
        };
        
        Auth.login(credentials).then(function(user) {
		  console.log(user); // => {id: 1, ect: '...'}
		  $scope.flag_for_sign_in = true;
		}, function(error) {
			alert("can't login");
		});
	};
	
	$scope.sign_out_function = function() {
		Auth.logout().then(function(oldUser) {
            alert(oldUser.first_name + "you're signed out now.");
            $scope.flag_for_sign_in = false;
        }, function(error) {
            // An error occurred logging out.
        });
	};
	
    $scope.check_for_sign_in = function() {
		alert(Auth.isAuthenticated());
	};
	
	$scope.initilaValue = 0;
	$scope.clearShowSection = function() {
			$scope.user = {};
		}
	$scope.showuser = function(user_id) {
		var user = $resource("/users/:id.json", {id: "@id"})
		$scope.user = user.get({id:user_id})
		}
		
		$scope.edituser = function(user_id) {
		var user_edit = $resource("/users/:id.json", {id: "@id"})
		$scope.user_edit = user_edit.get({id:user_id})
		}
		
		$scope.update_user = function(user_id) {
			dataObject = {first_name : $scope.user_edit.first_name, last_name : $scope.user_edit.last_name, email : $scope.user_edit.email}
			var responsePromise = $http.put("/users/" + user_id +".json" , dataObject, {});
			var users = $resource("/users.json")
		  $scope.alluser = users.query();
			$scope.user_edit = {};
		}
		
		
	$scope.deleteuser = function(user_id) {
		var user = $resource("/users/:id.json", {id: "@id"})
		user.delete({id:user_id}, function(){
		  var users = $resource("/users.json")
		  $scope.alluser = users.query(); 
		})
	}
	var users = $resource("/users.json")
	$scope.alluser = users.query();
		
}]);




