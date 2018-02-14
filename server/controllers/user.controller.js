const User = require('../models/user.model')
const base64 = require('base64-img')
module.exports = {
  create: (req, res) => {
    const user = new User(req.body)
    user.save().
      then((savedUser) => res.json({user: savedUser, error: false})).
      catch(e => {
        if (e.errmsg !== undefined) {
          res.status(422).
            json({error: true, msg: 'Votre email ou mot de passe est invalide'})
        }
        else if (e.name === 'ValidationError') {
          res.status(422).
            json({
              error: true,
              msg: 'Vous devez renseigner un email et un mot de passe'
            })
        }
        else {
          res.json(e)
        }
      })
  },
  subscribe: (req, res) => {
    let userToSubscribe = req.body.user
    User.findOne({email: userToSubscribe}).then((user) => {
      User.findOneAndUpdate({_id: req.user.id},
        {$push: {subscriptions: user._id}}).then((result) => {
        res.json(result)
      })
    }).catch((err) => {
      console.log(err)
      res.status(500).
        json({error: true, msg: 'Impossible de s\'abonner à cette utilisateur'})
    })
  },
  subscriptions: (req, res) => {
    User.find({_id: req.user.id}).populate('subscriptions').then((result) => {
      res.json(result)
    }).catch((err) => {
      res.status(500).json({error: true, msg: 'Une erreur est survenu'})
    })
  }
}