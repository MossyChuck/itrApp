angular.module('app').controller('newPasswordCtrl', function($scope, $http){
  function checkNewPassword() {
    if ($('#changePassword').val() !== $('#confirmNewPassword').val()) {
      $('#passwordChanging').append("<p id='warningChangingPass'>Passwords are not the same</p>");
    }
    else {
      $('#warningChangingPass').remove();
      $('#passwordChanging').append("<p class='successChanged'>Password has successfully changed</p>")
    }
  }
  
  $scope.savePassword = function() {
    checkNewPassword();
    saveNewPasswordOnServer();
  }
});
