const User = require('../../models/User')
const UserSession = require('../../models/UserSession')
const FoodItems = require('../../models/FoodItems');
const UserFood = require('../../models/UserFood')

module.exports = (app) => {

  // den här går mot spara mat
  app.post('/api/searchUserFood/post', (req, res, next) =>{
    const {body} = req;
    const {
      token
    } = body;

    if(!token){
      return res.send({
        success: false,
        message: 'Error: You have to sign in to save your food. '
      });
    }

    // var userId = ''
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions ) => {
      if (err){
       throw err;
      } else {
        //console.log('sessions: ' + sessions[0].userId)
        //userId = sessions[0].userId
        UserFood.find({
          userId: sessions[0].userId
        }, (err, docs) => {
          if (err) {
            throw err
          } else {
            /*docs.forEach(element => {
              console.log(element.Namn)
            });*/
            return res.send(docs)
          }
        })

      }
    });
  });


  // den här går mot spara mat
  app.post('/api/fooddata/post', (req, res, next) =>{
    const {body} = req;
    const {
      selectedFood,
      selectedAmount,
      token
    } = body;
    
    console.log('selectedFood: ' + selectedFood + ' * selectedAmount: ' +selectedAmount + ' * token: ' + token)

    if(!selectedFood){
      return res.send({
        success: false,
        message: 'Error: Selected Food cannot be blank. '
      });
    }
        
    if(!selectedAmount){
      return res.send({
        success: false,
        message: 'Error: Selected Amount cannot be blank. '
      });
    }
        
    if(!token){
      return res.send({
        success: false,
        message: 'Error: You have to sign in to save your food. '
      });
    }

    // var userId = ''
    const userSession = UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions ) => {
      if (err){
       throw err;
      } else {
        //console.log('sessions: ' + sessions[0].userId)
        //userId = sessions[0].userId
            
        const MongoClient = require('mongodb').MongoClient
        MongoClient.connect('mongodb://admin:Bitching1@ds229008.mlab.com:29008/addaskogberg', (error, client) => {
          if (error) throw error
          var db = client.db('addaskogberg')
          db.collection('foodData', function (error, collection) {
            if (error) throw error
            var fooditem = collection.find({ Namn: selectedFood })
            fooditem.forEach(function (doc) {
              //console.log(doc.Energi.Varde)
              let Varde_kcal = selectedAmount / 100 * doc.Energi.Varde
              const newUserFood = new UserFood();

              newUserFood.Namn = selectedFood;
              newUserFood.userId = sessions[0].userId;
              newUserFood.Viktgram = selectedAmount;
              newUserFood.Nummer = -1;
              newUserFood.Energi = {Värde: Varde_kcal, Enhet: 'kcal'};
              newUserFood.save((err, user) => {
                if (err) {
                  console.log(err)
                  return res.send({
                    success: false,
                    message: 'Error: server error'
                  });
                }
                console.log('success')
                return res.send({
                  success: true,
                  message: 'Signed up'
                });
              });
            }, function (err) {
              if (err) throw err
            })
            //console.log(element)

          })
        })

      }
    });
  });

  app.post('/api/account/signup', (req, res, next) => {
    const {body} = req;
    const {
      firstName,
      lastName,
      password
    } = body;
    let {
      email
    } = body;

    if(!firstName){
      return res.send({
        success: false,
        message: 'Error: First name cannot be blank. '
      });
    }
    if(!lastName){
      return res.send({
        success: false,
        message: 'Error: Last name cannot be blank. '
      });
    }
    if(!email){
      return res.send({
        success: false,
        message: 'Error: email cannot be blank. '
      });
    }
    if(!password){
     return res.send({
        success: false,
        message: 'Error: password cannot be blank. '
      });
    }

    email = email.toLowerCase();

    User.find({
      email: email,
    }, (err, previousUser) => {
      if (err){
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      } else if (previousUser.length > 0){
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      } 

      const newUser = new User();

      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });
  });

  app.post('/api/account/signin', (req, res, next) => {
    const {body} = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    if(!email){
      return res.send({
        success: false,
        message: 'Error: email cannot be blank. '
      });
    }
    if(!password){
     return res.send({
        success: false,
        message: 'Error: password cannot be blank. '
      });
    }

    email = email.toLowerCase();

    User.find({
      email: email

    }, (err, users) =>{
      if (err){
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1){
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const user = users [0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err){
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }

        return res.send({
            success: true,
            message: 'Valid sign in',
            token: doc._id,
            firstName: user.firstName
        });
      });
    });
  });

  app.get('/api/account/verify', (req, res, next) => {

    const { query } = req;
    const { token } = query;


    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions ) => {
      if (err){
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      if (sessions.length != 1){
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
  });

  app.get('/api/account/logout', (req, res, next) =>{

    const { query } = req;
    const { token } = query;


    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions ) => {
      if (err){
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

        return res.send({
          success: true,
          message: 'Good'
        });
   
    });
  });

  app.get('/api/searchFood/get', (req, res, next) =>{
    RegExp.quote = function (str) {
      return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
    }
    const MongoClient = require('mongodb').MongoClient
    var url = 'mongodb://admin:Bitching1@ds229008.mlab.com:29008/addaskogberg'
    MongoClient.connect(url)
      .then(function (db) {
        var foodDb = db.db('addaskogberg')
        foodDb.collection('foodData', function (error, collection) {
          if (error) throw error
    
          var searchstring = 'Mjölk'
    
          var searchFor = new RegExp(RegExp.quote(searchstring), 'g')
    
          collection.find({ Namn: searchFor }).toArray(function (error, docs) {
            if (error) throw error
            //console.log(docs)
            console.log('Klar med Array return')
            return res.send(docs)
          })
        })
      })
      .catch(function (err) {
        console.log(err)
      })

  });

  app.post('/api/searchFood/post', (req, res, next) =>{
    const {body} = req;
    const {
      foodSearch
    } = body;
  
    RegExp.quote = function (str) {
      return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
    }
    const MongoClient = require('mongodb').MongoClient
    var url = 'mongodb://admin:Bitching1@ds229008.mlab.com:29008/addaskogberg'
    MongoClient.connect(url)
      .then(function (db) {
        var foodDb = db.db('addaskogberg')
        foodDb.collection('foodData', function (error, collection) {
          if (error) throw error
    
          var searchstring = foodSearch
    
          var searchFor = new RegExp(RegExp.quote(searchstring), 'g')
    
          collection.find({ Namn: searchFor }).toArray(function (error, docs) {
            if (error) throw error
            console.log(foodSearch)
            console.log('Klar med Array return')
            return res.send(docs)
          })
        })
      })
      .catch(function (err) {
        console.log(err)
      })

  });
};