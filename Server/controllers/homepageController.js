
import { generateAccessToken } from '../middleware/auth/auth.js'
import { Categories } from '../models/categoriesModel.js'
import { Shops } from '../models/shopsModel.js'
import { Users } from '../models/usersModel.js'

export const hompageApi = async (req, res) => {
    try {
        const categories = await Categories.find()
        const shops = await Shops.find()
        res.send({ categories, shops })

    } catch (error) {
        console.log(error);
    }
}

export const homepageSearchApi = async (req, res) => {
    try {
        const query = req.query.q
        const shops = await Shops.find({ shopName: { $regex: `.*${query}.*` } })
        res.send({ shops })
    } catch (error) {
        console.log(error);
    }
}
export const getProductById = async (req, res) => {
    try {
        const param = req.params.slug
        const shop = await Shops.find({ slug: param })
        res.send({ shop })
    } catch (error) {
        console.log(error);
    }
}

export const addUser = async (req, res) => {
    try {
        const user = req.body
        res.send({ user })
    } catch (error) {
        console.log(error);
    }
}

export const checkUser = async (req, res) => {
    try {
        if (req.body) {
            const { username, password } = req.body
            const user = await Users.findOne({ username, password })
            if (user) {
                const accessToken = generateAccessToken(user)
                res.send({ user, accessToken })
            } else {
                res.status(400).send('Wrong')
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken')
        res.send('Logout successful')
    } catch (error) {
        console.log(error);
    }
}