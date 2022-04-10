import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { categoriesSelector } from '../../../redux/selector';
import SearchContainer from '../searchContainer/SearchContainer';

const LeftHomePage = () => {
  const [addAbsolute, setAddAbsolute] = useState('content-container-left');
  const [plusHeight, setPlusHeight] = useState(0);
  const leftRef: any = useRef();

  useEffect(() => {
    const leftHeight = leftRef.current.getBoundingClientRect().height;
    localStorage.setItem('leftHeight', leftHeight);
  }, []);

  useEffect(() => {
    window.onload = () => {
      setPlusHeight(0);
      window.scrollTo(0, 0);
    };
  }, []);

  const isLoad = useSelector((state: any) => state.homepage.load);

  useEffect(() => {
    if (isLoad === true) {
      console.log('isLoad', isLoad);
      setAddAbsolute('content-container-left');
      setPlusHeight(0);
    }
  }, [isLoad]);

  const rightValue = Number(localStorage.getItem('rightHeight'));
  useEffect(() => {
    const top = rightValue - window.innerHeight;
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll === 0) {
        setAddAbsolute('content-container-left');
        setPlusHeight(0);
      } else if (scroll > top) {
        setAddAbsolute('content-container-left absolute');
        setPlusHeight(top);
      } else {
        setAddAbsolute('content-container-left');
        setPlusHeight(0);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [rightValue]);


  const categories = useSelector(categoriesSelector);

  return (
    <div ref={leftRef} className={addAbsolute} style={{ top: `${plusHeight}px` }}>
      <div className="container">
        <div className="left t-w col-5">
          <div className="left__text t-w">
            <h1>Đặt đồ ăn, giao hàng từ 20'...</h1>
            <p className="t-w">Có 9047 Địa Điểm Ở Đà Nẵng Từ 06:00 - 22:00</p>
          </div>
          <SearchContainer />
          <div className="left__menu flex">
            <a className="left__menu__item" href="/#">
              All
            </a>
            {categories.map((category: any) => {
              return (
                <a key={category._id} className="left__menu__item" href="/#">
                  {category.name}
                </a>
              );
            })}
          </div>
          <div className="left__text">
            <p className="t-w">
              Sử dụng App ShopeeFood để có nhiều giảm giá
              <br />
              và trải nghiệm tốt hơn
            </p>
          </div>
          <div className="left__connect flex justify-content-start">
            <div className="pr-4">
              <a href="/#">
                <img src="./assets/img/AppStore-vn.png" alt="" />
              </a>
            </div>
            <div>
              <a href="/#">
                <img src="./assets/img/PlayStore-vn.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftHomePage;
