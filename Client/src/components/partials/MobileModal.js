import React from 'react'

const MobileModal = () => {
    return (
        <nav className="mobile-nav">
            <div className="container-fluid">
                <div className="mobile-nav-container">
                    <div className="row">
                        <div className="col-3 col-md-3 col-xl-3 col-lg-3 mobile-nav__item">
                            <a href="/#"><i className="fas fa-home primary-color"/></a>
                        </div>
                        <div className="col-3 col-md-3 col-xl-3 col-lg-3 mobile-nav__item">
                            <a href="/#"><i className="far fa-file-alt"/></a>
                        </div>
                        <div className="col-3 col-md-3 col-xl-3 col-lg-3 mobile-nav__item">
                            <a href="/#"><i className="fas fa-bell"/></a>
                        </div>
                        <div className="col-3 col-md-3 col-xl-3 col-lg-3 mobile-nav__item">
                            <a href="/#"><i className="fas fa-user"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MobileModal
