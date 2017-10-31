angular.module("app").controller("signInCtrl",function($scope,$http) {
    $scope.textPattern = new RegExp('[a-z]');

    $scope.login = function (user) {
        $http.post('/login',user).then(function(responce){
            $scope.message = responce.data;
            if(responce.data == "success"){
                $scope.$emit('changeContentUrl',{url:'/htmls/content/main.html',message:'Verification email is send to you.'})
            }
        });
    }

    $scope.message = "";
});
