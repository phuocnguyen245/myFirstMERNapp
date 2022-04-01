import jwtDecode from "jwt-decode";
import jwt_decode from "jwt-decode";
import { CartItem } from "../models/cartModel.js";
import { Orders } from "../models/orderModel.js";
import { Shops } from "../models/shopsModel.js";
import { Users } from "../models/usersModel.js";

export const renderCart = async (req, res) => {
  try {
    const { accessToken } = req.body
    if (accessToken) {
      const { id } = jwt_decode(accessToken)
      const mergerCartItemAndShops = await CartItem.find({ user_ID: id })
        .populate({
          path: 'product_ID',
        })
      const userInfo = await Users.findById(id)

      const getCartItem = await CartItem.find({ user_ID: id, isCheck: true })
        .populate({
          path: 'product_ID',
        })

      const total = getCartItem.reduce((a, b) => a + b.product_ID.cost * b.qty, 0)

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
      const { password, role, ...rest } = userInfo._doc
      const userData = {
        rest
      }
      return res.send({
        data, length: mergerCartItemAndShops.length,
        initLength: getCartItem.length, total, userData
      })
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
    const isHave = await CartItem.find({ product_ID: shopID, user_ID })
    if (isHave.length === 1) {
      const cartItemID = isHave.map(item => item._id)
      const quantity = isHave.map(item => item.qty)
      const cartItem = await CartItem.findOneAndUpdate({ cartItemID, user_ID }, { qty: Number(quantity) + qty })
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
    res.sendStatus(200)
  } catch (error) {
    console.log(error);
  }
}

export const handleDeleteCartItem = async (req, res) => {
  try {
    const { id } = req.params
    await CartItem.findOneAndDelete(id)
    res.send('Delete successfully')
  } catch (error) {
    res.send(400)
  }
}

export const getCartTotal = async (req, res) => {
  try {
    const { accessToken, isCheck, id: product_ID } = req.body
    if (accessToken) {
      const { id } = jwt_decode(accessToken)
      await CartItem.findOneAndUpdate({ user_ID: id, product_ID: product_ID }, {
        isCheck
      })

      const getCartItem = await CartItem.find({ user_ID: id, isCheck: true })
        .populate({
          path: 'product_ID',
        })
      const total = getCartItem.reduce((a, b) => a + b.product_ID.cost * b.qty, 0)
      res.send({ total, length: getCartItem.length })
    }
  } catch (error) {
    console.log(error);
  }
}

export const handleDeleteAllItems = async (req, res) => {
  try {
    const { id } = req.params
    if (id) {
      const { id: user_ID } = jwt_decode(id)
      await CartItem.deleteMany({ user_ID })
    }
  } catch (error) {
    console.log(error);
  }
}

export const handleCheckOut = async (req, res) => {
  try {
    const { userInfo, accessToken } = req.body
    if (accessToken) {
      const { id } = jwt_decode(accessToken)
      const productCheckout = await CartItem.find({ user_ID: id, isCheck: true })
        .populate({
          path: 'product_ID',
        })
      let array = []
      productCheckout.map(product => {
        const products = {
          product_ID: product.product_ID._id,
          qty: product.qty,
          cost: product.product_ID.cost,
          img: product.product_ID.img,
          name: product.product_ID.shopName
        }
        array.push(products)
      })

      const order = new Orders({
        products: array,
        user_ID: id,
        isPay: false,
        userInfo: {
          address: userInfo.address,
          tel: userInfo.tel
        },
        status: 1
      })
      await order.save()
      await CartItem.deleteMany({ user_ID: id, isCheck: true })
      res.send('Buy successfully')
    }
  } catch (error) {
    console.log(error);
  }
}

export const getOrderInfor = async (req, res) => {
  try {
    const { type, accessToken } = req.body
    const { id } = jwtDecode(accessToken)
    if (type === 'all') {
      const orders = await Orders.find({ user_id: id })
      Orders.map
    }
  } catch (error) {
    res.send('k có')
  }
}