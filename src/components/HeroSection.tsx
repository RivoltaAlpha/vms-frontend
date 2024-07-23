import React from 'react';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';

interface SlideProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Slide: React.FC<SlideProps> = ({ title, description, imageUrl }) => (
  <div className="relative h-screen">
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center" 
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-black opacity-50"></div>
    
    {/* Content */}
    <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p className="text-xl mb-8 max-w-2xl">{description}</p>
      <NavLink to={'/explore'}>
      <button className="bg-red-500 hover:bg-secondary text-white font-bold py-2 px-4 rounded">
        Explore
      </button>
      </NavLink>
    </div>
  </div>
);

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      <Slide
        title="Welcome to Our Vehicle Rental Service"
        description="Discover the best vehicles for your needs with our top-notch rental service. Convenient, affordable, and reliable."
        imageUrl='/images/car1.png'
      />
      <Slide
        title="Book Your Ride Easily"
        description="Effortlessly book your preferred vehicle online and enjoy a smooth and hassle-free rental experience."
        imageUrl='/images/car2.png'
      />
      <Slide
        title="Explore Our Fleet"
        description="Choose from a wide range of vehicles, from economy cars to luxury SUVs, all maintained to the highest standards."
        imageUrl='/images/car3.png'
      />
    </Slider>
  );
};

export default HeroSection;
