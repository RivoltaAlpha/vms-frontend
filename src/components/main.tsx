import { useEffect } from 'react';
import Card from './card';

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

  const cardData = [
    {
      title: "Vehicle Booking",
      description: "Book the vehicle of your choice easily and quickly through our seamless online booking system.Experience the convenience of booking your desired vehicle online with our user-friendly system. Select from a diverse range of cars, SUVs, and trucks, all available at competitive rates. Our platform ensures a quick, secure, and seamless booking process.",
      imageUrl: "./images/bookCar.png",
      buttonText: "Explore Vehicles"
    },
    {
      title: "24/7 Customer Support",
      description: "Our dedicated customer support team is available around the clock to assist you with any queries.",
      imageUrl: "./images/Contact us-cuate.png",
      buttonText: "Contact Us"
    },
    {
      title: "Flexible Rental Plans",
      description: "Choose from a variety of rental plans that fit your schedule and budget.",
      imageUrl: "./images/management.png",
      buttonText: "View Plans"
    },
    {
      title: "Vehicle Maintenance",
      description: "We ensure all our vehicles are regularly maintained and in top condition for your safety and comfort.",
      imageUrl: "./images/Car rental-rafiki.png",
      buttonText: "Learn More"
    }
  ];

  return (
    <section className="py-28 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        <p className="text-xl mb-12">
          Discover the range of services we offer to make your vehicle rental experience smooth and enjoyable.
        </p>
        <div className="flex flex-col sm:grid-cols-1 gap-8">
          {cardData.map((card, index) => (
            <div key={index} className="card">
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsSection;