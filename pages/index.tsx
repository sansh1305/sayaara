import React from 'react';
import { GetStaticProps } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

const Index: React.FC = () => {

  return (
    <Layout>
      <Hero />
    </Layout>
  );
};

export default Index;
