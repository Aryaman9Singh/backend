const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/users');
const passport = require('passport');
const axios = require('axios')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
})

passport.use('google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        google: [{
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value, 
        }]
      }
        // let user = await User.findOne({ username: 'mritunjay123'  })
        // console.log(user)

        const result = await axios.get('http://localhost:3000/something'); 
        console.log(result);

        // User.updateOne({
        //   username: 'mritunjay123'
        // }, {
        //   $push: {
        //     google: {
        //       googleId: profile.id,
        //       displayName: profile.displayName,
        //       firstName: profile.name.givenName,
        //       lastName: profile.name.familyName,
        //       image: profile.photos[0].value, 
        //     }
        //   }
        // }, () => {
        //   console.log("Subscriber Added Successsfully")
        // })
    }
  )
)