import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedNumber, IntlProvider } from 'react-intl'
const Shop = ({ shopName, address, cost, img, slug }) => {
  const user = localStorage.getItem('account')

  return (
    <div className="col-12 col-sm-6 col-md-3 col-lg-4 col-xl-4 p-1 right-item">
      <IntlProvider locale={'vi'} defaultLocale={'vi'}>
        {user ?
          <NavLink to={`/product/${slug}`} target="_blank">
            <img src={`./assets/img/${img}`} alt="" />
            <div>
              <div className="right-item__desc">
                <p className="m-0 default-color" title={shopName}>{shopName}</p>
                <p className="m-0" title={address}>{address}</p>
              </div>
              <div className="row flex justify-content-start flex-nowrap ml-1 right-item__disc">
                <div className="flex justify-content-start pl-1 pr-1">
                  <i className="fas fa-tag pr-1 " />
                  <p className="m-0"><FormattedNumber value={cost} style="currency" currency="VND" /></p>
                </div>
                <div className="flex justify-content-start align-items-center pl-1 pr-1">
                  <i className="fa fa-dollar pr-1" />
                  <p className="m-0">Giá 40k</p>
                </div>
              </div>
              <div className="row flex justify-content-start flex-nowrap right-item__disc">
                <div className="flex justify-content-start align-items-center mr-1">
                  <i className="fas fa-tag pl-1" />
                  <p className="m-0 pr-1">Mã giảm 20k</p>
                </div>
                <div className="flex justify-content-start align-items-center">
                  <i className="fas fa-motorcycle pl-1 pr-1" />
                  <p className="m-0 pr-1">Giá 20k</p>
                </div>
              </div>
            </div>
          </NavLink> :
          <NavLink to={`/product/${slug}`}>
            <img src={`./assets/img/${img}`} alt="" />
            <div>
              <div className="right-item__desc">
                <p className="m-0 default-color" title={shopName}>{shopName}</p>
                <p className="m-0" title={address}>{address}</p>
              </div>
              <div className="row flex justify-content-start flex-nowrap ml-1 right-item__disc">
                <div className="flex justify-content-start pl-1 pr-1">
                  <i className="fas fa-tag pr-1 " />
                  <p className="m-0"><FormattedNumber value={cost} style="currency" currency="VND" /></p>
                </div>
                <div className="flex justify-content-start align-items-center pl-1 pr-1">
                  <i className="fa fa-dollar pr-1" />
                  <p className="m-0">Giá 40k</p>
                </div>
              </div>
              <div className="row flex justify-content-start flex-nowrap right-item__disc">
                <div className="flex justify-content-start align-items-center mr-1">
                  <i className="fas fa-tag pl-1" />
                  <p className="m-0 pr-1">Mã giảm 20k</p>
                </div>
                <div className="flex justify-content-start align-items-center">
                  <i className="fas fa-motorcycle pl-1 pr-1" />
                  <p className="m-0 pr-1">Giá 20k</p>
                </div>
              </div>
            </div>
          </NavLink>
        }
      </IntlProvider>

    </div >
  )
}

export default Shop
