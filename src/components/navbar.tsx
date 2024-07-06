import React from 'react';
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
        <button className="bg-yellow-600 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          READ MORE
        </button>
      </div>
      
      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button className="bg-yellow-500 text-white p-4 rounded-r">
          {'<'}
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button className="bg-yellow-500 text-white p-4 rounded-l">
          {'>'}
        </button>
      </div>
    </div>
  );

const HeroSection: React.FC = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      // customPaging: (i: number) => (
      //   <div className="w-3 h-3 bg-black bg-opacity-500 rounded-full mx-1"></div>
      // ),
    };

  return (
    <Slider {...settings}>
      <Slide
        title="Who we are"
        description="Cyber eyes networks its a startup founded by young innovators looking to help in bridging students in cyber security majorly and other tech stacks looking forward to skilling together."
        imageUrl='./src/assets/image1.jpg'
      />
      <Slide
        title="Vision"
        description=" To be the premier technical computer security collective in the region."
        imageUrl='./src/assets/image2.jpg'
      />
            <Slide
        title="Mission"
        description="With core values deeply rooted in cybersecurity excellence, coding innovation, and community empowerment, Cyber Eyes Networks emerged as a technology hub that brings a unique blend of expertise, creativity, and a steadfast commitment to ethical practices. "
        imageUrl='./src/assets/image1.jpg'
      />
    </Slider>
  );
};

export default HeroSection;