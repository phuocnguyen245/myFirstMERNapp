
import { Categories } from '../models/categoriesModel.js'
import { Shops } from '../models/shopsModel.js'
import { Users } from '../models/usersModel.js'
export const hompageApi = async (req, res) => {
    try {
        const categories = await Categories.find().limit(3)
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
        const param = req.params.id
        const shops = await Shops.find({ _id: param })
        res.send({ shops })
    } catch (error) {
        console.log(error);
    }
}

export const addUser = async (req, res) => {
    try {
        const newUser = new Users({

        })
        newUser.save()
    } catch (error) {
        console.log(error);
    }
}

export const checkUser = async (req, res) => {
    try {
        // const user = await Users.findOne({ id: 1 })
        // res.send({user})
        // console.log(req.body);
        const user = await Users.findOne({ username: req.body.username, password: req.body.password })
        res.send({ user })
    } catch (error) {
        console.log(error);
    }
}