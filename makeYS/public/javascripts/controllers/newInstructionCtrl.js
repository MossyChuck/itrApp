angular.module('app').controller('newInstructionCtrl',function($scope,$http){
    $scope.instruction = {}
    $scope.instruction.steps = [{}];
    $scope.instruction.authorId = sessionStorage.userId;
    $scope.addStep = function() {
        $scope.instruction.steps.push({});
    }
    $scope.deleteStep = function(){
        $scope.instruction.steps.splice(this.$index,1);
    }
    $scope.create = function(){
        $http.post('/createInstruction',$scope.instruction).then(function(responce){
            $scope.message = responce.data;
            $scope.$emit('changeContentUrl',{url:'/htmls/main.html'});
        });
    }
});