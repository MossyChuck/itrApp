angular.module('app').controller('newPasswordCtrl', function($scope, $http){
  function checkNewPassword() {
    if ($('#changePassword').val() !== $('#confirmNewPassword').val()) {
      $('#passwordChanging').append("<p id='warningChangingPass'>Passwords are not the same</p>");
      return false;
    }
    else {
      $('#warningChangingPass').remove();
      $('#passwordChanging').append("<p class='successChanged'>Password has successfully changed</p>");
      return true;
    }
  }
  
  $scope.savePassword = function() {
    if(checkNewPassword()){
      userModel.changeProperty($http,sessionStorage.userId,'password',$scope.newPassword);      
    }
  }
});
