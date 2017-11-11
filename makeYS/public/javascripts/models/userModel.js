var userModel = {
    data: [],
    medalsImages: {
        create1instruction: {
            src: '/images/medals/one.png', 
            title: 'Create 1 instructions',
            check: function (user) {
        
            }
        },
        create5instructions: {
            src: '/images/medals/five.png', 
            title: 'Create 5 insturctions',
            check: function (user) {
                
            }
        },
        create10instructions: {
            src: '/images/medals/ten.png', 
            title: 'Create 10 instructions',
            check: function (user) {
                
            }
        },
        create30instructions: {
            src: '/images/medals/thirty.png', 
            title: 'Create 30 instructions',
            check: function (user) {
                
            }
        },
        rating4: {
            src: '/images/medals/rating4.png', 
            title: 'Instruction with average rating 4+',
            check: function (user) {
                
            }
        },
        rating5: {
            src: '/images/medals/rating5.png', 
            title: 'Instruction with average rating 5',
            check: function (user) {
                
            }
        },
        likes: {
            src: '/images/medals/like.png', 
            title: 'Comment with 10+ likes',
            check: function (user) {
                
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