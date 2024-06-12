import React from 'react';
import { CarProps } from '../types';
import Image from 'next/image';

type CarCardProps = {
    car: CarProps;
};

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const imageUrl = car.images && car.images[0] ? car.images[0].url : '/cars-default.png';

    return (
        <div className="border rounded-2xl overflow-hidden shadow-lg p-6 m-4">
            <div className="relative pb-2/3 w-60 h-60">
                <Image
                    src={imageUrl}
                    alt={car.make}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="mt-4 flex items-start justify-center flex-col gap-4">
                <div className='flex items-center justify-between w-full text-lg font-semibold'>
                    <div>
                        {car.year} {car.make}
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                </div>

                <p className="">
                    <strong>
                        {car.price}
                    </strong>
                    {" "}
                    AED
                </p>


                <p className="text-gray-500 text-sm flex items-center justify-start gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>

                    {car.city}, UAE
                </p>
            </div>
        </div>
    );
};

export default CarCard;
