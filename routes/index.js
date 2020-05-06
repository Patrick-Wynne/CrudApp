module.exports = {
    getHomePage: function (request, response) {
        let query = `select id, profilePicture, username, title, message, postId, postLikeCount from useraccount 
        join post
        on useraccount.id = post.creatorId;`;
        db.query(query, function(error, result) {
            if(error) {
                return response.status(500).send(error);
            }
                let renderData = {
                    useraccount : result,
                }
                response.render('index', renderData);
        });
    },
    likePost: function (request, response) {
        let postId = request.params.id;
        let likeCheck = false;
        let query = `select userLikeId, postLikeCount from likes
        join post
        on likes.postLikeId = post.postId
        where postLikeId = ${postId}`;
        db.query(query, function (error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            for(let i=0; i<result.length; i++) {
                if(result[i].userLikeId == user.id) {
                    likeCheck = true;
                    response.redirect(`/post/unlike/${postId}`);
                }
            }
            if(likeCheck == false) {
                let query = `INSERT INTO likes (userLikeId, postLikeId, isPostLike) 
                VALUES (${user.id}, ${postId}, true);`;
                db.query(query, function (error, result) {
                    if(error) {
                        return response.status(500).send(error);
                    }
                    query = `select postLikeCount from post
                    where postId = ${postId};`;
                    db.query(query, function (error, result) {
                        if(error) {
                            return response.status(500).send(error);
                        }
                        query = `UPDATE post SET postLikeCount = "${result[0].postLikeCount+1}" where postId = ${postId};`;
                        db.query(query, function (error, result) {
                            if(error) {
                                return response.status(500).send(error);
                            }
                            response.redirect('/');
                        });
                    });
                });
            }
        });
    },
    unlikePost: function (request, response) {
        let postId = request.params.id;
        let query = `DELETE FROM likes WHERE postLikeId = ${postId};`;
                db.query(query, function (error, result) {
                    if(error) {
                        return response.status(500).send(error);
                    }
                    query = `select postLikeCount from post
                    where postId = ${postId};`;
                    db.query(query, function (error, result) {
                        if(error) {
                            return response.status(500).send(error);
                        }
                        query = `UPDATE post SET postLikeCount = "${result[0].postLikeCount-1}" where postId = ${postId};`;
                        db.query(query, function (error, result) {
                            if(error) {
                                return response.status(500).send(error);
                            }
                            response.redirect('/');
                        });
                    });
                });
    },
    /*
    likeComment: function (request, response) {
        let commentId = request.params.id;
        let likeCheck = false;
        let query = `select userLikeId, commentLikeCount from likes
        join comment
        on likes.postLikeId = comment.commentLikeId
        where postLikeId = ${commentId}`;
        db.query(query, function (error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            for(let i=0; i<result.length; i++) {
                if(result[i].userLikeId == user.id) {
                    likeCheck = true;
                    response.redirect(`/comment/unlike/${commentId}`);
                }
            }
            if(likeCheck == false) {
                let query = `INSERT INTO likes (userLikeId, postLikeId, isPostLike) 
                VALUES (${user.id}, ${postId}, true);`;
                db.query(query, function (error, result) {
                    if(error) {
                        return response.status(500).send(error);
                    }
                    query = `select postLikeCount from post
                    where postId = ${postId};`;
                    db.query(query, function (error, result) {
                        if(error) {
                            return response.status(500).send(error);
                        }
                        query = `UPDATE post SET postLikeCount = "${result[0].postLikeCount+1}" where postId = ${postId};`;
                        db.query(query, function (error, result) {
                            if(error) {
                                return response.status(500).send(error);
                            }
                            response.redirect('/');
                        });
                    });
                });
            }
        });
    },
    unlikeComment: function (request, response) {
        let postId = request.params.id;
        let query = `DELETE FROM likes WHERE postLikeId = ${postId};`;
                db.query(query, function (error, result) {
                    if(error) {
                        return response.status(500).send(error);
                    }
                    query = `select postLikeCount from post
                    where postId = ${postId};`;
                    db.query(query, function (error, result) {
                        if(error) {
                            return response.status(500).send(error);
                        }
                        query = `UPDATE post SET postLikeCount = "${result[0].postLikeCount-1}" where postId = ${postId};`;
                        db.query(query, function (error, result) {
                            if(error) {
                                return response.status(500).send(error);
                            }
                            response.redirect('/');
                        });
                    });
                });
    }
    */
};