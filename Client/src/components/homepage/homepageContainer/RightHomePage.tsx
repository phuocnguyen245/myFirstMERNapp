import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import ProductList from '../productList/ProductList';
const RightHomePage = (): JSX.Element => {
  const rightRef: any = useRef();

  const setHeight = () => {
    setTimeout(() => {
      const rightHeight = rightRef?.current?.getBoundingClientRect().height;
      localStorage.setItem('rightHeight', rightHeight);
    }, 500);
  };

  useEffect(() => {
    setHeight();
  }, []);

  const updateHeight = (isLoadMore: boolean) => {
    isLoadMore && setHeight();
  }


  return (
    <div ref={rightRef} className="content-container-right clearfix">
      <div className="container">
        <div className="right">
          <div className="right__local">
            <span>
              <b></b>
            </span>
            <span>Chọn địa chỉ giao hàng</span>
          </div>
          <ProductList updateHeight ={updateHeight}/>
        </div>
      </div>
    </div>
  );
};

export default RightHomePage;
