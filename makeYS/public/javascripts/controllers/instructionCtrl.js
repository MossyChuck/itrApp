angular.module('app').controller('instructionCtrl',function($scope,$http){
    $scope.instruction = instructionModel.getInstructionById(localStorage.instructionId);
    $scope.newComment = {};
    
    var ACCESS_TOKEN = 'S1LRa3tqsKAAAAAAAAAALSGxx-stPFb7RVfUZiccJCyAL1ect5RuXWtBUjSNjtEH';
    var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    $scope.instruction.steps.forEach(function (step) {
        step.img = [];
        if(step.imagesLinks) {
            step.imagesLinks.forEach(function(element) {
                dbx.sharingGetSharedLinkFile({url: element})
                .then(function(data) {
                    //var file = new File([data.fileBlob],data.name,{type: 'image/jpeg', lastModified: Date.now()});
                    
                    var reader = new window.FileReader();
                    var extention = data.name.substring(data.name.lastIndexOf('.')+1);
                    reader.readAsDataURL(data.fileBlob); 
                    reader.onloadend = function() {
                                   var base64data = reader.result.replace('application/octet-stream','image/'+extention);
                                   step.img.push(base64data);
                                   $scope.$digest();
                                   
                     }
                     
                    //step.img.push(URL.createObjectURL(file));
                    //step.img.push(URL.createObjectURL(data.fileBlob));
                    //element = URL.createObjectURL(data.fileBlob);
                    
                })
                .catch(function(error) {
                    console.error(error);
                });
            }, this);
        }
    }, this);
    $scope.addComment = function () {
        $scope.newComment.authorId = sessionStorage.userId;
        $scope.newComment.likes = [];
        $scope.instruction.comments.push($scope.newComment);
        instructionModel.changeProperty($http,$scope.instruction.id,'comments',JSON.stringify($scope.instruction.comments));
        instructionModel.load($http);
    }
    $scope.deleteComment = function (index) {
        $scope.instruction.comments.splice(index,1);
        instructionModel.changeProperty($http,$scope.instruction.id,'comments',JSON.stringify($scope.instruction.comments));
        instructionModel.load($http);
    }
    $scope.isAutorized = function () {
        return sessionStorage.length ? true : false;
    }
    $scope.profile = function (id) {
        localStorage.profileId = id;
        $scope.$emit('changeContentUrl', { url: '/htmls/content/profile.html'});
    }
    $scope.getUsername = function (id) {
        return userModel.getUserById(id).username;
    }
    $scope.isAuthor = function (id) {
        if(id==sessionStorage.userId || sessionStorage.role == 'admin'){
            return true;
        } else{
            return false;
        }
    }
    $scope.editInstruction = function (id) {
        localStorage.instructionId = id;
        $scope.$emit('changeContentUrl',{ url: '/htmls/content/editInstruction.html'});
    }
    $scope.deleteInstruction = function (id) {
        instructionModel.deleteInstructionById($http,id);
        $scope.$emit('changeContentUrl', { url: '/htmls/content/main.html'});
    }
    $scope.generatePDF = function () {
        var draw = kendo.drawing;
        draw.drawDOM($('#pdf'), {
            avoidLinks: true,
            paperSize: 'A4',
            margin: '0.5cm'
        }).then(function (root) {
            return draw.exportPDF(root,10,10);
        }).done(function (data) {
            kendo.saveAs({
                dataURI: data,
                fileName: $scope.instruction.title+'.pdf'
            });
        });
    }
});