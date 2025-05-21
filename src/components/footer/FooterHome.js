import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
      {/* Remove the container if you want to extend the Footer to full width. */}
      <div className="mt-3">
        {/* Footer */}
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#1c2331" }}
        >
          {/* Section: Social media */}
          <section
            className="d-flex justify-content-between p-4"
            style={{ backgroundColor: "#6351ce" }}
          >
            {/* Left */}
            <div className="me-5">
              <span>Get connected with us on this networks:</span>
            </div>
            {/* Left */}
            {/* Right */}
            <div>
              <Link to="https://www.facebook.com/" className="text-white me-4">
                <FacebookRoundedIcon />
              </Link>
              <Link to="https://mail.google.com/" className="text-white me-4">
                <MarkEmailUnreadRoundedIcon />
              </Link>
              <Link to="https://web.whatsapp.com/" className="text-white me-4">
                < WhatsAppIcon />
              </Link>
            </div>
            {/* Right */}
          </section>
          {/* Section: Links  */}
          <section className="">
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold">Company name</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "black", height: 2 }}
                  />
                  <p>
                    Amol Ice-Cream
                  </p>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Open Time</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <i className="fas fa-envelope mr-3" /> Monday to sunday
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3" /> 8:00 AM
                    <br />
                    To
                    <br />
                    10:00 PM
                  </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Location</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <i className="fas fa-home mr-3" /> 4, shivaji nagar,limbayat,surat
                  </p>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.535019172872!2d72.8607746!3d21.1708951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fcfac0210ad%3A0x8c3c2a412942202e!2sAmol%20Ice%20Cream%20And%20Kulfi%20Parlour!5e0!3m2!1sen!2sin!4v1677324726404!5m2!1sen!2sin"
                    width="100%"
                    height={150}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <i className="fas fa-envelope mr-3" /> sakhareankit10@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone mr-3" /> +91 9664535305
                  </p>
                  <p>
                    <i className="fas fa-print mr-3" /> +91 9265423814
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © {new Date().getFullYear()} Copyright @
            <span className="text-white">
              AS
            </span>
          </div>
        </footer>
      </div>
    </>
  )
}
export default Footer
