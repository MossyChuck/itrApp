angular.module('app').controller('newInstructionCtrl', function ($scope, $http) {
    $scope.instruction = {};
    $scope.instruction.steps = [{imagesLinks: []}];
    $scope.instruction.comments = [];
    $scope.instruction.tags = [];
    $scope.instruction.rating = [];
    $scope.instruction.authorId = sessionStorage.userId;
    $scope.categories = instructionModel.categories;
    var dropZone;
    var maxFileSize = 1000000;    
    var files = new Array(1);
    files[0] = new Array();
    var ACCESS_TOKEN = 'S1LRa3tqsKAAAAAAAAAALSGxx-stPFb7RVfUZiccJCyAL1ect5RuXWtBUjSNjtEH';
    var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    $scope.addStep = function () {
        $scope.instruction.steps.push({imagesLinks: []});
        files.push([]);
        $(document).ready(function(){
            makeDropZones(); 
        });
    };
    $scope.deleteStep = function () {
        $scope.instruction.steps.splice(this.$index, 1);
        files.splice($index,1);
        $(document).ready(function(){
            makeDropZones(); 
        });
    };
    $scope.deleteImages = function(){
        files[this.$index] = [];
        $scope.instruction.steps[this.$index].imagesLinks = [];
        console.log(files);
        $($('.dropZone')[this.$index]).text('');
        $($('.dropZone')[this.$index]).removeClass('drop');
    }
    $scope.create = function () {
        if($scope.instruction.tags.length!=0){
            $scope.instruction.tags = $scope.tags.split(',');            
        }
        
        //$scope.instruction.files = files;
        $http.post('/createInstruction', $scope.instruction).then(function (responce) {
            $scope.message = responce.data;
            instructionModel.load($http);
            $scope.$emit('changeContentUrl', { url: '/htmls/content/main.html' });
        });
    };
    function makeDropZones(){
        dropZone = $('.dropZone');
        if (typeof(window.FileReader) == 'undefined') {
            dropZone.text('Не поддерживается браузером!');
            dropZone.addClass('error');
        }
        console.log(files);
        
        for(var i = 0;i<dropZone.length;i++){
            dropZone[i].ondragover = function(event) {
                //console.log(event.path[0]);
                $(event.path[0]).addClass('hover');
                return false;
            };
            dropZone[i].ondragleave = function() {
                $(event.path[0]).removeClass('hover');
                return false;
            };
            dropZone[i].ondrop = function(event) {
                event.preventDefault();
                $(event.path[0]).text('');
                var file = event.dataTransfer.files[0];
                //console.log(event.dataTransfer.files);
                console.log(event);
                if (file.size > maxFileSize) {
                    $(event.path[0]).text('File is bigger than 1MB');
                    $(event.path[0]).addClass('error');
                    return false;
                }else if(file.type.substring(0,5)!='image'){
                    $(event.path[0]).text('File is not an image');
                    $(event.path[0]).addClass('error');
                    return false;
                }else if(files[parseInt(event.path[0].id)].length>3){
                    $(event.path[0]).text('You already upload 3 files');
                    $(event.path[0]).addClass('error');
                    return false;
                }
                
                //console.log($(event.path[0]).text());
                //$(event.path[0]).text($(event.path[0]).text()+file.name+'\n');
                files[parseInt(event.path[0].id)].push(file);
                var text = '';
                for(var j = 0; j<files[parseInt(event.path[0].id)].length;j++){
                    text += files[parseInt(event.path[0].id)][j].name + '\n';
                }

                dbx.filesUpload({path: '/Приложения/itr course project/' + file.name, contents: file})
                .then(function(response) {
                  console.log(response);
                  dbx.sharingCreateSharedLink({path: response.path_display})
                      .then(function(response){
                          console.log(response);
                          $scope.instruction.steps[parseInt(event.path[0].id)].imagesLinks.push(response.url);
                      })
                      .catch(function(error){
                          console.error(error);
                      })
                })
                .catch(function(error) {
                  console.error(error);
                });
                
                $(event.path[0]).text(text);
                $(event.path[0]).removeClass('hover');
                $(event.path[0]).addClass('drop');
                
            };
        }
    }
    $(document).ready(function(){
       makeDropZones(); 
    });
    
});