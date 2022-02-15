
import { Categories } from '../models/categoriesModel.js'
import { Shops } from '../models/shopsModel.js'
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
