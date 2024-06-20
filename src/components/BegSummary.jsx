import { useSelector } from "react-redux";
import Modal from "./modal/Modal";
import React, { useState } from 'react'
// import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';



const BegSummary = () => {
  const bagItemIds = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  const finalItems = items.filter((item) => {
    const itemIndex = bagItemIds.indexOf(item.id);
    return itemIndex >= 0;
  });

  const CONVENIENCE_FEES = 99;
  let totalItem = bagItemIds.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  finalItems.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")


  const buyNow = async () => {
    // validation 
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }
    console.log(addressInfo)

    var options = {
      key: "rzp_test_BV4TlUSOZtXWuO",
      key_secret: "LUJ5A02OJHyskt6ziFHp1F8C",
      amount: parseInt(finalPayment  * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "VK-STORE",
      description: "for testing purpose",
      handler: function (response) {
        // console.log(response)
        // toast.success('Payment Successful')
        const paymentId = response.razorpay_payment_id
        // store in firebase 
        const orderInfo = {
           bagItemIds,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          // email: JSON.parse(localStorage.getItem("user")).user.email,
          // userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }

        // try {
        //   const result = addDoc(collection(fireDB, "finalPayment"), orderInfo)
        // } catch (error) {
        //   console.log(error)
        // }
      },

      theme: {
        color: "#3399cc"
      }


    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
  }


  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({totalItem} Items) </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>

      <Modal name={name} address={address} pincode={pincode} phoneNumber={phoneNumber} setName={setName} setAddress={setAddress} setPincode={setPincode} setPhoneNumber={setPhoneNumber} buyNow={buyNow} />
            
     
    </div>
  );
};

export default BegSummary;