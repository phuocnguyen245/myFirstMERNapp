
import { Categories } from '../models/categoriesModel.js'
export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find()
        console.log(categories);
        res.send({categories})
    } catch (error) {
        console.log(error);
    }
}
