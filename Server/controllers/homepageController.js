
import { generateAccessToken } from '../middleware/auth/auth.js'
import { Categories } from '../models/categoriesModel.js'
import { Shops } from '../models/shopsModel.js'
import { Users } from '../models/usersModel.js'
import bcrypt from 'bcrypt'
import jwt_decode from "jwt-decode";
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
        const { username, email, address, firstname, lastname, tel, password } = req.body
        const isHaveUsername = await Users.findOne({ username })
        const isHaveEmail = await Users.findOne({ email })
        if (isHaveUsername) {
            res.sendStatus(400).send('hehe')
        } else if (isHaveEmail) {
            res.sendStatus(400).send('hihi')
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = new Users({
                username: username,
                name: `${firstname} ${lastname}`,
                password: encryptedPassword,
                email,
                address,
                tel: Number(`0${tel}`),
                role: 1
            })
            await user.save();
            res.sendStatus(201)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}

export const checkUser = async (req, res) => {
    try {
        if (req.body) {
            const { username, password } = req.body
            const user = await Users.findOne({ username })
            if ((user) && await bcrypt.compare(password, user.password)) {
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

export const getUser = async (req, res) => {
    try {
        const { accessToken } = req.params
        const { id } = jwt_decode(accessToken)
        const user = await Users.findById(id)
        res.send({ user })
    } catch (error) {
        console.log(error);
    }
}

export const handlePutUser = async (req, res) => {
    try {
        const { data, accessToken } = req.body
        const { id } = jwt_decode(accessToken)
        await Users.findByIdAndUpdate(id, {
            name: data?.name,
            tel: Number(data?.tel),
            address: data?.address,
            email: data?.email,
        })
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const handlePutPassword = async (req, res) => {
    try {
        const { data, accessToken } = req.body
        const { id } = jwt_decode(accessToken)
        const user = await Users.findById(id)
        let isHave
        if ((user) && await bcrypt.compare(data.oldpassword, user.password)) {
            const encryptedPassword = await bcrypt.hash(data.confirmPassword, 10);
            isHave = true
            await Users.findByIdAndUpdate(id, {
                password: encryptedPassword
            })
            res.sendStatus(200)
        }
        if ((user) && await bcrypt.compare(data.confirmPassword, user.password)) {
            isHave = false
            res.send('Duplicate')
        }
    } catch (error) {
        res.sendStatus(400)
    }
}