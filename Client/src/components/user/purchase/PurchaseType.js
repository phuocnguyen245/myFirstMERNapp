import React from "react";
import { FiTruck } from "react-icons/fi";
import { useParams } from "react-router-dom";

const PurchaseAll = () => {
  const { type } = useParams();
  console.log(type);
  return (
    <div className="items-purchase">
      <div className="item">
        <div className="item__header ">
          <div className="item__header-status">
            <FiTruck />
            <p>Đã giao hàng thành công</p>
          </div>
          <p>Đã giao</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseAll;
