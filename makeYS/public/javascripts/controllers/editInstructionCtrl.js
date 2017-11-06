angular.module('app').controller('editInstructionCtrl',function($scope,$http){
    $scope.instruction = JSON.parse(JSON.stringify(instructionModel.getInstructionById(localStorage.instructionId)));
    $scope.categories = instructionModel.categories;
    $scope.instruction.tags = $scope.instruction.tags.toString();
    $scope.addStep = function () {
        $scope.instruction.steps.push({});
    };
    $scope.deleteStep = function () {
        $scope.instruction.steps.splice(this.$index, 1);
    };
    $scope.saveInstruction = function (){
        $scope.instruction.tags = $scope.instruction.tags.split(',');
        $http.post('/instruction/change',{instruction:$scope.instruction}).then(function (){
            instructionModel.load($http);
            $scope.$emit('changeContentUrl', { url: '/htmls/content/instruction.html'});            
        });
        
    }
    $scope.cancel = function (){
        $scope.$emit('changeContentUrl', { url: '/htmls/content/instruction.html'});
    }
});