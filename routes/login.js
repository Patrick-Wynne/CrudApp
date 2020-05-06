module.exports = {
    // Load the form to add a player - GET
    loginPage: function (request, response) {
        // Load the page
        let query = `select * from useraccount`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            if(result.length > 0) {
                response.render('login', {isAccounts:true})
            } else {
                response.render('login', {isAccounts:false})
            }
        }
        )},

    // Add a player to the database - POST
    login: function (request, response) {
        let query = `select * from useraccount`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            let username = request.body.username;
            let password = request.body.password;
            for (let i = 0; i < result.length; i++) {
                if(result[i].username == username) {
                    if(result[i].password == password) {
                        user.id = result[i].id;
                        user.username = result[i].username;
                        user.profilePicture = result[i].profilePicture;
                        response.redirect('/');
                        return;
                    }
                }
            }
        })
        
        // Load values from the POST request
            // New player added successfully, reload homepage
            
    } ,

    logout: function (request, response) {
        user.id = 0;
        user.username = "";
        user.profilePicture = "";
        response.redirect("/");
    }
}