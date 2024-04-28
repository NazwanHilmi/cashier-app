'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from './constant';
import { SidenavItem } from './types';
import { Icon } from '@iconify/react';
import Image from "next/image";
import AyahLogo from "/public/images/white-ayahcoding.png";
import { signOut, useSession } from 'next-auth/react';
import { CiLogout } from 'react-icons/ci';

const logout = async (token: string | undefined) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response;
    } catch (error: any) {
      return error.response;
    }
  };

const SideNav = () => {
      const { data: session, status } = useSession();
    
      const handleLogout = async () => {
          const response = await logout(session?.user.accessToken);
    
        if (response.status === 200) {
          signOut();
    
        } else {
          console.log(response.data?.message);
        }
      };

    return (
    <div className="md:w-60 bg-blue-dark h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-1 items-center justify-center md:justify-start md:px-6 h-12 w-full"
        >
          <Image
                src={AyahLogo}
                alt="Logo Ayah Coding"
                width={40}
                height={40}
                className="mr-2 sm:w-10 sm:h-10"
              />
          <span className="text-xl hidden md:flex text-white font-montserrat">Cashier</span>
        </Link>

        {status === "authenticated" && (
            <div className="flex flex-col space-y-2 md:px-4 ">
          {SIDENAV_ITEMS.map((item, id) => {
              return <MenuItem key={id} item={item} />;
          })}
            <div className="p-5 pt-2 pb-2 text-sm">
                <div
                    onClick={handleLogout}
                    className="flex gap-2 items-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer text-white hover:rounded-md">
                    <CiLogout size={18} />
                    <span>Logout</span>
                </div>
            </div>
        </div>
            )}
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SidenavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
       
            <>
                {item.submenu ? (
                    <>
                        <button
                            onClick={toggleSubMenu}
                            className={`flex flex-row items-center rounded-lg p-2 w-full justify-between hover:bg-zinc-400 ${
                                pathname.includes(item.path) ? '' : ''
                            }`}
                        >
                            <div className="flex flex-row space-x-4 items-center">
                                {item.icon}
                                <span className="font-semibold text-xl flex">{item.title}</span>
                            </div>

                            <div className={`${subMenuOpen ? 'rotate-180 ' : ''} flex`}>
                                <Icon icon="lucide:chevron-down" className='text-white' width="24" height="24" />
                            </div>
                        </button>

                        {subMenuOpen && (
                            <div className="py-2 pl-5 flex flex-col rounded-lg">
                                {item.subMenuItems?.map((subItem, idx) => {
                                    return (
                                        <Link
                                            key={idx}
                                            href={subItem.path}
                                            className={`${
                                                subItem.path === pathname ? 'flex items-center p-2 rounded-lg hover:bg-zinc-400' : 'flex items-center p-2 rounded-lg hover:bg-zinc-400'
                                            } `}
                                        >
                                            <span className='mr-2'>{subItem.icon}</span>
                                            <span>{subItem.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    <Link
                        href={item.path}
                        className={`flex flex-row space-x-4 items-center p-2 rounded-lg   ${
                            item.path === pathname ? 'hover:bg-zinc-400' : 'hover:bg-zinc-400'
                        }`}
                    >
                        {item.icon}
                        <span className="font-semibold text-xl flex">{item.title}</span>
                    </Link>
                )}
            </>
    </div>
    );
}