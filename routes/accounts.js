module.exports = {
    // Load the form to add a player - GET
    addAccountPage: function (request, response) {
        // Load the page
        response.render("edit-account", {add:true});
    },

    // Add a player to the database - POST
    addAccount: function (request, response) {
        // Load values from the POST request
        let username = request.body.username;
        let password = request.body.password;
        let profilePicture = request.body.profilePicture;
        let bio = request.body.bio;

        // Query to add the new player to the database
        let query = `INSERT INTO useraccount (username, password, profilePicture, bio)
            VALUES ("${username}", "${password}", "${profilePicture}", "${bio}");`;

        db.query(query, function (error, result) {
            if (error) {
                // Send server error
                return response.status(500).send(error);
            }

            // New player added successfully, reload homepage
            response.redirect("/");
        });
    },
    editAccountPage: function(request, response) {
        let accountId = request.params.id;
        let query = `select * from useraccount where id = ${accountId}`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            response.render("edit-account", {
                add:false,
                account: result[0]
            });
        })
    },
    editAccount: function(request, response) {
        let accountId = request.params.id;
        let username = request.body.username;
        let password = request.body.password;
        let profilePicture = request.body.profilePicture;
        let bio = request.body.bio;

        let query = `UPDATE useraccount
        SET username = "${username}", password = "${password}", profilePicture = "${profilePicture}", bio = "${bio}"
        WHERE id = ${accountId};`;

            db.query(query, function (error, result) {
                if (error) {
                    // Send server error
                    return response.status(500).send(error);
                }
    
                // New player added successfully, reload homepage
                response.redirect("/");
            });
    },
    deleteAccount: function(request, response) {
        let accountId = request.params.id;

        let query = `DELETE FROM useraccount WHERE id = ${accountId};`;
        db.query(query, function (error, result) {
            if (error) {
                // Send server error
                return response.status(500).send(error);
            }

            // New player added successfully, reload homepage
            response.redirect("/");
        });
    },
    mainAccountPage: function(request, response) {
        let id = request.params.id;
        let query =`select * from useraccount
        where id = "${id}";`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            query = `select * from post
            where creatorId = ${id}`
            db.query(query, function(error, result2) {
                if(error) {
                    return response.status(500).send(error);
                }
                response.render("account", {
                    useraccount: result[0],
                    post: result2
                });
            })
            
        })
    }
}