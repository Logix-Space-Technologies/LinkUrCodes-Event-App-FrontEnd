import React from 'react'
import HomeNavbar from './HomeNavbar'

const About = () => {
    return (
        <div>
            <HomeNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row">
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <div className="card" style={{ border: 'none' }}>
                                    <img height={400} src="https://www.linkurcodes.com/images/resource/about.png" className="card-img-top" alt="..." />
                                </div>
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <div className="card" style={{ border: 'none' }}>
                                    <h5>About Us</h5>
                                    <p>We are an enthusiastic group of individuals from different parts of India who are interested in creating a culture that helps individuals improve their skills right from their childhood. We created Link Ur Codes as a portal which acts as a bridge between Academia and the IT industry. This portal functions as a mentor for students, faculties and working professionals who aspire to develop a career in the IT industry regardless of their knowledge in the latest technology. We have trained over 25000 students and professionals, conducted over 300 technical hands-on workshops and 100 technical talks across various colleges in India.<br></br>
                                        <br></br>
                                        Link Ur Codes is for everyone who aspires to increase their knowledge in the IT industry. We have crafted informative courses and programmes for students from schools and colleges to working professionals in the IT industry to faculties teaching technology. At Link Ur Codes, we believe knowledge should be accessible to all. We aim to provide everyone with knowledge on all the latest technology and trends.</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
