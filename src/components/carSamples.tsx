interface CarSample {
    id: number;
    image: string;
    color: string;
    engineCapacity: string | number;
    fuelType: string;
    manufacturer: string;
    model: string;
    seatingCapacity: number;
    transmission: string;
    year: number;
    availability: string;
    rentalRate: number;
  }
  
  export const carSamples: CarSample[] = [
    {
      id: 1,
      image: "https://www.mustangspecs.com/wp-content/uploads/2020/05/2017_00020_01.jpg",
      color: "Red",
      engineCapacity: 5000,
      fuelType: "Petrol",
      manufacturer: "Ford",
      model: "Mustang",
      seatingCapacity: 4,
      transmission: "Automatic",
      year: 2021,
      availability: "Available",
      rentalRate: 6000.00
    },
    {
      id: 2,
      image: "https://i.pinimg.com/originals/ba/b4/7b/bab47b502a7aeaf024cd29faa6e4f5d7.jpg",
      color: "White",
      engineCapacity: 2300,
      fuelType: "Electric",
      manufacturer: "Tesla",
      model: "Model S",
      seatingCapacity: 5,
      transmission: "Automatic",
      year: 2022,
      availability: "Available",
      rentalRate: 6000.00
    },
    {
      id: 3,
      image: "https://i.ytimg.com/vi/-ywm5z46XCw/maxresdefault.jpg",
      color: "Blue",
      engineCapacity: 2,
      fuelType: "Gasoline",
      manufacturer: "BMW",
      model: "3 Series",
      seatingCapacity: 5,
      transmission: "Automatic",
      year: 2023,
      availability: "Available",
      rentalRate: 5000.00
    },
    {
      id: 4,
      image: "https://th.bing.com/th/id/R.f292348f0f183e960b130bd0d18832e2?rik=5vNxbE1n1FuClg&riu=http%3a%2f%2fi.imgur.com%2fQD9zZe2.jpg&ehk=eNzFUdoCR6XkX41YjFDlxnX9xiOljr77XbSoXrtF1Ow%3d&risl=&pid=ImgRaw&r=0",
      color: "Black",
      engineCapacity: 2,
      fuelType: "Gasoline",
      manufacturer: "BMW",
      model: "3 Series",
      seatingCapacity: 5,
      transmission: "Automatic",
      year: 2023,
      availability: "Available",
      rentalRate: 5000.00
    }
  ];


import React from 'react';
import { NavLink } from 'react-router-dom';

const CarSamplesComponent: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 px-4 py-8">
        <h1 className='text-5xl font-bold mb-4 ml-[45%] text-white'>Car Samples</h1>
    <div className="grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-4 gap-6">
      {carSamples.map(car => (
        <div key={car.id} className=" p-2 bg-gray-800 rounded ">
          <img src={car.image} alt={`${car.manufacturer} ${car.model}`} className="w-full h-60 object-cover mb-4" />
          <h3 className="font-bold">{car.manufacturer} {car.model}</h3>
          <p>Color: {car.color}</p>
          <p>Engine Capacity: {car.engineCapacity}</p>
          <p>Fuel Type: {car.fuelType}</p>
          <p className="font-bold mt-2">Rental Rate: ${car.rentalRate.toFixed(2)}</p>
          <NavLink to={'/explore'}> <button className="bg-cards text-white px-4 mt-10 ml-20 py-2 rounded">Book Now </button></NavLink>
        </div>
      ))}
    </div>
  </div>
  );
};

export default CarSamplesComponent;