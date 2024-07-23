import { useEffect } from 'react';
const CardsSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('translate-x-0', 'opacity-100');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach((card) => {
      observer.observe(card);
      card.classList.add('-translate-x-full', 'opacity-0', 'transition', 'duration-1000');
    });

    return () => observer.disconnect();
  }, []);


  return (
    <section className="py-28 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
        <p className="text-xl mb-12 text-center">
          Discover the range of services we offer to make your vehicle rental experience smooth and enjoyable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img src="/images/image copy 4.png" alt="Vehicle Booking" className="rounded mb-4 w-[700px] md:mb-0" />
        </div>
        <div className="flex flex-col  md:w-1/2 p-8 card justify-center">
          <h2 className="text-4xl font-bold mb-2">Vehicle Booking</h2>
          <p className='text-lg'>
          Book the vehicle of your choice easily and quickly through our seamless online booking system. Experience the convenience of booking your desired vehicle online with our user-friendly system. </p>
        </div>

        <div className="flex flex-col ml-[150px] md:w-1/2 p-8 card justify-center">
          <h2 className="text-4xl font-bold mb-2">Flexible Rental Plans</h2>
          <p className='text-lg'>
            Enjoy flexible rental plans that fit your schedule and budget. Whether you need a vehicle for a day or a month, we have you covered.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/image.png" alt="Flexible Rental Plans" className="rounded mb-4 w-[700px] md:mb-0" />
        </div>

        <div className="flex items-center justify-center">
          <img src="/images/image copy.png" alt="Customer Support" className="rounded mb-4 w-[700px] md:mb-0" />
        </div>
        <div className="flex flex-col ml-[150px] md:w-1/2 p-8 card justify-center">
          <h2 className="text-4xl  font-bold mb-2">Customer Support</h2>
          <p className='text-lg'>
          Our dedicated customer support team is available around the clock to assist you with any queries.  </p>
        </div>

        <div className="flex flex-col ml-[150px] md:w-1/2 p-8 card justify-center">
          <h2 className="text-4xl  font-bold mb-2"> Vehicles Maintenance</h2>
          <p className='text-lg'>We ensure all our vehicles are regularly maintained and in top condition for your safety and comfort.</p>
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/image copy 3.png" alt="Reliable Vehicles" className="rounded mb-4 w-[700px] md:mb-0" />
        </div>
        </div>
      </div>
    </section>
  );
};

export default CardsSection;

