import { Request, Response } from 'express';
import jwt_decode from 'jwt-decode';
import { CartItem } from '../models/cartModel';
import { Orders } from '../models/orderModel';
import { Shops } from '../models/shopsModel';
import { Users } from '../models/usersModel';

export const renderCart = async (req: Request, res: Response) => {
  try {
    const { accessToken }: { accessToken: string } = req.body;
    if (accessToken) {
      const { id }: { id: string } = jwt_decode(accessToken);
      const mergerCartItemAndShops = await CartItem.find({ user_ID: id }).populate({
        path: 'product_ID',
      });
      const userInfo: any = await Users.findById(id);

      const getCartItem = await CartItem.find({ user_ID: id, isCheck: true }).populate({
        path: 'product_ID',
      });

      const total = getCartItem.reduce((a: any, b:any) => a + b?.product_ID?.cost * b.qty, 0);

      const data = mergerCartItemAndShops.map((d: any) => {
        return {
          img: d.product_ID.img,
          name: d.product_ID.shopName,
          qty: d.qty,
          cost: d.product_ID.cost,
          _id: d.product_ID._id,
          slug: d.product_ID.slug,
          cartItem_ID: d._id,
          isCheck: d.isCheck,
        };
      });
      const { password, role, ...rest } = userInfo._doc;
      const userData = {
        rest,
      };
      return res.send({
        data,
        length: mergerCartItemAndShops.length,
        initLength: getCartItem.length,
        total,
        userData,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { slug, qty, accessToken }: { slug: string; qty: number; accessToken: string } = req.body;
    const { id: user_ID }: { id: string } = jwt_decode(accessToken);
    const shop = await Shops.find({ slug });
    const { _id: shopID } = shop.find((s) => s._id) as any;
    const isHave = await CartItem.find({ product_ID: shopID, user_ID });
    if (isHave.length === 1) {
      const cartItemID = isHave.map((item) => item._id);
      const quantity = isHave.map((item) => item.qty);
      const cartItem: any = await CartItem.findByIdAndUpdate(cartItemID, {
        qty: Number(quantity) + qty,
      });
      await cartItem.save();
    } else {
      const cartItem = new CartItem({
        product_ID: shopID,
        qty,
        user_ID,
      });
      await cartItem.save();
    }
    const cartItems = await CartItem.find({ user_ID });
    res.send({ length: cartItems.length });
  } catch (error) {
    console.log(error);
  }
};

export const handleChangeQuantity = async (req: Request, res: Response) => {
  try {
    const { product_ID, qty, accessToken } = req.body;
    const { id }: { id: string } = jwt_decode(accessToken);
    await CartItem.findOneAndUpdate(
      {
        user_ID: id,
        product_ID,
      },
      {
        qty,
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteCartItem = async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id;
    await CartItem.findOneAndDelete(id);
    res.send('Delete successfully');
  } catch (error) {
    res.send(400);
  }
};

export const getCartTotal = async (req: Request, res: Response) => {
  try {
    const {
      accessToken,
      isCheck,
      id: product_ID,
    }: { accessToken: string; isCheck: boolean; id: string } = req.body;
    if (accessToken) {
      const { id }: { id: string } = jwt_decode(accessToken);
      await CartItem.findOneAndUpdate(
        { user_ID: id, product_ID: product_ID },
        {
          isCheck,
        }
      );

      const getCartItem = await CartItem.find({ user_ID: id, isCheck: true }).populate({
        path: 'product_ID',
      });
      const total = getCartItem.reduce((a, b: any) => a + b.product_ID.cost * b.qty, 0);
      res.send({ total, length: getCartItem.length });
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteAllItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      const { id: user_ID }: { id: string } = jwt_decode(id);
      await CartItem.deleteMany({ user_ID });
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCheckOut = async (req: Request, res: Response) => {
  try {
    const { userInfo, accessToken } = req.body;
    if (accessToken) {
      const { id }: { id: string } = jwt_decode(accessToken);
      const productCheckout = await CartItem.find({
        user_ID: id,
        isCheck: true,
      }).populate({
        path: 'product_ID',
      });
      let array: any[] = [];
      productCheckout.map((product: any) => {
        const products = {
          product_ID: product.product_ID._id,
          qty: product.qty,
          cost: product.product_ID.cost,
          img: product.product_ID.img,
          name: product.product_ID.shopName,
        };
        array.push(products);
      });

      const order = new Orders({
        products: array,
        user_ID: id,
        isPay: false,
        userInfo: {
          address: userInfo.address,
          tel: userInfo.tel,
        },
        status: 1,
      });
      await order.save();
      await CartItem.deleteMany({ user_ID: id, isCheck: true });
      res.send('Buy successfully');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOrderInfor = async (req: Request, res: Response) => {
  try {
    const { type, accessToken } = req.body;
    const { id }: { id: string } = jwt_decode(accessToken);
    if (type === 'wait') {
      const orders = await Orders.find({ user_ID: id, status: 1 }).sort({
        updatedAt: -1,
      });
      res.send({ orders });
    } else if (type === 'delivery') {
      const orders = await Orders.find({ user_ID: id, status: 2 }).sort({
        updatedAt: -1,
      });
      res.send({ orders });
    } else if (type === 'receive') {
      const orders = await Orders.find({ user_ID: id, status: 3 }).sort({
        updatedAt: -1,
      });
      res.send({ orders });
    } else if (type === 'cancel') {
      const orders = await Orders.find({ user_ID: id, status: 4 }).sort({
        updatedAt: -1,
      });
      res.send({ orders });
    } else {
      const orders = await Orders.find({ user_ID: id }).sort({ updatedAt: -1 });
      res.send({ orders });
    }
  } catch (error) {
    res.send('k có');
  }
};

export const handleReBuy = async (req: Request, res: Response) => {
  try {
    const { product_IDS, accessToken } = req.body;

    const { id }: { id: string } = jwt_decode(accessToken);

    const cartItems = await CartItem.find({
      user_ID: id,
    });

    const idsNotInCartItem = product_IDS.filter((p: any) => {
      return !cartItems.some((c: any) => {
        return p.product_ID == c.product_ID;
      });
    });

    const itemToAdd = idsNotInCartItem.map((item: any) => {
      return {
        product_ID: item.product_ID,
        user_ID: id,
        qty: 1,
        isCheck: false,
      };
    });

    await CartItem.insertMany(itemToAdd);
    res.status(200).send({ length: itemToAdd.length, status: 200 });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 400 });
  }
};
