import React from 'react';
import { GetStaticProps } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Layout from '../components/Layout';

const Index: React.FC = () => {

  return (
    <Layout>
      Hero
    </Layout>
  );
};

export default Index;
