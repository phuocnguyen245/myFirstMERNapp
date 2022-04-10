import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt_decode from 'jwt-decode';
import { generateAccessToken } from '../middleware/auth/auth';
import { Categories } from '../models/categoriesModel';
import { Shops } from '../models/shopsModel';
import { Users } from '../models/usersModel';

export const hompageApi = async (req: Request, res: Response) => {
  try {
    const categories = await Categories.find();
    const shops = await Shops.find();
    res.send({ categories, shops });
  } catch (error) {
    console.log(error);
  }
};

export const foodCategory = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;
    const limit: number = (Number(page) + 1) * 1;
    const data = await Shops.find({ category: 'Đồ ăn' }).limit(limit);
    res.status(200).send({ data, category: 'Đồ ăn' });
  } catch (error) {
    console.log(error);
    res.status(404).send('Error');
  }
};

export const drinkCategory = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;
    const limit: number = (Number(page) + 1) * 1;
    const data = await Shops.find({ category: 'Đồ uống' }).limit(limit);
    res.status(200).send({ data, category:'Đồ uống'});
  } catch (error) {
    console.log(error);
    res.status(404).send('Error');
  }
};

export const snackCategory = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;    
    const limit: number = (Number(page) + 1) * 3;
    const data = await Shops.find({ category: 'Ăn vặt' }).limit(limit);
    res.status(200).send({ data, category: 'Ăn vặt' });
  } catch (error) {
    console.log(error);
    res.status(404).send('Error');
  }
};

export const homepageSearchApi = async (req: Request, res: Response) => {
  try {
    const query = req.query.q;
    const shops = await Shops.find({ shopName: { $regex: `.*${query}.*` } });
    res.send({ shops });
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const param = req.params.slug;
    const shop = await Shops.find({ slug: param });
    res.send({ shop });
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { username, email, address, firstname, lastname, tel, password } = req.body;
    const isHaveUsername = await Users.findOne({ username });
    const isHaveEmail = await Users.findOne({ email });
    if (isHaveUsername) {
      return res.send('Error Username');
    } else if (isHaveEmail) {
      return res.send('Error Username');
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = new Users({
        username: username,
        name: `${firstname} ${lastname}`,
        password: encryptedPassword,
        email,
        address,
        tel: Number(`0${tel}`),
        role: 1,
      });
      await user.save();
      return res.sendStatus(201);
    }
  } catch (error) {
    return res.status(400);
  }
};

export const checkUser = async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const { username, password } = req.body;
      const user = await Users.findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = generateAccessToken(user);
        res.send({ user, accessToken });
      } else {
        res.status(400).send('Wrong');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('accessToken');
    res.send('Logout successful');
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.params;
    const { id }: { id: string } = jwt_decode(accessToken);
    const user = await Users.findById(id);
    res.send({ user });
  } catch (error) {
    console.log(error);
  }
};

export const handlePutUser = async (req: Request, res: Response) => {
  try {
    const { data, accessToken } = req.body;
    const { id }: { id: string } = jwt_decode(accessToken);
    await Users.findByIdAndUpdate(id, {
      name: data?.name,
      tel: Number(data?.tel),
      address: data?.address,
      email: data?.email,
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};

export const handlePutPassword = async (req: Request, res: Response) => {
  try {
    const { data, accessToken } = req.body;
    const { id }: { id: string } = jwt_decode(accessToken);
    const user = await Users.findById(id);
    let isHave;
    if (user && (await bcrypt.compare(data.oldpassword, user.password))) {
      const encryptedPassword = await bcrypt.hash(data.confirmPassword, 10);
      isHave = true;
      await Users.findByIdAndUpdate(id, {
        password: encryptedPassword,
      });
      res.sendStatus(200);
    }
    if (user && (await bcrypt.compare(data.confirmPassword, user.password))) {
      isHave = false;
      res.send('Duplicate');
    }
  } catch (error) {
    res.sendStatus(400);
  }
};
