import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { URL } from '../../../constants';
import { IShop } from '../../../interface';
import Shop from './Shop';
import { isLoad } from '../homePageSlice';
const ProductList = ({ updateHeight }: { updateHeight: any }) => {
  const dispatch = useDispatch();

  const [counter, setCounter] = useState({ food: 0, drink: 0, snack: 0 });
  const [data, setData] = useState({ food: [], drink: [], snack: [] });
  const [category, setCategory] = useState({ food: '', drink: '', snack: '' });

  const apiFood = async (counter: number) => {
    const response = await axios.get(`${URL}/homepage/category/food-category/page-${counter}`);
    const { data, category } = await response.data;
    setData((prev) => ({
      ...prev,
      food: data,
    }));
    setCategory((prev) => ({ ...prev, food: category }));
  };

  const apiDrink = async (counter: number) => {
    const response = await axios.get(`${URL}/homepage/category/drink-category/page-${counter}`);
    const { data, category } = await response.data;
    setData((prev) => ({
      ...prev,
      drink: data,
    }));
    setCategory((prev) => ({ ...prev, drink: category }));
  };

  const apiSnack = async (counter: number) => {
    const response = await axios.get(`${URL}/homepage/category/snack-category/page-${counter}`);
    const { data, category } = await response.data;
    setData((prev) => ({
      ...prev,
      snack: data,
    }));
    setCategory((prev) => ({ ...prev, snack: category }));
  };

  useEffect(() => {
    apiFood(counter.food);
  }, [counter.food]);

  useEffect(() => {
    apiDrink(counter.drink);
  }, [counter.drink]);

  useEffect(() => {
    apiSnack(counter.snack);
  }, [counter.snack]);

  const loadMore = (categoryName: string) => {
    updateHeight(true);
    dispatch(isLoad(true));
    if (categoryName === 'Đồ ăn') {
      setCounter((prev) => ({ ...prev, food: counter.food + 1 }));
    } else if (categoryName === 'Đồ uống') {
      setCounter((prev) => ({ ...prev, drink: counter.drink + 1 }));
    } else if (categoryName === 'Ăn vặt') {
      setCounter((prev) => ({ ...prev, snack: counter.snack + 1 }));
    }
  };

  return (
    <div>
      <section className="right-wrapper">
        <div className="right__title">
          <span>
            <b>{category.food}</b>
          </span>
        </div>
        <div className="right__list row m-0">
          {data?.food?.map((shop: IShop) => {
            return (
              <Shop
                key={shop._id}
                slug={shop.slug}
                shopName={shop.shopName}
                img={shop.img}
                address={shop.address}
                cost={shop.cost}
              />
            );
          })}
        </div>
        <div className="right__load-more" onClick={() => loadMore(category.food)}>
          Load more
        </div>
      </section>
      <section className="right-wrapper">
        <div className="right__title">
          <span>
            <b>{category?.drink}</b>
          </span>
        </div>
        <div className="right__list row m-0">
          {data?.drink?.map((shop: IShop) => {
            return (
              <Shop
                key={shop._id}
                slug={shop.slug}
                shopName={shop.shopName}
                img={shop.img}
                address={shop.address}
                cost={shop.cost}
              />
            );
          })}
        </div>
        <div className="right__load-more" onClick={() => loadMore(category.drink)}>
          Load more
        </div>
      </section>
      <section className="right-wrapper">
        <div className="right__title">
          <span>
            <b>{category.snack}</b>
          </span>
        </div>
        <div className="right__list row m-0">
          {data?.snack?.map((shop: IShop) => {
            return (
              <Shop
                key={shop._id}
                slug={shop.slug}
                shopName={shop.shopName}
                img={shop.img}
                address={shop.address}
                cost={shop.cost}
              />
            );
          })}
        </div>
        <div className="right__load-more" onClick={() => loadMore(category.snack)}>
          Load more
        </div>
      </section>
    </div>
  );
};

export default ProductList;
