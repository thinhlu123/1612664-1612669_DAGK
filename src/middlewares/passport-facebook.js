const passport = require("passport");
const passportfb = require("passport-facebook").Strategy;
const userModel = require('../models/account.model');

module.exports = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new passportfb(
        {
            clientID: '435150283985253',
            clientSecret: 'b1fd35af6644dd70176cff60f64fdc35',
            callbackURL: 'http://localhost:3000/auth/fb/cb',
            profileFields: ['email','gender','locale','displayName']
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);

            userModel.singleByIDFacebook(profile._json.id).then(user => {
                if(user.length > 0){
                    return done(null,user);
                }
                else{
                    var entity = {
                        idfacebook: profile._json.id,
                        fullname: profile._json.name,
                        email: profile._json.email,
                        type: 2,
                    }

                    userModel.add(entity).then(id => {
                        return done(null,id);
                    })
                }
            }).catch(err => {
                return done(err);
            })
        }
    ))

    passport.serializeUser((user,done) => {
        done(null,user.ID);
    })

    passport.deserializeUser((id,done) => {
        userModel.find(id).then(user => {
            done(null,user);
        })
    })
}