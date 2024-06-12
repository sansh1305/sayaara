import React from 'react';
import { CarProps } from '../types';
import CarCard from './CarCard';

type CarListProps = {
  cars: CarProps[];
};

const CarList: React.FC<CarListProps> = ({ cars }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
