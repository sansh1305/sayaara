import React from 'react';
import { GetStaticProps } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import CarsPage from '../components/Cars';
import prisma from '../lib/prisma';
import { CarProps } from '../types';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const cars = await prisma.car.findMany({
      include: {
        images: true,
        postedBy: true,
        wishedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profileImage: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    const serializedCars = cars.map(car => ({
      ...car,
      price: car.price.toString(),
      createdAt: car.createdAt.toISOString(),
      updatedAt: car.updatedAt.toISOString(),
      postedBy: {
        ...car.postedBy,
        createdAt: car.postedBy.createdAt.toISOString(),
        updatedAt: car.postedBy.updatedAt.toISOString(),
      },
      wishedBy: car.wishedBy.map(user => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      })),
    }));

    return {
      props: { cars: serializedCars },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching cars:', error);
    return {
      props: { cars: [] },
      revalidate: 10,
    };
  } finally {
    await prisma.$disconnect();
  }
};

type Props = {
  cars: CarProps[];
};

const Index: React.FC<Props> = ({ cars }) => {
  return (
    <Layout>
      <Hero />
      <About />
      <CarsPage cars={cars} />
    </Layout>
  );
};

export default Index;
