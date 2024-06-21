import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/user/${session?.user?.email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          setError('Error fetching user data');
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, session, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <Layout>
      <div className="profile-page">
        <h1>Profile</h1>
        <div className="profile-info">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          {userData.profileImage && <img src={userData.profileImage} alt="Profile picture" />}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
