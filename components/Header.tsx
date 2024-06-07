import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Sheet, SheetTrigger, SheetContent } from "../@/components/ui/sheet";
import { Button } from "../@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../@/components/ui/dropdown-menu"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../@/components/ui/tooltip"

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="flex md:items-center md:justify-center px-4 absolute md:relative right-0 md:left-0 ">
      <div className='flex h-20 rounded-full md:fixed md:top-4 shrink-0 items-center md:px-8 md:bg-black/50 '>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden rounded-xl text-white hover:outline-white outline-white border-white ">
              <MenuIcon className="h-6 w-6 text-white" />
              <span className="sr-only text-white">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white ">
            <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
              <div>
                <Image src="/logo.png" alt="logo" width={180} height={100} />
              </div>
            </Link>
            <div className="grid gap-2 py-6 ">
              <Link href="/" className="flex w-full items-center py-2 text-lg font-semibold rounded-xl" prefetch={false}>
                Home
              </Link>
              <Link href="/about" className="flex w-full items-center py-2 text-lg font-semibold rounded-xl" prefetch={false}>
                About
              </Link>
              <Link href="/dealer-login" className="flex w-full items-center py-2 text-lg font-semibold rounded-xl" prefetch={false}>
                Dealer Login
              </Link>
              {status === 'authenticated' ? (
                <div className="flex items-start gap-4 flex-col ">
                  <Link href="/profile" className="group inline-flex h-9 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors " prefetch={false}>
                    <div className='rounded-full border border-black/50'>
                      {session.user?.image && (
                        <Image
                          src={session.user.image}
                          alt={`${session.user.name} photo`}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )}
                    </div>
                  </Link>
                  <Button variant="outline" size="lg" className="rounded-full hover:bg-red-500 hover:text-white duration-200 transition-colors" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                  {/* <DropdownMenu>
                  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}

                </div>
              ) : (
                <Button variant="outline" size="lg" className="rounded-full hover:bg-blue-500 hover:text-white duration-200 transition-colors">
                  <Link
                    href="/signin"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
          <div>
            <Image src="/logo.png" alt="logo" width={130} height={130} />
          </div>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          <Link
            href="/"
            className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm text-gray-100 font-medium transition-colors hover:bg-white/40 hover:text-gray-200 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm text-gray-100 font-medium transition-colors hover:bg-white/40 hover:text-gray-200 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/dealer-login"
            className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm text-gray-100 font-medium transition-colors hover:bg-white/40 hover:text-gray-200 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Dealer Login
          </Link>
          {status === 'authenticated' ? (
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/profile" className="group inline-flex h-9 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors " prefetch={false}>
                      <div className='rounded-full border border-black/50'>
                        {session.user?.image && (
                          <Image
                            src={session.user.image}
                            alt={`${session.user.name} photo`}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        )}
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>



              {/* <span>{session.user?.name}</span> */}
              <Button variant="outline" size="lg" className="rounded-full text-white hover:bg-red-500 hover:text-white duration-200 transition-colors" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="lg" className="rounded-full hover:bg-blue-500 hover:text-white duration-200 transition-colors">
              <Link
                href="/signin"
                className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#fff"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line fill='white' x1="4" x2="20" y1="12" y2="12" />
      <line fill='white' x1="4" x2="20" y1="6" y2="6" />
      <line fill='white' x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
