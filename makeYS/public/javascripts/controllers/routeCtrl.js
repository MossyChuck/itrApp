angular.module("app").controller("routeCtrl",function($scope, $http) {
    var styles = {
        light: '/stylesheets/styleLight.css',
        dark: '/stylesheets/styleDark.css'
    }
    instructionModel.load($http,$scope).then(function () {
        $scope.$digest();
        userModel.load($http).then(function() {
            $scope.$digest();
        });
    });
    var currentTheme = sessionStorage.colorTheme || 'light';
    $scope.styleUrl = styles[currentTheme];
    changeHeaderClass();
    $scope.changeTheme = function () {
        currentTheme = currentTheme == 'light' ? 'dark' : 'light';
        $scope.styleUrl = styles[currentTheme];
        sessionStorage.colorTheme = currentTheme;
        changeHeaderClass();
    }
    function changeHeaderClass () {
        if (currentTheme == 'light') {
            $($('nav')[0]).removeClass('navbar-dark');
            $($('nav')[0]).addClass('navbar-light');
        }else{
            $($('nav')[0]).removeClass('navbar-light');
            $($('nav')[0]).addClass('navbar-dark');
        }
    }


    $scope.isAdmin = function(){
        return sessionStorage.role=='admin' ? true : false;
    }
    $scope.contentUrl = "/htmls/content/en/main.en.html";
    $scope.headerUrl = sessionStorage.userId != undefined?"/htmls/headers/en/autorizedUser.en.html" : "/htmls/headers/en/nonAutorized.en.html";
    $scope.$on('changeContentUrl', function (event,args) {
        $scope.contentUrl = args.url;
        $scope.message = args.message;
    });
    $scope.$on('changeHeaderUrl', function (event,args) {
        $scope.headerUrl = args.url;
    });
    $scope.logout = function () {
        delete sessionStorage.role;
        delete sessionStorage.userId;
        $scope.headerUrl = "/htmls/headers/en/nonAutorized.en.html";
    }
    $scope.changeContentUrl = function (url) {
        $scope.contentUrl = url;
    }
    $scope.search = function () {
        if(this.searchQuery == '' || !this.searchQuery){
            return;
        }
        this.searchQuery.toLowerCase();
        var results = [];
        for(var i = 0; i < instructionModel.data.length; i++) {
            var instruction = JSON.stringify(instructionModel.data[i]);
            instruction.toLowerCase();
            if(instruction.indexOf(this.searchQuery) > -1){
                results.push(instructionModel.data[i].id);
            }
        }
        console.log(results);
        localStorage.searchResults = results;
        $scope.$emit('changeContentUrl', { url: 'htmls/content/en/searchResults.en.html'});
    }

});
