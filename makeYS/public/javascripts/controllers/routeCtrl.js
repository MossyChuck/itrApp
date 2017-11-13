angular.module("app").controller("routeCtrl",function($scope, $http) {
    var styles = {
        light: '/stylesheets/styleLight.css',
        dark: '/stylesheets/styleDark.css'
    }
    $scope.sessionStorage = sessionStorage;    
    instructionModel.load($http,$scope).then(function () {
        $scope.$digest();
        userModel.load($http).then(function() {
            $scope.$digest();
        });
    });
    var currentTheme = sessionStorage.colorTheme || 'light';
    if(!sessionStorage.local){
        sessionStorage.local = 'en';
    }
    var currentLanguage = sessionStorage.local;
    $scope.styleUrl = styles[currentTheme];
    changeHeaderClass();
    $scope.changeTheme = function () {
        currentTheme = currentTheme == 'light' ? 'dark' : 'light';
        $scope.styleUrl = styles[currentTheme];
        sessionStorage.colorTheme = currentTheme;
        changeHeaderClass();
    }
    $scope.changeLanguage = function () {
        sessionStorage.local = sessionStorage.local == 'en' ? 'ru' : 'en';
        $scope.$digest();
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
    $scope.contentUrl = "/htmls/content/"+sessionStorage.local+"/main."+sessionStorage.local+".html";
    $scope.headerUrl = sessionStorage.userId != undefined?"/htmls/headers/"+sessionStorage.local+"/autorizedUser."+sessionStorage.local+".html" : "/htmls/headers/"+sessionStorage.local+"/nonAutorized."+sessionStorage.local+".html";
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
        $scope.headerUrl = "/htmls/headers/"+sessionStorage.local+"/nonAutorized."+sessionStorage.local+".html";
    }
    $scope.changeContentUrl = function (url) {
        $scope.contentUrl = url;
    }
    $scope.search = function () {
        if(this.searchQuery == '' || !this.searchQuery){
            return;
        }
        this.searchQuery = this.searchQuery.toLowerCase();
        var results = [];
        for(var i = 0; i < instructionModel.data.length; i++) {
            var instruction = JSON.stringify(instructionModel.data[i]);
            instruction = instruction.toLowerCase();
            if(instruction.indexOf(this.searchQuery) > -1){
                results.push(instructionModel.data[i].id);
            }
        }
        console.log(results);
        localStorage.searchResults = results;
        $scope.$emit('changeContentUrl', { url: "htmls/content/"+sessionStorage.local+"/searchResults."+sessionStorage.local+".html"});
    }

});
