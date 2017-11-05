angular.module('app').controller('profileCtrl', function ($scope) {
    if (localStorage.profileId === sessionStorage.userId) {
        $scope.$emit('changeContentUrl', { url: '/htmls/content/myProfile.html' });
    }
    $scope.user = userModel.getUserById(localStorage.profileId);
});
