var userModel = {
    data: [],
    load: function ($http) {
        return new Promise(function (resolve) {
            $http.post('/users/getUsers').then(function (responce) {
                userModel.data = responce.data;
                userModel.data.forEach(function(element) {
                    element.email = element.email.replace('%40', '@');
                    element.created = new Date(element.created);
                }, this);
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