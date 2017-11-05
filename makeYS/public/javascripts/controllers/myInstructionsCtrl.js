angular.module('app').controller('myInstructionsCtrl',function($scope){
    $scope.instructions = instructionModel.getInstructionsByAuthor(sessionStorage.userId);
    $scope.sortType = 'id';
    $scope.sortReverse = false;
});