import React from 'react';

const Banner = () => {
  return (
    <div className="container">
      <section className="container">
        <div className="banner-container banner-1">
          <div className="banner-container__text">
            <h4>Đơn hàng của bạn sẽ được bảo quản như thế nào?</h4>
            <p>
              ShopeeFood sẽ bảo quản đơn của bạn bằng túi &amp; thùng để chống nắng mưa, giữ
              nhiệt... trên đường đi một cách tốt nhất.
            </p>
          </div>
          <div className="banner-container__img">
            <img src="/assets/img/banner1.png" alt="" />
          </div>
        </div>
      </section>
      <section className="container">
        <div className="banner-container">
          <div className="banner-container__text">
            <h4>ShopeeFood Merchant App</h4>
            <p>
              - <strong>ShopeeFood Merchant </strong>là ứng dụng quản lý đơn hàng cho các nhà hàng
              đối tác của dịch vụ đặt món tận nơi
            </p>
            <p>
              - <strong>ShopeeFood.vn </strong>luôn sẵn sàng hợp tác với các nhà hàng, quán ăn,
              cafe... để mở rộng kinh doanh cũng như gia tăng khách hàng. Hãy kết nối vào hệ thống
              đặt và giao hàng để giảm bớt chi phí quản lý, vận hành, marketing, công nghệ...
            </p>
            <p>
              Đăng ký tham gia: <b>tại đây</b>
            </p>
          </div>
          <div className="banner-container__img">
            <img className="img-absolute" src="/assets/img/banner2.png" alt="" />
          </div>
        </div>
      </section>
      <section className="container">
        <div className="banner-container">
          <div className="banner-container__text">
            <h4 className="primary-color">
              ShopeeFood.vn <b>Hợp tác nhân viên giao nhận - ShopeeFood Driver</b>
            </h4>
            <p>Giúp bạn tăng thu nhập trong thời gian rảnh rỗi</p>
            <p>
              <strong>ShopeeFood </strong>tìm kiếm hợp tác với các cá nhân để thực hiện việc giao
              hàng, chúng tôi sẽ cung cấp ứng dụng (app), 1 số dụng cụ cần thiết để bạn có thể tiếp
              nhận &amp; giao hàng, kiếm thêm thu nhập
            </p>
            <p>
              Đăng ký tham gia: <b>tại đây</b> hoặc gửi Email qua<b> tuyendung@gofast.vn </b>- hoặc
              gọi qua số điện thoại (028) 7109 9179.
            </p>
          </div>
          <div className="banner-container__img">
            <img className="img-absolute2" src="/assets/img/banner3.png" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
