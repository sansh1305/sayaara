import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Layout from './Layout';
import { CarProps } from '../types';
import Image from "next/image";
import Link from "next/link";

import { Button } from "../@/components/ui/button";
import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";
import Header from './Header';
import AlertModal from './AlertModal'; 

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../@/components/ui/tabs";
import { useRouter } from 'next/router';

type Props = {
    cars: CarProps[];
};

const CarsPage: React.FC<Props> = ({ cars }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dealer: 'no',
    });

    console.log('session:', session);
    console.log('formData:', formData)

    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [providerToSignUp, setProviderToSignUp] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Mock function to handle user registration, replace with actual API call
        const registerUser = async (userData: any) => {
            // Add your API call logic here
            console.log('User registered:', userData);
        };

        try {
            await registerUser(formData);
            setError('');
            console.log('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleOAuthSignUp = (provider: string) => {
        setProviderToSignUp(provider);
        setIsModalOpen(true);
    };

    const handleModalConfirm = async (isDealer: string) => {
        setIsModalOpen(false);
        setFormData(prevData => ({ ...prevData, dealer: isDealer }));

        if (providerToSignUp) {
            await signIn(providerToSignUp, { callbackUrl: '/' });
            setProviderToSignUp(null);
        }
    };

    if (status === 'loading') {
        return <h1 className="text-2xl font-semibold text-center mt-10">Loading... please wait</h1>;
    }

    if (status === 'authenticated') {
        router.push('/');
        console.log('session:', session);
    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-start text-white h-full ">
                <div className="w-full ">
                    <Header />
                    <div className="flex items-center justify-center py-12">
                        <div className="mx-auto grid w-[350px] gap-6">
                            <div className="grid gap-2 text-center">
                                <h1 className="text-3xl font-bold">Sign Up</h1>
                                <p className="text-balance text-muted-foreground">
                                    Enter your email below to create an account to your account
                                </p>
                            </div>
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        className='rounded-full placeholder:text-white/40'
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        className='rounded-full placeholder:text-white/40'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        className='rounded-full'
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    </div>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        className='rounded-full'
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="dealer">Are you a dealer?</Label>
                                    </div>
                                    <select
                                        id="dealer"
                                        className="rounded-full bg-transparent h-10 border border-white outline-none ring-0 p-2"
                                        value={formData.dealer}
                                        onChange={handleChange}
                                    >
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>

                                <Button type="submit" className="w-full rounded-full bg-blue-500 text-white hover:bg-transparent hover:border hover:border-blue-500 hover:text-white transition-colors duration-200">
                                    Sign Up
                                </Button>
                            </form>
                            <Button variant="outline" className="w-full rounded-full hover:bg-black hover:text-white transition-colors duration-200" onClick={() => handleOAuthSignUp('google')}>
                                <img className="h-5 w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google Logo" />
                                Sign Up with Google
                            </Button>
                            <Button variant="outline" className="w-full rounded-full hover:bg-black hover:text-white transition-colors duration-200" onClick={() => handleOAuthSignUp('facebook')}>
                                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                                    <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.065 4.388 22.978 10.125 24v-8.56H7.078v-3.367H10.125V9.844c0-3.017 1.792-4.685 4.533-4.685 1.312 0 2.688.235 2.688.235v2.953h-1.513c-1.491 0-1.952.93-1.952 1.879v2.256h3.328l-.532 3.367h-2.796V24C19.612 22.978 24 18.065 24 12.073z" />
                                </svg>
                                Sign Up with Facebook
                            </Button>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="underline">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AlertModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleModalConfirm} 
            />
        </Layout>
    );
};

export default CarsPage;
