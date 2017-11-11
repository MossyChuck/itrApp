var instructionModel = {
    data: [],
    categories: ['Electronic', 'House', 'Cooking', 'Leisure', 'Programming','Auto'],
    tags: [],
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
                    element.rating = JSON.parse(element.rating);
                    for(var i = 0; i < element.tags.length;i++){
                        var contains = false;
                        for(var j = 0; j < instructionModel.tags.length; j++){
                            if(instructionModel.tags[j].tag == element.tags[i]){
                                instructionModel.tags[j].amount++;
                                contains = true;
                            }
                        }
                        if(!contains){
                            instructionModel.tags.push({tag:element.tags[i], amount: 1});
                        }
                    }
                    instructionModel.tags.sort(function(a,b){
                        if(a.amount > b.amount) return -1;
                        if(a.amount < b.amount) return 1;
                        return 0;
                    });
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
