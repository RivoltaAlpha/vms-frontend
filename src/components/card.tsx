interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
}

const Card = ({ title, description, imageUrl, buttonText }: CardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 flex">
      <div className="flex-shrink-0">
        <img className="h-60 w-[300px] object-cover" src={imageUrl} alt={title} />
      </div>
      <div className="p-8 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300 self-start">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export const CarCard = ({title, description, imageUrl, buttonText}:CardProps) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-60 w-[100px] object-cover md-w-full" src={imageUrl} alt={title} />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300">
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      );
      // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
}

export default Card;