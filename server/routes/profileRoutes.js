import { Router } from 'express'
import { loginUser, signupUser } from '../controllers/profileControllers.js'
import verifyToken from '../middleware/verifyToken.js'
import Profile from '../models/profileSchema.js'

const router = Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)

router.get('/verify', verifyToken, async (req, res) => {
    const { decode } = req

    const profile = await Profile.findById(decode.id)
    const { initiated } = profile

    decode.initiated = initiated

    res.json({ decode })
})

export default router