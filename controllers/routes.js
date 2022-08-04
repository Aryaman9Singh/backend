const { query } = require("express");
module.exports = function(User, passport, pass){
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.signupPage);
            router.get('/login', this.loginPage);
            router.get('/logout', this.logout);
            router.get('/dashboard', this.dashboard);
            router.get('/auth/google', this.googlePassport);
            router.get('/auth/google/callback', this.googleCallback);
            router.get('/something', this.something);

            router.post('/signup', this.createAccount);
            router.post('/login', this.getInside);
        },
        indexPage: async function(req, res){
            if(req.user){
                res.redirect('/dashboard');
            }else{
                return res.render('index');
            }
        },
        something: function(req, res){
            console.log(req.user)
        },
        dashboard: function(req, res){
            if(req.user){
                console.log(req.user.username + " Logged in");
                return res.render('dashboard', { user: req.user});
            }else{
                res.redirect('/');
            }

        },
        signupPage: async function(req, res){
            if(req.user){
                res.redirect('/dashboard')
            }else{
                res.render('signup');
            }
        },
        createAccount: passport.authenticate('local.signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        loginPage: async function(req, res){
            if(req.user){
                res.redirect('/dashboard')
            }else{
                res.render('login');
            }
        },
        getInside: passport.authenticate('local.login', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        }),
        googlePassport: passport.authenticate('google', 
        { scope: ['profile']}),
        googleCallback: passport.authenticate('google', { 
            successRedirect: '/', 
            failureRedirect: '/dashboard' 
        }),
        logout: function(req, res){
            req.logOut();
            res.redirect('/login');
        },
    }
}