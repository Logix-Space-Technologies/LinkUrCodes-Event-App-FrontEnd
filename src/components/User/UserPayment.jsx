
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const UserPayment = () => {
  const location = useLocation();
  const event = location.state?.event;
  const [razorpayKey, setRazorpayKey] = useState('');
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("userid");
  const username=sessionStorage.getItem("username")
  const useremail=sessionStorage.getItem("useremail")
  const usercontact=sessionStorage.getItem("usercontact")
  

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay script loaded');
        fetchRazorpayKey();
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();

    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  

  const fetchRazorpayKey = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/payment/razorpay-key');
      setRazorpayKey(response.data.key);
    } catch (error) {
      console.error('Failed to fetch Razorpay key:', error);
      alert('Failed to fetch Razorpay key');
    }
  };

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8085/api/payment/create-order', {
        user_id: user_id,
        payment_event_id: event.event_public_id,
        payment_amount: event.event_public_amount,
        currency: 'INR',
      });

      const { id: order_id, amount, currency } = response.data;

      const options = {
        key: razorpayKey,
        amount: amount.toString(),
        currency: currency,
        name: 'Link Ur Codes',
        description: `Pay for ${event.event_public_name}`,
        image: 'https://www.linkurcodes.com/images/logo.png',
        order_id: order_id,
        handler: async (response) => {
          const PaymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          const signature = response.razorpay_signature;

          if (PaymentId) {
            try {
              const verifyResponse = await axios.post('http://localhost:8085/api/payment/paymentCapture', {
                razorpay_order_id: orderId,
                razorpay_payment_id: PaymentId,
                razorpay_signature: signature,
                user_id: user_id,
                payment_event_id: event.event_public_id,
                payment_amount: event.event_public_amount
              });

              if (verifyResponse.data.success) {
                alert('Payment successfull');
                generateReceipt({
                  eventName: event.event_public_name,
                  amount: event.event_public_amount,
                  paymentId: PaymentId,
                  orderId: orderId,
                  userName: username, // Replace with actual user name if available
                  userEmail: useremail // Replace with actual user email if available
                });
                navigate('/viewevent');
              } else {
                alert('Payment verification failed');
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              alert('Payment verification failed');
            }
          } else {
            alert('Payment failed or was cancelled.');
          }
        },
        prefill: {
          contact: usercontact,
          name: username,
          email: useremail,
        },
        notes: {
          description: `Registered for ${event.event_public_name}`,
          venue: event.event_venue,
        },
        theme: {
          color: '#2300a3',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Order creation error:', error);
      alert('Order creation failed. See console for more details.');
    }
  };

  const generateReceipt = ({ eventName, amount, paymentId, orderId, userName, userEmail }) => {
    const doc = new jsPDF();

    doc.text("Payment Receipt", 20, 20);
    doc.text(`Event Name: ${eventName}`, 20, 30);
    doc.text(`Amount: ${amount} INR`, 20, 40);
    doc.text(`Payment ID: ${paymentId}`, 20, 50);
    doc.text(`Name: ${userName}`, 20, 70);
    doc.text(`Email: ${userEmail}`, 20, 80);

    doc.save("receipt.pdf");
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  

  return (
    <div>
      <div className="container"><br></br>
        <h1 className="text-center"><u>Payment Details</u></h1>
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4 card-color">
              <img src={`http://localhost:8085/${event.event_public_image}`} width="150px" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8 card-color">
              <div class="card-body ">
                <h5 class="card-title">Name:{event.event_public_name}</h5>
                <h5 class="card-text">Date: {event.event_public_date}</h5>
                <h5 class="card-text">Venue: {event.event_venue}</h5><br></br>
                <h4 class="card-text">Payment Amount: <b>{event.event_public_amount}</b></h4>
                  <button id="pay-button" className="btn btn-primary" onClick={createOrder}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;
