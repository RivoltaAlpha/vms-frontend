import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
      <p className="text-lg mb-8 text-center">
        Welcome to AniRent, where we offer<br/>
        <ul className="list-none font-bold list-inside">
         <li> ✓ highly reliable</li>
         <li> ✓ affordable</li>
         <li> ✓ convenient</li>
      <h2>...vehicle rental services</h2>
        </ul>
         <br/>
         We are committed to providing our customers with the best possible experience. We strive to offer top-quality vehicles at an
         vehicle rental services tailored to meet all your transportation needs.
         Discover why AniRent is the preferred choice for customers looking for top-quality vehicles and exceptional service.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img src="./images/car2.png" alt="Vehicle Booking" className="mb-4 w-[700px] md:mb-0" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Vehicle Booking</h2>
          <p>
            Experience a seamless booking process with AniRent. Choose from a wide range of vehicles to suit your needs and preferences.
          </p>
          <br/>
          <ul className="list-none list-inside">
            <li>✓ Easy online booking system</li>
            <li>✓ Wide selection of vehicles</li>
            <li>✓ Instant confirmation</li>
            <li>✓ Flexible pick-up and drop-off locations</li>
          </ul>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Flexible Rental Plans</h2>
          <p>
            Enjoy flexible rental plans that fit your schedule and budget. Whether you need a vehicle for a day or a month, we have you covered.
          </p>
          <br/>
          <ul className="list-none list-inside">
            <li>✓ Daily, weekly, and monthly plans</li>
            <li>✓ Competitive pricing</li>
            <li>✓ No hidden fees</li>
            <li>✓ Customizable rental periods</li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <img src="./images/car3.png" alt="Flexible Rental Plans" className="mb-4 w-[700px] md:mb-0" />
        </div>

        <div className="flex items-center justify-center">
          <img src="./images/contact.png" alt="Customer Support" className="mb-4 w-[700px] md:mb-0" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Customer Support</h2>
          <p>
            Our dedicated customer support team is here to assist you 24/7. We are committed to providing excellent service and support.
          </p>
          <br/>
          <ul className="list-none list-inside">
            <li>✓ 24/7 support via phone, email, and chat</li>
            <li>✓ Ticket-based support system</li>
            <li>✓ Comprehensive FAQ section</li>
            <li>✓ Quick resolution of issues</li>
          </ul>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Reliable Vehicles</h2>
          <p>
            Choose from a fleet of well-maintained, reliable vehicles. We ensure that every vehicle is in top condition for your safety and comfort.
          </p>
          <br/>
          <ul className=" list-none list-inside">
            <li>✓ Regular maintenance and inspections</li>
            <li>✓ Latest models with advanced features</li>
            <li>✓ Clean and sanitized vehicles</li>
            <li>✓ Roadside assistance included</li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <img src="./images/car1.png" alt="Reliable Vehicles" className="mb-4 w-[700px] md:mb-0" />
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose AniRent?</h2>
        <p className="text-lg mb-4">
          At AniRent, we prioritize your satisfaction and strive to provide the best rental experience. Our commitment to quality, affordability, and customer service sets us apart from the rest.
        </p>
        <p className="text-lg mb-4">
          Join the countless satisfied customers who trust AniRent for their transportation needs. Book your vehicle today and experience the AniRent difference!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
