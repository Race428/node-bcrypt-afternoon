let bcrypt = require('bcryptjs')

module.exports = { 

  register: async(req, res) => { 
   let {username, password, isAdmin } = req.body  
   const db = req.app.get('db')
   console.log(username)
   let result = await db.get_user(username)
   console.log(result)
   let existingUser = result[0]

   if (existingUser) { 
     return res.status(409).send('Username is taken')
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    console.log('bfore db')
   const registeredUser = await db.register_user([isAdmin, username, hash])
   console.log(registeredUser , 'line 20')
   let user = { ...registeredUser[0]}
   console.log(user , 'line 21')
   req.session.user = registeredUser
   res.status(200).send(req.session.user)

  }

}