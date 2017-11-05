var instructionModel = {
    data: [],
    load: function ($http) {
        return new Promise(function(resolve,reject) {
            $http.get('/instruction/getAll').then(function(responce) {
                instructionModel.data = responce.data;
                resolve(responce.data);
            });        
        });
            
    }
}