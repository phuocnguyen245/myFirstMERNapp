import jwt_decode from "jwt-decode";
import { CartItem } from "../models/cartModel.js";
import { Shops } from "../models/shopsModel.js";

export const renderCart = async (req, res) => {
    try {
        const { accessToken } = req.body
        if (accessToken) {
            const { id } = jwt_decode(accessToken)
            const mergerCartItemAndShops = await CartItem.find({ user_ID: id })
                .populate({
                    path: 'product_ID',
                })
            const data = mergerCartItemAndShops.map(d => {
                return {
                    img: d.product_ID.img,
                    name: d.product_ID.shopName,
                    qty: d.qty,
                    cost: d.product_ID.cost,
                    _id: d.product_ID._id,
                    slug: d.product_ID.slug,
                    cartItem_ID: d._id,
                    isCheck: d.isCheck
                }
            })
            return res.send({ data, length: data.length })
        } else {
            res.sendStatus(400)
        }
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = async (req, res) => {
    try {
        const { slug, qty, accessToken } = req.body
        const { id: user_ID } = jwt_decode(accessToken)
        const shop = await Shops.find({ slug })
        const { _id: shopID } = shop.find(s => s._id)
        const isHave = await CartItem.find({ product_ID: shopID })
        if (isHave.length === 1) {
            const cartItemID = isHave.map(item => item._id)
            const quantity = isHave.map(item => item.qty)
            const cartItem = await CartItem.findByIdAndUpdate(cartItemID, { qty: Number(quantity) + qty })
            await cartItem.save()
        } else {
            const cartItem = new CartItem({
                product_ID: shopID, qty, user_ID
            })
            await cartItem.save()
        }
        const cartItems = await CartItem.find({ user_ID })
        res.send({ length: cartItems.length })
    } catch (error) {
        console.log(error);
    }
}

export const handleChangeQuantity = async (req, res) => {
    try {
        const { product_ID, qty, accessToken } = req.body
        const { id } = jwt_decode(accessToken)
        await CartItem.findOneAndUpdate({
            user_ID: id, product_ID
        }, {
            qty
        });
        res.send(200)
    } catch (error) {
        console.log(error);
    }
}

export const handleDeleteCartItem = async (req, res) => {
    try {
        const { id } = req.params
        await CartItem.findByIdAndDelete(id)
    } catch (error) {
        res.send(400)
    }
}

export const getCartTotal = async (req, res) => {
    try {
        const { checked, accessToken, isCheck } = req.body
        if (accessToken) {
            const { id } = jwt_decode(accessToken)
            const mergerCartItemAndShops = await CartItem.find({ user_ID: id, product_ID: checked })
                .populate({
                    path: 'product_ID',
                })
            await CartItem.findOneAndUpdate({ user_ID: id, product_ID: checked }, {
                isCheck
            })
            const total = mergerCartItemAndShops.reduce((a, b) => a + b.product_ID.cost, 0)
            console.log(total);
            res.send({ total })
        }
    } catch (error) {
        console.log(error);
    }
}