import React from 'react';
import { GetStaticProps } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Products from '../components/Products';

const Index: React.FC = () => {

  return (
    <Layout>  
      <Hero />
      <Products />
    </Layout>
  );
};

export default Index;
