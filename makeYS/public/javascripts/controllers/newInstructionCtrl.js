angular.module('app').controller('newInstructionCtrl', function ($scope, $http) {
    $scope.instruction = {};
    $scope.instruction.steps = [{}];
    $scope.instruction.comments = [];
    $scope.instruction.tags = [];
    $scope.instruction.rating = [];
    $scope.instruction.authorId = sessionStorage.userId;
    $scope.categories = ['Electronic', 'House', 'Cooking', 'Leisure', 'Programming','Auto'];
    $scope.addStep = function () {
        $scope.instruction.steps.push({});
    };
    $scope.deleteStep = function () {
        $scope.instruction.steps.splice(this.$index, 1);
    };
    $scope.create = function () {
        $http.post('/createInstruction', $scope.instruction).then(function (responce) {
            $scope.message = responce.data;
            $scope.$emit('changeContentUrl', { url: '/htmls/content/main.html' });
        });
    };
});
