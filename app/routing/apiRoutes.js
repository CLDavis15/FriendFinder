var path = require("path");

var friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){ 
        var userInput = req.body;

        var userResponse = userInput.scores;

        var matchName = "";
        var matchImage = "";
        var totalDifference = 10000;

        for(var i = 0; i < friends.length; i++) {

            var diff = 0;

            for(var x = 0; x < userResponse; x++) {
                diff += Math.abs(friends[i].scores[x] - userResponse[x]);
            }

            if(diff < totalDifference) {

                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // Add new user
        friends.push(userInput);

        // Send response
        res.json({status: "Ok", matchName: matchName, matchImage: matchImage});
    });
};