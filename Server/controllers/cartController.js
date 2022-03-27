import jwt_decode from "jwt-decode";
import { CartItem } from "../models/cartModel.js";
export const renderCart = async (req, res) => {
    try {
        const { accessToken } = req.body
        const { id } = jwt_decode(accessToken)
        const cartItems = await CartItem.find({ user_ID: id })
        return res.send({ data: cartItems, length: cartItems.length })
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = async (req, res) => {
    try {
        const { product_ID, qty, accessToken } = req.body
        const { id } = jwt_decode(accessToken)
        const isHave = await CartItem.find({ product_ID })
        if (isHave.length == 1) {
            const cartItemID = isHave.map(item => item._id)
            const quantity = isHave.map(item => item.qty)
            const cartItem = await CartItem.findByIdAndUpdate(cartItemID, { qty: Number(quantity) + qty })
            await cartItem.save()
        } else {
            const cartItem = new CartItem({
                product_ID, qty, user_ID: id
            })
            await cartItem.save()
        }
    } catch (error) {
        console.log(error);
    }
}