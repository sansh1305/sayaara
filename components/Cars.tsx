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

import { Label } from "../@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "../@/components/ui/radio-group"


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

                  <AccordionItem value="priceRange" className=''>
                    <AccordionTrigger>
                      <h3 className="font-semibold mb-2">Price Range</h3>
                    </AccordionTrigger>
                    <AccordionContent className='bg-gray-800 text-white p-5 rounded-2xl'>
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>

          {/* Applied Filters */}
          <div className='p-4 text-xs bg-white text-black shadow-2xl rounded-2xl mt-4'>
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
              <button
                className="px-4 text-xs py-2 text-gray-500 rounded-2xl ml-2 flex items-center justify-center gap-1 hover:scale-110 transition-all duration-200"
                onClick={clearFilters}
              >
                Clear Filters
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>

              </button>
            </div>
          </div>

          <CarList cars={filteredCars} />
        </div>
        {/* End of Mobile View */}

        {/* Desktop View */}
        <div className='hidden md:flex bg-white min-h-screen'>
          <div className='p-10 w-1/4 bg-white text-black shadow-2xl'>
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
                          className="form-radio h-4 w-4 peer"
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
                <AccordionContent className='bg-gray-800 text-white p-5 rounded-2xl'>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className='p-4 w-3/4'>
            {/* Applied Filters */}
            <div className='p-4 text-xs bg-white text-black shadow-2xl rounded-2xl mb-4'>
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
                <button
                  className="px-4 text-xs py-2 text-gray-500 rounded-2xl ml-2 flex items-center justify-center gap-1 hover:scale-110 transition-all duration-200"
                  onClick={clearFilters}
                >
                  Clear Filters
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>

                </button>
              </div>
            </div>
            <CarList cars={filteredCars} />
          </div>
        </div>
        {/* End of Desktop View */}
      </Layout>
    )
  }
}
export default CarsPage