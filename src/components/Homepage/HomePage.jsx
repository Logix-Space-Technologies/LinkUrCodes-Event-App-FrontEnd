import React from 'react'
import HomeNavbar from './HomeNavbar'

const HomePage = () => {
  return (
    <div>
      <HomeNavbar />
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row">
              <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div className="card" style={{ border: 'none' }}>
                  <img height={400} src="https://img.freepik.com/free-vector/programming-languages-learning-software-coding-courses-website-development-class-script-writing-it-programmers-cartoon-characters_335657-789.jpg" className="card-img-top" alt="..." />
                </div>
              </div>
              <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                <div className="card" style={{ border: 'none' }}>
                  <img height={400} src="https://www.mastersoftwaresolutions.com/wp-content/uploads/2014/08/bnr-1.png" className="card-img-top" alt="..." />
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
