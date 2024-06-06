import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Layout from './Layout';
import { CarProps } from '../types';
import Image from "next/image"
import Link from "next/link"

import { Button } from "../@/components/ui/button"
import { Input } from "../@/components/ui/input"
import { Label } from "../@/components/ui/label"



type Props = {
    cars: CarProps[];
};

const CarsPage: React.FC<Props> = ({ cars }) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <h1 className="text-2xl font-semibold text-center mt-10">Loading... please wait</h1>;
    }

    if (status === 'authenticated') {
        return (
            <Layout>
                <div className="p-6 bg-white shadow-md rounded-md">
                    <h1 className="text-3xl font-bold mb-4">Hi {session.user?.name}</h1>
                    {session.user?.image && <img className="w-16 h-16 rounded-full mb-4" src={session.user.image} alt={`${session.user.name} photo`} />}
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => signOut()}>Sign out</button>
                </div>
                <h1 className="text-4xl font-bold mt-8 mb-4">Available Cars</h1>
                {cars.length === 0 ? (
                    <p className="text-lg">No cars available.</p>
                ) : (
                    <ul className="space-y-4">
                        {cars.map(car => (
                            <li key={car.id} className="p-4 bg-gray-100 rounded-md shadow-md">
                                <h2 className="text-2xl font-bold">{car.name}</h2>
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
            <div className="flex flex-col items-center mt-10">
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
                                        className='rounded-full'
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
                                <Button type="submit" className="w-full rounded-full bg-blue-500 text-white hover:bg-transparent hover:border hover:border-blue-500 hover:text-black transition-colors duration-200">
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
                                <Link href="#" className="underline">
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

// export const description =
//   "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

// export const iframeHeight = "800px"

// export const containerClassName = "w-full h-full p-4 lg:p-0"

// export default function Dashboard() {
//   return (
//     <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
//       <div className="flex items-center justify-center py-12">
//         <div className="mx-auto grid w-[350px] gap-6">
//           <div className="grid gap-2 text-center">
//             <h1 className="text-3xl font-bold">Login</h1>
//             <p className="text-balance text-muted-foreground">
//               Enter your email below to login to your account
//             </p>
//           </div>
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Password</Label>
//                 <Link
//                   href="/forgot-password"
//                   className="ml-auto inline-block text-sm underline"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>
//               <Input id="password" type="password" required />
//             </div>
//             <Button type="submit" className="w-full">
//               Login
//             </Button>
//             <Button variant="outline" className="w-full">
//               Login with Google
//             </Button>
//           </div>
//           <div className="mt-4 text-center text-sm">
//             Don&apos;t have an account?{" "}
//             <Link href="#" className="underline">
//               Sign up
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="hidden bg-muted lg:block">
//         <Image
//           src="/placeholder.svg"
//           alt="Image"
//           width="1920"
//           height="1080"
//           className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//         />
//       </div>
//     </div>
//   )
// }