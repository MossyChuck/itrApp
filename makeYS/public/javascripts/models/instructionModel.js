var instructionModel = {
    data: [],
    categories: ['Electronic', 'House', 'Cooking', 'Leisure', 'Programming','Auto'],
    load: function ($http) {
        return new Promise(function (resolve) {
            $http.get('/instruction/getAll').then(function (responce) {
                instructionModel.data = responce.data;
                instructionModel.data.forEach(function(element) {
                    element.steps = JSON.parse(element.steps);
                    element.tags = JSON.parse(element.tags);
                    element.category = JSON.parse(element.category);
                    element.comments = JSON.parse(element.comments);
                    element.created = new Date(element.created);
                    //element.created = element.created.toISOString().substring(0,10);
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
    },
    deleteInstructionById: function ($http,id){
        $http.post('/instruction/delete', { id:id }).then(function(){
            instructionModel.load($http);
        });
    },
    changeProperty: function($http,id,property,value){
        $http.post('/instruction/changeProperty', {id: id, property: property, value: value}).then(function (){

        });


    }
};
