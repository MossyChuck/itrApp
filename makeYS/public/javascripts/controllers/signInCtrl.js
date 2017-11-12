angular.module("app").controller("signInCtrl",function($scope,$http) {
    $scope.textPattern = new RegExp('[a-z]');

    $scope.login = function (user) {
        $http.post('/login',user).then(function(responce) {
            $scope.message = responce.data;
            if(responce.data.status == "success") {
                this.sessionStorage.userId = responce.data.userId;
                this.sessionStorage.role = responce.data.role;
                $scope.$emit('changeHeaderUrl',{url: '/htmls/headers/en/autorizedUser.en.html'})
                $scope.$emit('changeContentUrl',{url:'/htmls/content/en/main.en.html',message:'Verification email is send to you.'})
            }
        });
    }

    $scope.message = "";
});
