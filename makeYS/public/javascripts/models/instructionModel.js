var instructionModel = {
    data: [],
    load: function ($http) {
        return new Promise(function (resolve) {
            $http.get('/instruction/getAll').then(function (responce) {
                instructionModel.data = responce.data;
                resolve(responce.data);
            });
        });
    },
    getInstructionById: function(id){
        var temp = [];
        instructionModel.data.forEach(function(element){
            if (element.id == id){
                temp = element;
            }
        },this);
        return temp;
    }
};
