var instructionModel = {
    data: [],
    load: function ($http) {
        return new Promise(function (resolve) {
            $http.get('/instruction/getAll').then(function (responce) {
                instructionModel.data = responce.data;
                instructionModel.data.forEach(function(element) {
                    element.steps = JSON.parse(element.steps);
                    element.tags = JSON.parse(element.tags);
                    element.created = element.created.substring(0,10);
                }, this);
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
        }, this);
        return temp;
    },
    getInstructionsByAuthor: function(id){
        var temp = [];
        instructionModel.data.forEach(function(element){
            if(element.authorId == id){
                temp.push(element);
            }
        }, this);
        return temp;
    }
};
