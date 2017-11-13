angular.module('app').controller('adminPageCtrl',function ($scope,$http) {
    $scope.users = userModel.data;
    $scope.sortType = 'id';
    $scope.sortReverse = false;
    $scope.selected;
    $scope.limitValue = 3;
    $scope.usersPerPage = 3;
    $scope.getBlockButtonText = function (id) {
        return userModel.getUserById(id).blocked ? 'Unblock' : 'Block';
    }
    $scope.getAdminButtonText = function (id) {
        return userModel.getUserById(id).admin ? 'Make not admin' : 'Make admin';
    }
    $scope.select = function (event) {
        if($scope.selected == this.$index){
            $scope.selected = undefined;
        }else{
            $scope.selected = this.$index;
        }
    }
    $scope.bool = function(expression){
        return expression ? 'Yes' : 'No';
    }
    $scope.changeBlockState = function (id) {
        userModel.changeProperty($http,id,'blocked',1 - userModel.getUserById(id).blocked);
        userModel.load($http);
        if(id == sessionStorage.userId) {
            delete sessionStorage.role;
            delete sessionStorage.userId;
            $scope.$emit('changeHeaderUrl', { url: '/htmls/headers/'+sessionStorage.local+'/nonAutorized.'+sessionStorage.local+'.html' });
            $scope.$emit('changeContentUrl', { url: 'htmls/content/'+sessionStorage.local+'/main.'+sessionStorage.local+'.html' });
        }
        $scope.users.forEach(function (element) {
            if(element.id == id){
                element.blocked = 1 - element.blocked;
            }
        }, this);
    }
    $scope.changeAdminState = function (id) {
        userModel.changeProperty($http,id,'admin',1 - userModel.getUserById(id).admin);
        userModel.load($http);
        if(id == sessionStorage.userId){
            sessionStorage.role = 'user';
            $scope.$emit('changeContentUrl', { url: 'htmls/content/'+sessionStorage.local+'/main.'+sessionStorage.local+'.html' });
        }
        $scope.users.forEach(function (element) {
            if(element.id == id){
                element.admin = 1 - element.admin;
            }
        }, this);
    }
    $scope.openProfile = function (id) {
        localStorage.profileId = id;
        $scope.$emit('changeContentUrl',{ url: '/htmls/content/'+sessionStorage.local+'/profile.'+sessionStorage.local+'.html'})
    }
});
