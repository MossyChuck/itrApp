angular.module('app').controller('myInstructionsCtrl',function($scope,$http){
    $scope.instructions = instructionModel.getInstructionsByAuthor(sessionStorage.userId);
    $scope.sortType = 'id';
    $scope.sortReverse = false;
    $scope.selected;
    $scope.limitValue = 3;
    $scope.instructionsPerPage = 3;
    $scope.sessionStorage = sessionStorage;        
    $scope.select = function(event){
        if($scope.selected == this.$index){
            $scope.selected = undefined;
        }else{
            $scope.selected = this.$index;
        }
    }
    $scope.deleteInstruction = function(id){
        instructionModel.deleteInstructionById($http,id);
        $scope.instructions.forEach(function(element,index) {
            if(element.id == id){
                $scope.instructions.splice(index,1);
            }
        }, this);
    }
    $scope.editInstruction = function(id){
        localStorage.instructionId = id;
        $scope.$emit('changeContentUrl',{ url: '/htmls/content/'+sessionStorage.local+'/editInstruction.'+sessionStorage.local+'.html'});
    }
    $scope.openInstruction = function(id){
        localStorage.instructionId = id;
        $scope.$emit('changeContentUrl',{ url: '/htmls/content/'+sessionStorage.local+'/instruction.'+sessionStorage.local+'.html'})
    }
});
