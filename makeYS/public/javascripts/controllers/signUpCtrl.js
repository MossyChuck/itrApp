angular.module('app').controller('signUpCtrl', function ($scope, $http) {
    $scope.textPattern = new RegExp('^[a-zA-Z]+$');
    $scope.addNewUser = function () {
        $http.post('/registerUser', $scope.newUser).then(function (responce) {
            $scope.message = responce.data;
            if (responce.data === 'send') {
                $scope.$emit('changeContentUrl', { url: '/htmls/content/'+sessionStorage.local+'/message.'+sessionStorage.local+'.html', message: 'Verification email is send to you.' });
            }
            if (responce.data === 'verifyed') {
                $scope.$emit('changeContentUrl', { url: '/htmls/content/'+sessionStorage.local+'/message.'+sessionStorage.local+'.html', message: 'Email is verifyed' });
            }
        });
    };
});
