
import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Layout from '../components/Layout';
import { CarProps, City, Make, CarType, RegSpecs } from '../types';
import CarList from './CarList';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../@/components/ui/accordion";
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
  const [showFilters, setShowFilters] = useState(false); // State to toggle the filter panel

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

  if (status === 'loading') {
    return <h1>Loading... please wait</h1>;
  }

  if (status === 'authenticated') {
    return (
      <Layout>

        {/* Mobile View */}
        <div className='flex bg-white min-h-screen md:hidden flex-col'>
          <div className='p-4 bg-white text-black shadow-2xl rounded-2xl'>
            <button
              className="md:hidden block"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            {showFilters && (
              <div className="mt-4 md:mt-0">
                <Accordion type="single" collapsible>
                  <AccordionItem value="city">
                    <AccordionTrigger>
                      <h3 className="font-semibold mb-2">City</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      {Object.values(City).map((city) => (
                        <div key={city} className="mb-1">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="city"
                              value={city}
                              onChange={() => setSelectedCity(city)}
                              checked={selectedCity === city}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2">{city}</span>
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="make">
                    <AccordionTrigger>
                      <h3 className="font-semibold mb-2">Make</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      {Object.values(Make).map((make) => (
                        <div key={make} className="mb-1">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="make"
                              value={make}
                              onChange={() => setSelectedMake(make)}
                              checked={selectedMake === make}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2">{make}</span>
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="type">
                    <AccordionTrigger>
                      <h3 className="font-semibold mb-2">Type</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      {Object.values(CarType).map((type) => (
                        <div key={type} className="mb-1">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="type"
                              value={type}
                              onChange={() => setSelectedType(type)}
                              checked={selectedType === type}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2">{type}</span>
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="regionalSpec">
                    <AccordionTrigger>
                      <h3 className="font-semibold mb-2">Regional Specs</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      {Object.values(RegSpecs).map((regionalSpec) => (
                        <div key={regionalSpec} className="mb-1">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="regionalSpec"
                              value={regionalSpec}
                              onChange={() => setSelectedRegionalSpec(regionalSpec)}
                              checked={selectedRegionalSpec === regionalSpec}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2">{regionalSpec}</span>
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="seatingCapacity">
                    <AccordionTrigger>
                      <h3 className="font-semibold mb-2">Seating Capacity</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      {[2, 4, 5, 6, 7].map((seatingCapacity) => (
                        <div key={seatingCapacity} className="mb-1">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="seatingCapacity"
                              value={seatingCapacity.toString()}
                              onChange={() => setSelectedSeatingCapacity(seatingCapacity)}
                              checked={selectedSeatingCapacity === seatingCapacity}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2">{seatingCapacity}</span>
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="accidentHistory">
                    <AccordionTrigger>
                      <h3 className="font-semibold mb-2">Accident History</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      {[true, false].map((accidentHistory) => (
                        <div key={accidentHistory.toString()} className="mb-1">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="accidentHistory"
                              value={accidentHistory.toString()}
                              onChange={() => setSelectedAccidentHistory(accidentHistory)}
                              checked={selectedAccidentHistory === accidentHistory}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2">{accidentHistory ? 'Yes' : 'No'}</span>
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="serviceHistory">
                    <AccordionTrigger>
                      <h3 className="font-semibold mb-2">Service History</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      {[true, false].map((serviceHistory) => (
                        <div key={serviceHistory.toString()} className="mb-1">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="serviceHistory"
                              value={serviceHistory.toString()}
                              onChange={() => setSelectedServiceHistory(serviceHistory)}
                              checked={selectedServiceHistory === serviceHistory}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2">{serviceHistory ? 'Yes' : 'No'}</span>
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="priceRange">
                    <AccordionTrigger>
                      <h3 className="font-semibold mb-2">Price Range</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Slider
                        value={priceRange}
                        onChange={(e) => Array.isArray(e.value) && setPriceRange(e.value)}
                        className="w-14rem h-5"
                        range
                        min={0}
                        max={100000}
                      />
                      <div className="flex justify-between mt-2">
                        <span>{priceRange[0]}</span>
                        <span>{priceRange[1]}</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="p-4 bg-gray-800 text-white shadow-2xl rounded-2xl mt-4">
                  <h3 className="font-semibold mb-2">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onChange={(e) => Array.isArray(e.value) && setPriceRange(e.value)}
                    className="w-full"
                    range
                    min={0}
                    max={100000}
                  />
                  <div className="flex justify-between mt-2">
                    <span>{priceRange[0]}</span>
                    <span>{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex-grow p-6 overflow-auto">
              <CarList cars={filteredCars} />
            </div>

          </div>
        </div>

        {/* Desktop View */}
        <div className='hidden md:flex items-center justify-center md:p-20 bg-white'>
          <div className='relative bg-white h-screen flex items-start justify-between w-full'>
            <div className=" md:w-72 p-4 bg-white text-black shadow-2xl rounded-2xl absolute top-6 left-4 ">
              <Accordion type="single" collapsible>
                <AccordionItem value="city">
                  <AccordionTrigger>
                    <h3 className="font-semibold mb-2">City</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.values(City).map((city) => (
                      <div key={city} className="mb-1">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="city"
                            value={city}
                            onChange={() => setSelectedCity(city)}
                            checked={selectedCity === city}
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2">{city}</span>
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="make">
                  <AccordionTrigger>
                    <h3 className="font-semibold mb-2">Make</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.values(Make).map((make) => (
                      <div key={make} className="mb-1">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="make"
                            value={make}
                            onChange={() => setSelectedMake(make)}
                            checked={selectedMake === make}
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2">{make}</span>
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="type">
                  <AccordionTrigger>
                    <h3 className="font-semibold mb-2">Type</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.values(CarType).map((type) => (
                      <div key={type} className="mb-1">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="type"
                            value={type}
                            onChange={() => setSelectedType(type)}
                            checked={selectedType === type}
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2">{type}</span>
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="regionalSpec">
                  <AccordionTrigger>
                    <h3 className="font-semibold mb-2">Regional Specs</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.values(RegSpecs).map((regionalSpec) => (
                      <div key={regionalSpec} className="mb-1">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="regionalSpec"
                            value={regionalSpec}
                            onChange={() => setSelectedRegionalSpec(regionalSpec)}
                            checked={selectedRegionalSpec === regionalSpec}
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2">{regionalSpec}</span>
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="seatingCapacity">
                  <AccordionTrigger>
                    <h3 className="font-semibold mb-2">Seating Capacity</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    {[2, 4, 5, 6, 7].map((seatingCapacity) => (
                      <div key={seatingCapacity} className="mb-1">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="seatingCapacity"
                            value={seatingCapacity.toString()}
                            onChange={() => setSelectedSeatingCapacity(seatingCapacity)}
                            checked={selectedSeatingCapacity === seatingCapacity}
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2">{seatingCapacity}</span>
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="accidentHistory">
                  <AccordionTrigger>
                    <h3 className="font-semibold mb-2">Accident History</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    {[true, false].map((accidentHistory) => (
                      <div key={accidentHistory.toString()} className="mb-1">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="accidentHistory"
                            value={accidentHistory.toString()}
                            onChange={() => setSelectedAccidentHistory(accidentHistory)}
                            checked={selectedAccidentHistory === accidentHistory}
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2">{accidentHistory ? 'Yes' : 'No'}</span>
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="serviceHistory">
                  <AccordionTrigger>
                    <h3 className="font-semibold mb-2">Service History</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    {[true, false].map((serviceHistory) => (
                      <div key={serviceHistory.toString()} className="mb-1">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="serviceHistory"
                            value={serviceHistory.toString()}
                            onChange={() => setSelectedServiceHistory(serviceHistory)}
                            checked={selectedServiceHistory === serviceHistory}
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2">{serviceHistory ? 'Yes' : 'No'}</span>
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="priceRange">
                  <AccordionTrigger>
                    <h3 className="font-semibold mb-2">Price Range</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      value={priceRange}
                      onChange={(e) => Array.isArray(e.value) && setPriceRange(e.value)}
                      className="w-14rem h-5"
                      range
                      min={0}
                      max={100000}
                    />
                    <div className="flex justify-between mt-2">
                      <span>{priceRange[0]}</span>
                      <span>{priceRange[1]}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="flex-grow p-6">
              <CarList cars={filteredCars} />
            </div>
          </div>
        </div>

      </Layout>
    );
  }

  return (
    <Layout>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </Layout>
  );
};

export default CarsPage;
