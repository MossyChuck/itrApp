angular.module("app").controller("signUpCtrl",function($scope, $http) {
    $scope.textPattern = new RegExp('[a-z]');
    
    $scope.addNewUser = function (userDetails) {
        $http.post('/registerUser',$scope.newUser).then(function(responce){
            $scope.message = responce.data;
            if(responce.data == "send"){
                //$rootscope.url = "/htmls/emailIsSend.html";
                $scope.$emit('changeUrl',{url:'/htmls/message.html',message:'Verification email is send to you.'})
            }
            if(responce.data == "verifyed"){
                $scope.$emit('changeUrl',{url:'/htmls/message.html',message:'Email is verifyed'});
            }
        });
        
    }
});
