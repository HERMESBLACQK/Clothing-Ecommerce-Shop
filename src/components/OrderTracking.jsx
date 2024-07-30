import React, { useEffect } from 'react';
import axios from 'axios';
import '../styles/OrderTracking.css';

const OrderTracking = ({ currentStatus }) => {
  useEffect(() => {
    if (currentStatus) {
      console.log('Current Order Status:', currentStatus);
    }
  }, [currentStatus]);

  const getStatusClass = (status) => {
    if (currentStatus === 'Ordered' && status === 'Ordered') return 'completed Ordered';
    if (currentStatus === 'Processing' && (status === 'Ordered' || status === 'Processing')) return 'completed Processing';
    if (currentStatus === 'Shipping' && (status === 'Ordered' || status === 'Processing' || status === 'Shipping')) return 'completed Shipping';
    if (currentStatus === 'Pickup Station' && (status === 'Ordered' || status === 'Processing' || status === 'Shipping' || status === 'Pickup Station')) return 'completed Pickup';
    if (currentStatus === 'Delivered' && (status === 'Ordered' || status === 'Processing' || status === 'Shipping' || status === 'Pickup Station' || status === 'Delivered')) return 'completed Delivered';
    return '';
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-10 hh-grayBox ">
          <div className="row justify-between flex max-sm:grid max-sm:grid-cols-2  max-sm:gap-2">
            <div className={`order-tracking ${getStatusClass('Ordered')}`}>
              <span className="is-complete"></span>
              <p>
                Ordered<br />
                <span>Mon, June 24</span>
              </p>
            </div>
            <div className={`order-tracking ${getStatusClass('Processing')}`}>
              <span className="is-complete"></span>
              <p>
                Processing<br />
                <span>Tue, June 25</span>
              </p>
            </div>
            <div className={`order-tracking ${getStatusClass('Shipping')}`}>
              <span className="is-complete"></span>
              <p>
                Shipped<br />
                <span>Tue, June 25</span>
              </p>
            </div>
            <div className={`order-tracking ${getStatusClass('Pickup Station')}`}>
              <span className="is-complete"></span>
              <p>
                Pickup Station<br />
                <span>Tue, June 25</span>
              </p>
            </div>
            <div className={`order-tracking ${getStatusClass('Delivered')}`}>
              <span className="is-complete"></span>
              <p>
                Delivered<br />
                <span>Fri, June 28</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 m-auto">
        <p className='text-xl font-bold italic mr-3'>Delivery Address</p>
    <p className=' font-extrabold text-lg italic'>Street: <span className='text-m font-semibold italic'>Apt 104</span> Region: <span className='text-m font-semibold italic'>Ikeja</span> State: <span className='text-m font-semibold italic'>Lagos</span></p>
      </div>
      {/* <div className="p-2 absolute bg-white border ml-36">
        <p>Expected Day of Delivery</p>
        <p></p>
      </div> */}
    </div>
  );
};

export default OrderTracking;
