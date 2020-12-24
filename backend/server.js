const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = 4000;
const fs = require('fs');
const multer = require("multer");

//Routes
const userRoutes = express.Router();
const userRoutesLogin = express.Router();
const userRoutesInfo = express.Router();
const profileUpdate = express.Router();
const recipesRoutes = express.Router();
const recipeRoutes = express.Router();


let User = require("./models/user.model");
let Recipe = require("./models/recipes.model");
const { json } = require('body-parser'); 
 
app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
      cb(null, "uploads/");
    }
  });
const upload = multer({ storage: storage });


mongoose.connect('mongodb://127.0.0.1:27017/food', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log(err))
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})
 


app.use("/recipes", recipesRoutes);
app.use("/recipe", recipeRoutes);
app.use("/", userRoutesLogin);
app.use("/", userRoutes);
app.use("/", userRoutesInfo);
app.use("/profile", profileUpdate);

//User Route

 userRoutesLogin.route('/fetch').get(function(req, res) {
    
    let username = req.query.username;
    let password = req.query.password;
    
    
    User.findOne({'username':username, 'password':password}).then(userAuth => {
        if (userAuth) {
            res.status(200).json(userAuth);
        } else {
            res.json(userAuth);
        }
    });
    
}); 

userRoutesInfo.route('/fetchid').get(function(req, res){

    let id = req.query.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        User.findById({"_id":id}).then(info => {
            if (info){
                res.status(200).json(info);
            } else {
                res.status(400).send("Invalid");
            }
        })
      }
    
})

userRoutes.route('/add').post(function(req, res){
    const user = new User();
    user.username = req.body.username
    user.password = req.body.password
    user.email = req.body.email
    user.phone = parseInt(req.body.phone.replace(/\D/g,''))
    user.picture = {
        data: fs.readFileSync("./../../src/images/Default-Pic.png"),
        contentType: "image/png"
    };
    user.location = req.body.location
    user.about = req.body.about
    user.fullname = req.body.fullname
    user.save()
    .then(user => {
        res.status(200).json({'register':'registration added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding registration failed');
    });
}); 

//Profile Route
profileUpdate.route('/add/:id').post(function(req, res){

    let id = req.params.id;
    
    User.findById({"_id":id}, function(err, profileuser){
        if (!profileuser){
            res.send("data is not found");
        }
        else{
            profileuser.fullname = req.body.fullname;
            profileuser.email = req.body.email;
            profileuser.phone = parseInt(req.body.phone.replace(/\D/g,''))
            profileuser.location = req.body.location;
            profileuser.about = req.body.about;
            profileuser.save()
            .then(profileuser => {
                res.status(200).json({'profile':'profile updated successfully'});
            })
            .catch(err => {
                res.send('profile update failed');
            });
        }
    })
}); 


profileUpdate.route('/upload/:id').post(upload.single("file"), function(req, res){

    let id = req.params.id;

    
    User.findById({"_id":id}).then(result => {
        result.picture.data = fs.readFileSync(req.file.path);
        result.picture.contentType = "image/png";
        
            result.save()
            .then(profileuser => {
                res.status(200).json({'profile':'profile updated successfully'});
            })
            .catch(err => {
                res.send('profile update failed');
            });
        
    })
})

//Recipes Route

recipesRoutes.route('/add').post(function(req, res){
    
    const recipe = new Recipe();
    recipe.userid = req.body.userid;
    recipe.recipename = req.body.recipename;
    recipe.recipedescription = req.body.recipedescription;
    recipe.ingredients = req.body.ingredients;
    recipe.steps = req.body.steps;
    recipe.save()
    .then(recipe => {
        res.status(200).json(recipe);
    })
    .catch(err => {
        res.status(400).send('adding recipe failed');
    });
});


recipesRoutes.route('/upload/:id').post(upload.single("file"), function(req, res){
    
    let id = req.params.id;
    Recipe.findOne({'_id':id}).then(result => {
        
        result.recipepicture = {
                data: fs.readFileSync(req.file.path),
                contentType: "image/png"
        }; 
        result.save()
        .then(profileuser => {
            res.status(200).json({'profile':'profile updated successfully'});
        })
        .catch(err => {
            res.send('profile update failed');
        });
        
    })
}) 

recipesRoutes.route('/fetch').get(function(req, res){
    
    let id = req.query.userid;

    Recipe.find({ 'userid': { $all: [ id ] } }).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.json(result);
        }
        
    })
}) 


recipesRoutes.route('/delete').post(function(req, res){

    let id = req.body.recipeid;

    Recipe.deleteOne({'_id':id}).then(deletedrecipe => {
        res.status(200).json({'recipe':'recipe deleted successfully'});
    })
    .catch(err => {
        res.send('recipe delete failed');
    });    
})

recipesRoutes.route('/updatepic/:id').post(upload.single("file"), function(req, res){
    let id = req.params.id;
    Recipe.findOne({'_id':id}).then(result => {
        result.recipepicture = {
                data: fs.readFileSync(req.file.path),
                contentType: "image/png"
        }; 
        result.save()
        .then(recipeuser => {
            res.status(200).json({'recipepic':'recipepic updated successfully'});
        })
        .catch(err => {
            res.send('recipepic update failed');
        });
        
    })
}) 

recipesRoutes.route('/update').post(function(req, res){
    let id = req.body.recipeid;
    
    Recipe.findOne({'_id':id}).then(result => {
        
        result.recipename = req.body.recipename;
        result.recipedescription = req.body.recipedescription;
        result.ingredients = req.body.ingredients;
        result.steps = req.body.steps;
        
        result.save()
        .then(recipeuser => {
            res.status(200).json({'recipepic':'recipepic updated successfully'});
        })
        .catch(err => {
            res.send('recipepic update failed');
        });
        
    })
}) 




app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


