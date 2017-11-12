var userModel = {
    data: [],
    medalsImages: {
        create1instruction: {
            src: '/images/medals/one.png', 
            title: 'Create 1 instructions',
            check: function (user) {
                var instructions = instructionModel.getInstructionsByAuthor(user.id);
                if(instructions.length > 0){
                    return true;
                }else{
                    return false;
                }
            }
        },
        create5instructions: {
            src: '/images/medals/five.png', 
            title: 'Create 5 insturctions',
            check: function (user) {
                var instructions = instructionModel.getInstructionsByAuthor(user.id);
                if(instructions.length > 4){
                    return true;
                }else{
                    return false;
                }
            }
        },
        create10instructions: {
            src: '/images/medals/ten.png', 
            title: 'Create 10 instructions',
            check: function (user) {
                var instructions = instructionModel.getInstructionsByAuthor(user.id);
                if(instructions.length > 9){
                    return true;
                }else{
                    return false;
                }
            }
        },
        create30instructions: {
            src: '/images/medals/thirty.png', 
            title: 'Create 30 instructions',
            check: function (user) {
                var instructions = instructionModel.getInstructionsByAuthor(user.id);
                if(instructions.length > 29){
                    return true;
                }else{
                    return false;
                }
            }
        },
        rating4: {
            src: '/images/medals/rating4.png', 
            title: 'Instruction with average rating 4+',
            check: function (user) {
                var instructions = instructionModel.getInstructionsByAuthor(user.id);
                for(var i = 0; i<instructions.length; i++){    
                    var rating = 0;                                        
                    for(var j = 0; j < instructions[i].rating.length; j++) {
                        rating+=instructions[i].rating[j].rating;
                    }
                    rating/=instructions[i].rating.length;
                    if(rating >= 4.0){
                        return true;
                    }
                }
                return false;
            }
        },
        rating5: {
            src: '/images/medals/rating5.png', 
            title: 'Instruction with average rating 5',
            check: function (user) {
                var instructions = instructionModel.getInstructionsByAuthor(user.id);
                for(var i = 0; i<instructions.length; i++){  
                    var rating = 0;                                          
                    for(var j = 0; j < instructions[i].rating.length; j++) {
                        rating+=instructions[i].rating[j].rating;
                    }
                    rating/=instructions[i].rating.length;
                    if(rating == 5.0){
                        return true;
                    }
                }
                return false;
            }
        },
        likes: {
            src: '/images/medals/like.png', 
            title: 'Comment with 10+ likes',
            check: function (user) {
                var instructions = instructionModel.getInstructionsByAuthor(user.id);
                var rating = 0;
                for(var i = 0; i<instructions.length; i++){                                            
                    for(var j = 0; j < instructions[i].comment; j++) {
                        if(instructions[i].comment[j].likes.length > 9){
                            return true;
                        }
                    }
                    
                }
                return false;
            }
        }
    },
    load: function ($http) {
        return new Promise(function (resolve) {
            $http.post('/users/getUsers').then(function (responce) {
                userModel.data = responce.data;
                userModel.data.forEach(function(element) {
                    element.email = element.email.replace('%40', '@');
                    element.created = new Date(element.created);
                    if(!element.medals){
                        element.medals = JSON.stringify([]);
                    }
                    element.medals = JSON.parse(element.medals);
                    
                    var changes = false;
                    for(medal in userModel.medalsImages){
                        if(userModel.medalsImages[medal].check(element)){
                            var flag = false
                            for(var i = 0; i < element.medals.length; i++){
                                if (userModel.medalsImages[medal].src == element.medals[i].src){
                                    flag = true;
                                    break;
                                }
                            }
                            if(!flag){
                                element.medals.push(userModel.medalsImages[medal]);
                                changes = true;
                            }
                        }
                    }
                    if(changes){
                        userModel.changeProperty($http,element.id,'medals',JSON.stringify(element.medals));
                    }
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
            userModel.load($http);
        });
    }
}