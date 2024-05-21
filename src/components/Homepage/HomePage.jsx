import React from 'react'
import HomeNavbar from './HomeNavbar'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <HomeNavbar />
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img height={150} src="https://www.linkurcodes.com/images/logo.png" className="d-block w-100" alt="..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                <div className="card" style={{ border: 'none' }}>
                  <img height={300} src="https://www.logixspace.com/assets/img/about-img.svg" className="card-img-top" alt="..." />
                </div>
              </div>
              <div className="col col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                <div className="card text-center mb-3" style={{ border: 'none' }}>
                  <div className="card-body">
                    <br></br>
                    <Link to="/adminlogin" className="btn btn-primary">Admin Login</Link><br></br><br></br>
                    <Link to="/collegelogin" className="btn btn-primary">College Login</Link><br></br><br></br>
                    <Link to="/studentlogin" className="btn btn-primary">Student Login</Link><br></br><br></br>
                    <Link to="/userlogin" className="btn btn-primary">User Login</Link><br></br><br></br>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                <div className="card" style={{ border: 'none' }}>
                  <img height={300} src="https://www.logixspace.com/assets/img/hero-img.svg" className="card-img-top" alt="..." />
                </div>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <h5>About Us</h5>
                <p>We created Link Ur Codes as a portal which acts as a bridge between Academia and the IT industry. This portal functions as a mentor for students, faculties and working professionals who aspire to develop a career in the IT industry regardless of their knowledge in the latest technology. We have trained over 100000 students and pro- fessionals, conducted over 300 technical hands-on workshops and 100 technical talks across various colleges in India.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
