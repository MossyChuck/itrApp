var userModel = {
    getUsers : function($http,property,value){
        $http.post('/users/getUsers',{property,value}).then(function(responce){
            console.log(responce.data);
            return responce.data;
        });
    },
    deleteUserById : function($http,id){
        $http.post('/users/deleteUser',{id:id}).then(function(responce){
            console.log(responce.data);
        });
    },
    changeProperty : function($http,id,property,value){
        $http.post('/users/changeProperty',{id,property,value}).then(function(responce){
            
        });
    }
}