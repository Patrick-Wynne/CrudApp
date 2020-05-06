module.exports = {
    // Load the form to add a player - GET
    addPostPage: function (request, response) {
        // Load the page
        response.render("edit-post", {add:true});
    },

    // Add a player to the database - POST
    addPost: function (request, response) {
        // Load values from the POST request
        let title = request.body.title;
        let message = request.body.message;
        let creatorId = user.id;
        //add userId

        // Query to add the new player to the database
        let query = `INSERT INTO post (creatorId, title, message, postLikeCount)
            VALUES (${creatorId}, "${title}", "${message}", 0);`;

        db.query(query, function (error, result) {
            if (error) {
                // Send server error
                return response.status(500).send(error);
            }

            // New player added successfully, reload homepage
            response.redirect("/");
        });
    },
    editPostPage: function(request, response) {
        let postId = request.params.id;
        let query = `select * from post where postId = ${postId}`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            response.render("edit-post", {
                add:false,
                post: result[0]
            });
        })
    },
    editPost: function(request, response) {
        let postId = request.params.id;
        let title = request.body.title;
        let message = request.body.message;
        //add userid

        let query = `UPDATE post SET title = "${title}", message = "${message}" where postId = ${postId}`;

            db.query(query, function (error, result) {
                if (error) {
                    // Send server error
                    return response.status(500).send(error);
                }
    
                // New player added successfully, reload homepage
                response.redirect("/");
            });
    },
    deletePost: function(request, response) {
        let postId = request.params.id;

        let query = `DELETE FROM post WHERE postId = ${postId};`;
        db.query(query, function (error, result) {
            if (error) {
                // Send server error
                return response.status(500).send(error);
            }

            // New player added successfully, reload homepage
            response.redirect("/");
        });
    },
    mainPostPage: function(request, response) {
        let postId = request.params.id;
        post.postId = postId;
        let query =`select id, username, title, message, postId from useraccount 
        join post
        on useraccount.id = post.creatorId
        where postId = "${postId}";`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            query = `select message, commentLikeCount, profilePicture, username, id, creatorId, commentId from comment
            join useraccount
            on comment.creatorId = useraccount.id
            where postId = ${postId};`;
            db.query(query, function(error, result2) {
                if(error) {
                    return response.status(500).send(error);
                }
                response.render("post", {
                    post: result[0],
                    comment: result2
                });
            })
        })
    },
    addCommentPage: function(request, response) {
        response.render("edit-comment", 
        {
            add: true,
        });
    },
    editCommentPage: function(request, response){
        let commentId = request.params.id;
        let query = `select message, commentId from comment where commentId = ${commentId}`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            response.render("edit-comment", {
                add:false,
                comment: result[0]
            });
        })
    },
    addComment: function(request, response){
        let message = request.body.message;
        let query = `INSERT INTO comment (creatorId, postId, message, commentLikeCount)
            VALUES (${user.id}, ${post.postId}, "${message}", 0);`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            response.redirect('/post/view/'+post.postId);
        })
    },
    editComment: function(request, response){
        let commentId = request.params.id;
        let message = request.body.message;
        let query = `UPDATE comment SET message = "${message}" where commentId = ${commentId}`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            response.redirect('/post/view/'+post.postId);
        })
    },
    deleteComment: function(request, response){
        let commentId = request.params.id;
        let query = `DELETE FROM comment WHERE commentId = ${commentId};`;
        db.query(query, function (error, result) {
            if (error) {
                // Send server error
                return response.status(500).send(error);
            }

            // New player added successfully, reload homepage
            response.redirect("/post/view/"+post.postId);
        });
    },
}