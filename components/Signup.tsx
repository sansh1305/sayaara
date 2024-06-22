// import React, { useState } from 'react';
// import { useSession, signIn, signOut } from 'next-auth/react';
// import Layout from './Layout';
import { CarProps } from '../types';
// import Image from "next/image";
// import Link from "next/link";

// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import Header from './Header';
// import AlertModal from './AlertModal';

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
// import { useRouter } from 'next/router';

// import session from '../pages/api/auth/register';

type Props = {
    cars: CarProps[];
};

// const CarsPage: React.FC<Props> = ({ cars }) => {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         dealer: 'no',
//     });

//     const [error, setError] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [providerToSignUp, setProviderToSignUp] = useState<string | null>(null);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { id, value } = e.target;
//         setFormData(prevData => ({ ...prevData, [id]: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (formData.password !== formData.confirmPassword) {
//             setError('Passwords do not match.');
//             return;
//         }

//         // API call to handle user registration
//         const registerUser = async (userData: any) => {
//             const response = await fetch('/api/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(userData)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to register user');
//             }

//             return response.json();
//         };

//         try {
//             await registerUser({
//                 name: formData.name,
//                 email: formData.email,
//                 password: formData.password,
//                 dealer: formData.dealer
//             });
//             setError('');
//             console.log('User registered successfully');
//             router.push('/'); // Redirect to the home page or any other page after successful registration
//         } catch (error) {
//             setError('Email already exists. Please try again.');
//             console.error('Error registering user:', error);
//         }
//     };

//     const handleOAuthSignUp = (provider: string) => {
//         setProviderToSignUp(provider);
//         setIsModalOpen(true);
//     };

//     const handleModalConfirm = async (isDealer: string) => {
//         setIsModalOpen(false);
//         setFormData(prevData => ({ ...prevData, dealer: isDealer }));

//         if (providerToSignUp) {
//             await signIn(providerToSignUp, { callbackUrl: '/' });
//             setProviderToSignUp(null);
//         }
//     };

//     if (status === 'loading') {
//         return <h1 className="text-2xl font-semibold text-center mt-10">Loading... please wait</h1>;
//     }

//     if (status === 'authenticated') {
//         router.push('/');
//         console.log('session:', session);
//     }

//     return (
//         <Layout>
//             <div className="flex flex-col items-center justify-start text-white h-screen">
//                 <div className="w-full">
//                     <Header />
//                     <div className="flex items-center justify-center py-12">
//                         <div className="mx-auto grid w-[350px] gap-6">
//                             <div className="grid gap-2 text-center">
//                                 <h1 className="text-3xl font-bold">Sign Up</h1>
//                                 <p className="text-balance text-muted-foreground">
//                                     Signup to your account using below options
//                                 </p>
//                             </div>
//                             {error && <p className="text-red-500 text-center">{error}</p>}
//                             <form onSubmit={handleSubmit} className="grid gap-4">
//                                 <div className="grid gap-2">
//                                     {/* <Label htmlFor="name">Name</Label> */}
//                                     <Input
//                                         id="name"
//                                         type="text"
//                                         placeholder="Name"
//                                         required
//                                         className="rounded-full placeholder:text-white/40"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     {/* <Label htmlFor="email">Email</Label> */}
//                                     <Input
//                                         id="email"
//                                         type="email"
//                                         placeholder="Email"
//                                         required
//                                         className="rounded-full placeholder:text-white/40"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <div className="flex items-center">
//                                         {/* <Label htmlFor="password">Password</Label> */}
//                                     </div>
//                                     <Input
//                                         id="password"
//                                         type="password"
//                                         required
//                                         placeholder='Password'
//                                         className="rounded-full placeholder:text-white/40"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <div className="flex items-center">
//                                         {/* <Label htmlFor="confirmPassword">Confirm Password</Label> */}
//                                     </div>
//                                     <Input
//                                         id="confirmPassword"
//                                         type="password"
//                                         required
//                                         placeholder='Confirm Password'
//                                         className="rounded-full placeholder:text-white/40"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                     />
//                                 </div>

//                                 <div className="grid gap-2">
//                                     <div className="flex items-center">
//                                         <Label htmlFor="dealer">Are you a dealer?</Label>
//                                     </div>
//                                     <select
//                                         id="dealer"
//                                         className="rounded-full bg-transparent h-10 border border-white outline-none ring-0 p-2"
//                                         value={formData.dealer}
//                                         onChange={handleChange}
//                                     >
//                                         <option value="yes">Yes</option>
//                                         <option value="no">No</option>
//                                     </select>
//                                 </div>

//                                 <Button type="submit" className="w-full rounded-full bg-blue-500 text-white hover:bg-transparent hover:border hover:border-blue-500 hover:text-white transition-colors duration-200">
//                                     Sign Up
//                                 </Button>
//                             </form>
//                             <Button variant="outline" className="w-full rounded-full hover:bg-black hover:text-white transition-colors duration-200" onClick={() => handleOAuthSignUp('google')}>
//                                 <img className="h-5 w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google Logo" />
//                                 Sign Up with Google
//                             </Button>
//                             <Button variant="outline" className="w-full rounded-full hover:bg-black hover:text-white transition-colors duration-200" onClick={() => handleOAuthSignUp('facebook')}>
//                                 <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
//                                     <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.065 4.388 22.978 10.125 24v-8.56H7.078v-3.367H10.125V9.844c0-3.017 1.792-4.685 4.533-4.685 1.312 0 2.688.235 2.688.235v2.953h-1.513c-1.491 0-1.952.93-1.952 1.879v2.256h3.328l-.532 3.367h-2.796V24C19.612 22.978 24 18.065 24 12.073z" />
//                                 </svg>
//                                 Sign Up with Facebook
//                             </Button>
//                             <div className="mt-4 text-center text-sm">
//                                 Already have an account?{" "}
//                                 <Link href="/login" className="underline">
//                                     Login
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <AlertModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onConfirm={handleModalConfirm}
//             />
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
import { useRouter } from 'next/router';

const FormSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        name: z.string().min(1, 'Name is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have than 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match',
    });

const SignUpForm: React.FC<Props> = ({ cars }) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                name: values.name,
                email: values.email,
                password: values.password,
            }),
        });
        console.log(response);

        if (response.ok) {
            router.push('/');
        } else {
            console.error('Failed to register user');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-2'>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder='johndoe' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='John Doe' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Re-Enter your password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Re-Enter your password'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type='submit'>
                    Sign up
                </Button>
            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
            <p className='text-center text-sm text-gray-600 mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline' href='/login'>
                    Sign in
                </Link>
            </p>
        </Form>
    );
};

export default SignUpForm;