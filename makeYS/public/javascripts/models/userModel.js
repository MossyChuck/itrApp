var userModel = {
    data: [],
    load: function ($http) {
        return new Promise(function (resolve) {
            $http.post('/users/getUsers').then(function (responce) {
                userModel.data = responce.data;
                resolve(responce.data);
                return responce.data;
            });
        });
    },
    getUserById: function (id) {
        var temp;
        userModel.data.forEach(function(element) {
            if(element.id == id) {
                temp = element;
            }
        }, this);
        return temp;
    },
    deleteUserById : function($http,id) {
        $http.post('/users/deleteUser',{id:id}).then(function(responce) {
            
        });
    },
    changeProperty : function($http,id,property,value) {
        $http.post('/users/changeProperty',{id,property,value}).then(function(responce) {
            
        });
    }
}