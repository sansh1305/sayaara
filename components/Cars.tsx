import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { CarProps, City, Make, CarType, RegSpecs } from '../types';
import CarList from './CarList';
import Select from 'react-select';
import { Slider } from 'primereact/slider';

type Props = {
  cars: CarProps[];
};

const CarsPage: React.FC<Props> = ({ cars }) => {
  const { data: session, status } = useSession();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedMake, setSelectedMake] = useState<Make | null>(null);
  const [selectedType, setSelectedType] = useState<CarType | null>(null);
  const [selectedRegionalSpec, setSelectedRegionalSpec] = useState<RegSpecs | null>(null);
  const [selectedSeatingCapacity, setSelectedSeatingCapacity] = useState<number | null>(null);
  const [selectedAccidentHistory, setSelectedAccidentHistory] = useState<boolean | null>(null);
  const [selectedServiceHistory, setSelectedServiceHistory] = useState<boolean | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const filteredCars = (cars || []).filter(car =>
    (!selectedCity || car.city === selectedCity) &&
    (!selectedMake || car.make === selectedMake) &&
    (!selectedType || car.type === selectedType) &&
    (!selectedRegionalSpec || car.regSpecs === selectedRegionalSpec) &&
    (!selectedSeatingCapacity || car.capacity === selectedSeatingCapacity) &&
    (selectedAccidentHistory === null || car.accidentHistory === selectedAccidentHistory) &&
    (selectedServiceHistory === null || car.serviceHistory === selectedServiceHistory) &&
    (parseInt(car.price) >= priceRange[0] && parseInt(car.price) <= priceRange[1])
  );

  const clearFilters = () => {
    setSelectedCity(null);
    setSelectedMake(null);
    setSelectedType(null);
    setSelectedRegionalSpec(null);
    setSelectedSeatingCapacity(null);
    setSelectedAccidentHistory(null);
    setSelectedServiceHistory(null);
    setPriceRange([0, 100000]);
  };

  if (status === 'loading') {
    return <h1>Loading... please wait</h1>;
  }

  const cityOptions = Object.values(City).map(city => ({ value: city, label: city }));
  const makeOptions = Object.values(Make).map(make => ({ value: make, label: make }));
  const typeOptions = Object.values(CarType).map(type => ({ value: type, label: type }));
  const regionalSpecOptions = Object.values(RegSpecs).map(regSpec => ({ value: regSpec, label: regSpec }));
  const seatingCapacityOptions = [2, 4, 5, 6, 7].map(capacity => ({ value: capacity, label: `${capacity} Seats` }));
  const booleanOptions = [{ value: true, label: 'Yes' }, { value: false, label: 'No' }];

  return (
    <Layout>
      {/* Filters at the Top */}
      <div className='bg-gray-100 shadow-2xl p-4'>
        <div className="flex gap-4 flex-col items-center justify-center w-full">
          <div className='flex items-center justify-center flex-wrap gap-2 w-full'>
            <Select
              options={cityOptions}
              placeholder="City"
              value={cityOptions.find(option => option.value === selectedCity)}
              onChange={option => setSelectedCity(option?.value ?? null)}
              className="w-1/5 "
            />
            <Select
              options={makeOptions}
              placeholder="Make"
              value={makeOptions.find(option => option.value === selectedMake)}
              onChange={option => setSelectedMake(option?.value ?? null)}
              className="w-1/5 "
            />
            <Select
              options={typeOptions}
              placeholder="Type"
              value={typeOptions.find(option => option.value === selectedType)}
              onChange={option => setSelectedType(option?.value ?? null)}
              className="w-1/5 "
            />
            <Select
              options={regionalSpecOptions}
              placeholder="Regional Specs"
              value={regionalSpecOptions.find(option => option.value === selectedRegionalSpec)}
              onChange={option => setSelectedRegionalSpec(option?.value ?? null)}
              className="w-1/5 "
            />
            <Select
              options={seatingCapacityOptions}
              placeholder="Seating Capacity"
              value={seatingCapacityOptions.find(option => option.value === selectedSeatingCapacity)}
              onChange={option => setSelectedSeatingCapacity(option?.value ?? null)}
              className="w-1/5 "
            />
            <Select
              options={booleanOptions}
              placeholder="Accident History"
              value={booleanOptions.find(option => option.value === selectedAccidentHistory)}
              onChange={option => setSelectedAccidentHistory(option?.value ?? null)}
              className="w-1/5 "
            />
            <Select
              options={booleanOptions}
              placeholder="Service History"
              value={booleanOptions.find(option => option.value === selectedServiceHistory)}
              onChange={option => setSelectedServiceHistory(option?.value ?? null)}
              className="w-1/5 "
            />
          </div>

          <div className="w-1/5 flex flex-col ">
            <label className="font-semibold mb-1">Price Range</label>
            <Slider
              value={priceRange}
              onChange={(e) => setPriceRange(e.value as [number, number])}
              range
              min={0}
              max={100000}
              step={1000}
            />
            <div className="flex justify-between mt-2">
              <span>{priceRange[0]}</span>
              <span>{priceRange[1]}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className='p-4 text-xs text-black  mb-4'>
            <div className="flex flex-wrap gap-2">
              {selectedCity && (
                <span className="p-2 bg-gray-200 rounded-full">{selectedCity}</span>
              )}
              {selectedMake && (
                <span className="p-2 bg-gray-200 rounded-full">{selectedMake}</span>
              )}
              {selectedType && (
                <span className="p-2 bg-gray-200 rounded-full">{selectedType}</span>
              )}
              {selectedRegionalSpec && (
                <span className="p-2 bg-gray-200 rounded-full">{selectedRegionalSpec}</span>
              )}
              {selectedSeatingCapacity && (
                <span className="p-2 bg-gray-200 rounded-full">{selectedSeatingCapacity} Seats</span>
              )}
              {selectedAccidentHistory !== null && (
                <span className="p-2 bg-gray-200 rounded-full">{selectedAccidentHistory ? 'Accident History' : 'No Accident History'}</span>
              )}
              {selectedServiceHistory !== null && (
                <span className="p-2 bg-gray-200 rounded-full">{selectedServiceHistory ? 'Service History' : 'No Service History'}</span>
              )}
              {priceRange && (
                <span className="p-2 bg-gray-200 rounded-full">Price: {priceRange[0]} - {priceRange[1]}</span>
              )}
            </div>
          </div>
          <button
            className="px-4 py-2 text-gray-500 rounded-2xl hover:scale-110 transition-all duration-200"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Applied Filters */}
      <div className='bg-gray-100'>
        <CarList cars={filteredCars} />
      </div>

    </Layout>
  )

  return null;
}

export default CarsPage;
