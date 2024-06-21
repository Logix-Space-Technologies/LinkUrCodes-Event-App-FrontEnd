import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const UserPayment = () => {
  const location = useLocation();
  const event = location.state?.event;
  const [razorpayKey, setRazorpayKey] = useState('');
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("userid");
  const [orderId, setOrderId] = useState('');

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
      // Cleanup: Remove the Razorpay script when component unmounts
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

      const { order_id, amount, currency } = response.data;
      setOrderId(order_id); // Store order ID in state

      const options = {
        key: razorpayKey,
        amount: amount.toString(),
        currency: currency,
        name: 'Link Ur Codes',
        description: `Pay for ${event.event_public_name}`,
        image: '',
        order_id: order_id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post('http://localhost:8085/api/payment/paymentCapture', {
              razorpay_order_id: order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature, // Include the signature in the payload
            });

            if (verifyResponse.data.success) {
              alert('Payment has been verified');
              navigate('/payment-success'); // Redirect to success page
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          contact: '9876543210',
          name: 'Twinkle Sharma',
          email: 'smtwinkle@gmail.com',
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

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Payment Details for {event.event_public_name}</h2>
      <h3>Payment Amount: {event.event_public_amount}</h3>
      <button id="pay-button" onClick={createOrder}>Pay Now</button>
    </div>
  );
};

export default UserPayment;






















// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import UserNavBar from "./UserNavBar";
// // import { useLocation } from "react-router-dom";

// // function UserPayment() {
// //     const [razorpayKey, setRazorpayKey] = useState(null);
// //     const location = useLocation();
// //     const { event_public_id, event_public_amount } = location.state;
// //     const [user, setUser] = useState(null); // State to hold user information

// //     useEffect(() => {
// //         async function fetchRazorpayKey() {
// //             try {
// //                 const response = await axios.get("http://localhost:8085/api/payment/razorpay-key");
// //                 setRazorpayKey(response.data.key);
// //             } catch (error) {
// //                 console.error('Failed to fetch Razorpay key:', error);
// //                 alert("Failed to fetch Razorpay key.");
// //             }
// //         }

// //         async function fetchUserData() {
// //             try {
// //                 // Example: Fetch user data from your backend or session storage
// //                 const token = sessionStorage.getItem('token');
// //                 const response = await axios.get("http://localhost:8085/api/user/profile", {
// //                     headers: {
// //                         'Authorization': `Bearer ${token}`
// //                     }
// //                 });
// //                 setUser(response.data); // Set user details in state
// //             } catch (error) {
// //                 console.error('Failed to fetch user data:', error);
// //                 // Handle error or redirect to login if user not authenticated
// //             }
// //         }

// //         fetchRazorpayKey();
// //         fetchUserData();
// //     }, []);

// //     async function loadScript(src) {
// //         return new Promise((resolve, reject) => {
// //             const script = document.createElement("script");
// //             script.src = src;
// //             script.onload = () => resolve(true);
// //             script.onerror = () => reject(new Error('Failed to load script'));
// //             document.body.appendChild(script);
// //         });
// //     }

// //     async function displayRazorpay() {
// //         if (!razorpayKey) {
// //             alert("Razorpay key not loaded. Please try again later.");
// //             return;
// //         }

// //         try {
// //             const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

// //             if (!res) {
// //                 alert("Razorpay SDK failed to load. Are you online?");
// //                 return;
// //             }

// //             const result = await axios.post("http://localhost:8085/api/payment/create-order", {
// //                 event_public_id,
// //                 payment_amount: event_public_amount.toString(), // Convert to string if needed
// //                 currency: "INR",
// //                 user_id: user ? user.user_id : null // Pass user_id from state if available
// //             });

// //             if (!result.data.success) {
// //                 alert("Server error. Are you online?");
// //                 return;
// //             }

// //             const { amount, order_id, currency } = result.data;

// //             const options = {
// //                 key: razorpayKey,
// //                 amount: amount.toString(),
// //                 currency: currency,
// //                 name: "Link Ur Codes",
// //                 description: "Test Transaction",
// //                 order_id: order_id,
// //                 handler: async function (response) {
// //                     const data = {
// //                         razorpay_order_id: response.razorpay_order_id,
// //                         razorpay_payment_id: response.razorpay_payment_id,
// //                         razorpay_signature: response.razorpay_signature,
// //                     };

// //                     const captureResult = await axios.post("http://localhost:8085/api/payment/paymentCapture", data);

// //                     alert(captureResult.data.msg || 'Payment successful!');
// //                 },
// //                 prefill: {
// //                     name: user ? user.name : "Your Name",
// //                     email: user ? user.email : "your-email@example.com",
// //                     contact: user ? user.contact : "9999999999",
// //                 },
// //                 notes: {
// //                     address: "Your Company Address",
// //                 },
// //                 theme: {
// //                     color: "#61dafb",
// //                 },
                
// //             };

// //             const paymentObject = new window.Razorpay(options);
// //             paymentObject.open();

// //         } catch (error) {
// //             console.error('Error in displayRazorpay:', error);
// //             alert("Failed to initiate payment.");
// //         }
// //     }

// //     // if (!user) {
// //     //     return (
// //     //         <div>Loading user data...</div>
// //     //     );
// //     // }

// //     return (
// //         <div>
// //             <UserNavBar/>
// //             <div className="container"><br/><br/><br/><br/><br/>
// //                 <center>
// //                     <div className="row">
// //                         <div className="col col-12">
// //                             <h2>Pay for the event to register</h2>
// //                             <p>Event ID: {event_public_id}</p>
// //                             <p>Amount: {event_public_amount}</p>
// //                             <button className="btn btn-primary" onClick={displayRazorpay}>
// //                                 Pay Now
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </center>
// //             </div>
// //         </div>
// //     );
// // }

// // export default UserPayment;











// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import UserNavBar from "./UserNavBar";

// function UserPayment() {
//     const [razorpayKey, setRazorpayKey] = useState(null);

//     useEffect(() => {
//         async function fetchRazorpayKey() {
//             try {
//                 const response = await axios.get("http://localhost:8085/api/payment/razorpay-key");
//                 setRazorpayKey(response.data.key);
//             } catch (error) {
//                 console.error('Failed to fetch Razorpay key:', error);
//                 alert("Failed to fetch Razorpay key.");
//             }
//         }
//         fetchRazorpayKey();
//     }, []);

//     async function loadScript(src) {
//         return new Promise((resolve, reject) => {
//             const script = document.createElement("script");
//             script.src = src;
//             script.onload = () => resolve(true);
//             script.onerror = () => reject(new Error('Failed to load script'));
//             document.body.appendChild(script);
//         });
//     }

//     async function displayRazorpay() {
//         if (!razorpayKey) {
//             alert("Razorpay key not loaded. Please try again later.");
//             return;
//         }

//         try {
//             const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//             if (!res) {
//                 alert("Razorpay SDK failed to load. Are you online?");
//                 return;
//             }

//             const result = await axios.post("http://localhost:8085/api/payment/create-order", {
//                 event_public_id: "your_event_public_id",
//                 payment_amount: "500",
//                 currency: "INR",
//                 user_id: "your_user_id"
//             });

//             if (!result.data.success) {
//                 alert("Server error. Are you online?");
//                 return;
//             }

//             const { amount, order_id, currency } = result.data;

//             const options = {
//                 key: razorpayKey,
//                 amount: amount.toString(),
//                 currency: currency,
//                 name: "Link Ur Codes",
//                 description: "Test Transaction",
//                 order_id: order_id,
//                 handler: async function (response) {
//                     const data = {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                     };

//                     const captureResult = await axios.post("http://localhost:8085/api/payment/capture-payment", data);

//                     alert(captureResult.data.msg || 'Payment successful!');
//                 },
//                 prefill: {
//                     name: "Your Name",
//                     email: "your-email@example.com",
//                     contact: "9999999999",
//                 },
//                 notes: {
//                     address: "Your Company Address",
//                 },
//                 theme: {
//                     color: "#61dafb",
//                 },
                
//             };

//             const paymentObject = new window.Razorpay(options);
//             paymentObject.open();

//         } catch (error) {
//             console.error('Error in displayRazorpay:', error);
//             alert("Failed to initiate payment.");
//         }
//     }

//     return (
//       <div>
//         <UserNavBar/>
//         <div className="container"><br></br><br></br><br></br><br></br><br></br>
//           <center>
//             <div className="row">
//               <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
//                 <p><h2>Pay for the event to register</h2></p>
//                 <button className="btn btn-primary"  onClick={displayRazorpay}>
//                     Pay Now
//                 </button>
//                 </div>
//             </div>
//             </center>
//         </div>
//         </div>
//     );
// }

// export default UserPayment;
