angular.module('app').controller('profileCtrl', function ($scope) {
    if (localStorage.profileId === sessionStorage.userId) {
        $scope.$emit('changeContentUrl', { url: '/htmls/content/'+sessionStorage.local+'/myProfile.'+sessionStorage.local+'.html' });
    }
    $scope.user = userModel.getUserById(localStorage.profileId);
    $scope.sessionStorage = sessionStorage;       
});
