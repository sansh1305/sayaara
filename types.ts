// types.ts

export type CarProps = {
  id: string;
  name: string;
  price: string; // Changed to string for serialization
  type: CarType;
  year: number;
  regSpecs: RegSpecs;
  make: Make;
  mileage: number;
  city: City;
  images: CarImageProps[];
  contactPhone?: string;
  capacity: number;
  serviceHistory: boolean;
  accidentHistory: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  postedBy: UserProps;
  postedById: string;
  wishedBy: UserProps[];
};

export type CarImageProps = {
  id: string;
  url: string;
};

export type UserProps = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
  wishlist: CarProps[];
  postedCars: CarProps[];
  role: UserRole;
  dealerInfo?: DealerInfoProps;
};

export type DealerInfoProps = {
  id: string;
  user: UserProps;
  userId: string;
  companyName: string;
  website?: string;
  established?: number;
};

export enum UserRole {
  USER = 'USER',
  DEALER = 'DEALER',
  ADMIN = 'ADMIN',
}

export enum CarType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  HATCHBACK = 'HATCHBACK',
  COUPE = 'COUPE',
  CONVERTIBLE = 'CONVERTIBLE',
  LUXURY = 'LUXURY',
  TRUCK = 'TRUCK',
}

export enum RegSpecs {
  GCC = 'GCC',
  AMERICAN = 'AMERICAN',
  EUROPEAN = 'EUROPEAN',
  JAPANESE = 'JAPANESE',
  CHINESE = 'CHINESE',
  CANADIAN = 'CANADIAN',
}

export enum City {
  ABU_DHABI = 'ABU_DHABI',
  SHARJAH = 'SHARJAH',
  DUBAI = 'DUBAI',
  AJMAN = 'AJMAN',
  AL_AIN = 'AL_AIN',
  RIYADH = 'RIYADH',
  JEDDAH = 'JEDDAH',
  DOHA = 'DOHA',
}

export enum Make {
  TOYOTA = 'TOYOTA',
  MITSUBISHI = 'MITSUBISHI',
  NISSAN = 'NISSAN',
  HYUNDAI = 'HYUNDAI',
  FORD = 'FORD',
  HONDA = 'HONDA',
  CHEVROLET = 'CHEVROLET',
  VOLKSWAGEN = 'VOLKSWAGEN',
  JEEP = 'JEEP',
  KIA = 'KIA',
  JETOUR = 'JETOUR',
  LOTUS = 'LOTUS',
  LAND_ROVER = 'LAND_ROVER',
  LINCOLN = 'LINCOLN',
  LEXUS = 'LEXUS',
  MAXUS = 'MAXUS',
  MASERATI = 'MASERATI',
  MAZDA = 'MAZDA',
  MCLAREN = 'MCLAREN',
  MINI = 'MINI',
  OPEL = 'OPEL',
  DODGE = 'DODGE',
  DEVEL = 'DEVEL',
  CHANGAN = 'CHANGAN',
  CHRYSLER = 'CHRYSLER',
  ASTON_MARTIN = 'ASTON_MARTIN',
  CADILLAC = 'CADILLAC',
  BORGWARD = 'BORGWARD',
  BYD = 'BYD',
  ABARTH = 'ABARTH',
  ALFA_ROMEO = 'ALFA_ROMEO',
  GMC = 'GMC',
  GENESIS = 'GENESIS',
  ISUZU = 'ISUZU',
  INFINITI = 'INFINITI',
  HAVAL = 'HAVAL',
  FOTON = 'FOTON',
  PEUGEOT = 'PEUGEOT',
}
