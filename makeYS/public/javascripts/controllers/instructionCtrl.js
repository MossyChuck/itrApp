angular.module('app').controller('instructionCtrl',function($scope,$http){
    $scope.instruction = instructionModel.getInstructionById(localStorage.instructionId);
    var ACCESS_TOKEN = 'S1LRa3tqsKAAAAAAAAAALSGxx-stPFb7RVfUZiccJCyAL1ect5RuXWtBUjSNjtEH';
    var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    $scope.instruction.steps.forEach(function(step) {
        step.img = [];
        if(step.imagesLinks) {
            step.imagesLinks.forEach(function(element) {
                dbx.sharingGetSharedLinkFile({url: element})
                .then(function(data) {
                    console.log(data);
                    step.img.push(URL.createObjectURL(data.fileBlob));
                    element = URL.createObjectURL(data.fileBlob);
                    $scope.$digest();
                })
                .catch(function(error) {
                    console.error(error);
                });
            }, this);
        }
    }, this);
    $scope.profile = function(id) {
        localStorage.profileId = id;
        $scope.$emit('changeContentUrl', { url: '/htmls/content/profile.html'});
    }
    $scope.getUsername = function(id) {
        return userModel.getUserById(id).username;
    }
    $scope.isAuthor = function(id){
        if(id==sessionStorage.userId || sessionStorage.role == 'admin'){
            return true;
        } else{
            return false;
        }
    }
    $scope.editInstruction = function(id){
        localStorage.instructionId = id;
        $scope.$emit('changeContentUrl',{ url: '/htmls/content/editInstruction.html'});
    }
    $scope.deleteInstruction = function(id){
        instructionModel.deleteInstructionById($http,id);
        $scope.$emit('changeContentUrl', { url: '/htmls/content/main.html'});
    }
});