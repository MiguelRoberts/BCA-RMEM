const User      = require('../../models/User')
const router    = require('express').Router()
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const auth      = require('../../middleware/auth')

// @route   POST /api/auth
// @desc    Authenticate User
// @access  Public

router.post('/', async (req, res) => {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password)
        return res.status(400).json({ msg: 'Please Enter All Fields' })
    
    // Check for existing user
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ msg: 'User Does Not Exist' })

    try {
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) return res.status(400).json({ msg: 'Invalid Password' })

        const token = await jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: 21600 })
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username
            }
        })

    } catch(err) {
        res.status(500).json({ msg: 'Error Authenticating User' })
    }
})

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
});  

module.exports = router