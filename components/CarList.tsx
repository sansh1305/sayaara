// components/CarList.tsx

import React from 'react';
import { CarProps } from '../types';

const CarList: React.FC<{ cars: CarProps[] }> = ({ cars }) => {
  return (
    <div>
      <h1>Car List</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <h2>{car.name}</h2>
            <p>Price: ${car.price}</p>
            {/* Add more details to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
