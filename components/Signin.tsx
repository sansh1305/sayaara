// import React, { useEffect } from 'react';
// import { useSession, signIn, signOut } from 'next-auth/react';
// import Layout from './Layout';
import { CarProps } from '../types';
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from 'next/router';

// import { Button } from "./ui/button"
// import { Input } from "./ui/input"
// import { Label } from "./ui/label"

// import Cars from './Cars';
// import Header from './Header';

// import session from '../pages/api/auth/register'

type Props = {
    cars: CarProps[];
};

// const CarsPage: React.FC<Props> = ({ cars }) => {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     if (status === 'authenticated') {
//         router.push('/');
//     }

//     if (status === 'loading') {
//         return <h1 className="text-2xl font-semibold text-center mt-10">Loading... please wait</h1>;
//     }

//     // if (status === 'authenticated') {
//     //     return (
//     //         <Layout>
//     //             <Cars cars={cars} />
//     //         </Layout>
//     //     );
//     // }

//     return (
//         <Layout>
//             <div className="flex flex-col items-center justify-start text-white h-screen">
//                 <div className="w-full ">
//                     <Header />
//                     <div className="flex items-center justify-center py-12">
//                         <div className="mx-auto grid w-[350px] gap-6">
//                             <div className="grid gap-2 text-center">
//                                 <h1 className="text-3xl font-bold">Login</h1>
//                                 <p className="text-balance text-muted-foreground">
//                                     Login to your account using below options
//                                 </p>
//                             </div>
//                             <div className="grid gap-4">
//                                 {/* <div className="grid gap-2">
//                                     <Label htmlFor="email">Email</Label>
//                                     <Input
//                                         id="email"
//                                         type="email"
//                                         placeholder="m@example.com"
//                                         required
//                                         className='rounded-full placeholder:text-white/40'
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <div className="flex items-center">
//                                         <Label htmlFor="password">Password</Label>
//                                         <Link
//                                             href="/forgot-password"
//                                             className="ml-auto inline-block text-sm underline"
//                                         >
//                                             Forgot your password?
//                                         </Link>
//                                     </div>
//                                     <Input id="password" type="password" required className='rounded-full' />
//                                 </div>
//                                 <Button type="submit" className="w-full rounded-full bg-blue-500 text-white hover:bg-transparent hover:border hover:border-blue-500 hover:text-white transition-colors duration-200">
//                                     Login
//                                 </Button> */}
//                                 <Button variant="outline" className="w-full rounded-full hover:bg-black hover:text-white transition-colors duration-200" onClick={() => signIn('google')}>
//                                     <img className="h-5 w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google Logo" />
//                                     Login with Google
//                                 </Button>
//                                 <Button variant="outline" className="w-full rounded-full hover:bg-black hover:text-white transition-colors duration-200" onClick={() => signIn('facebook')}>
//                                     <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
//                                         <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.065 4.388 22.978 10.125 24v-8.56H7.078v-3.367H10.125V9.844c0-3.017 1.792-4.685 4.533-4.685 1.312 0 2.688.235 2.688.235v2.953h-1.513c-1.491 0-1.952.93-1.952 1.879v2.256h3.328l-.532 3.367h-2.796V24C19.612 22.978 24 18.065 24 12.073z" />
//                                     </svg>
//                                     Login with Facebook
//                                 </Button>
//                             </div>
//                             <div className="mt-4 text-center text-sm">
//                                 Don&apos;t have an account?{" "}
//                                 <Link href="/signup" className="underline">
//                                     Sign up
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//                 {/* <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mb-4" onClick={() => signIn('google')}>Sign in with Google</button> */}
//                 {/* <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800" onClick={() => signIn('facebook')}>Sign in with Facebook</button> */}
//             </div>
//         </Layout>
//     );
// };

// export default CarsPage;


'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import GoogleSignInButton from './GoogleSignInButton';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
});

const SignInForm: React.FC<Props> = ({ cars }) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        if (signInData?.error) {
            console.error(signInData.error);
            return;
        } else {
            router.push('/');
            console.log(signInData);
        }

        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-2'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='mail@example.com' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Enter your password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type='submit'>
                    Sign in
                </Button>
            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
            <p className='text-center text-sm text-gray-600 mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline' href='/signup'>
                    Sign up
                </Link>
            </p>
        </Form>
    );
};

export default SignInForm;