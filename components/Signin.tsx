import React, {useEffect} from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Layout from './Layout';
import { CarProps } from '../types';
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router';

import { Button } from "../@/components/ui/button"
import { Input } from "../@/components/ui/input"
import { Label } from "../@/components/ui/label"

import Cars from './Cars';

type Props = {
    cars: CarProps[];
};

const CarsPage: React.FC<Props> = ({ cars }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <h1 className="text-2xl font-semibold text-center mt-10">Loading... please wait</h1>;
    }

    // if (status === 'authenticated') {
    //     return (
    //         <Layout>
    //             <Cars cars={cars} />
    //         </Layout>
    //     );
    // }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center text-white h-screen">
                <div className="w-full ">
                    <div className="flex items-center justify-center py-12">
                        <div className="mx-auto grid w-[350px] gap-6">
                            <div className="grid gap-2 text-center">
                                <h1 className="text-3xl font-bold">Login</h1>
                                <p className="text-balance text-muted-foreground">
                                    Enter your email below to login to your account
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        className='rounded-full placeholder:text-white/40'
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        {/* <Link
                                            href="/forgot-password"
                                            className="ml-auto inline-block text-sm underline"
                                        >
                                            Forgot your password?
                                        </Link> */}
                                    </div>
                                    <Input id="password" type="password" required className='rounded-full'/>
                                </div>
                                <Button type="submit" className="w-full rounded-full bg-blue-500 text-white hover:bg-transparent hover:border hover:border-blue-500 hover:text-white transition-colors duration-200">
                                    Login
                                </Button>
                                <Button variant="outline" className="w-full rounded-full hover:bg-black hover:text-white transition-colors duration-200" onClick={() => signIn('google')}>
                                    <img className="h-5 w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google Logo" />
                                    Login with Google
                                </Button>
                                <Button variant="outline" className="w-full rounded-full hover:bg-black hover:text-white transition-colors duration-200" onClick={() => signIn('facebook')}>
                                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                                        <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.065 4.388 22.978 10.125 24v-8.56H7.078v-3.367H10.125V9.844c0-3.017 1.792-4.685 4.533-4.685 1.312 0 2.688.235 2.688.235v2.953h-1.513c-1.491 0-1.952.93-1.952 1.879v2.256h3.328l-.532 3.367h-2.796V24C19.612 22.978 24 18.065 24 12.073z" />
                                    </svg>
                                    Login with Facebook
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mb-4" onClick={() => signIn('google')}>Sign in with Google</button> */}
                {/* <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800" onClick={() => signIn('facebook')}>Sign in with Facebook</button> */}
            </div>
        </Layout>
    );
};

export default CarsPage;

