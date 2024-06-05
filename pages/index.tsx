import React from 'react';
import { GetStaticProps } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Layout from '../components/Layout';
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

const CarsPage: React.FC<Props> = ({ cars }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h1>Loading... please wait</h1>;
  }

  if (status === 'authenticated') {
    return (
      <Layout>
        <div>
          <h1>Hi {session.user?.name}</h1>
          {session.user?.image && <img src={session.user.image} alt={`${session.user.name} photo`} />}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        <h1>Available Cars</h1>
        {cars.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          <ul>
            {cars.map(car => (
              <li key={car.id}>
                <h2>{car.name}</h2>
                <p>Price: {car.price}</p>
                <p>Type: {car.type}</p>
                <p>Year: {car.year}</p>
                <p>Mileage: {car.mileage}</p>
                <p>City: {car.city}</p>
                <p>Posted by: {car.postedBy.name}</p>
                {/* Render other car details and images */}
              </li>
            ))}
          </ul>
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('facebook')}>Sign in with Facebook</button>
    </Layout>
  );
};

export default CarsPage;
