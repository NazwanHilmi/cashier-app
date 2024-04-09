"use client";

import axios from "axios";
import React, { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import { FaTableCellsLarge, FaTag, FaCartShopping } from "react-icons/fa6";
import { FaShoppingBag, FaProductHunt, FaClipboardList } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import AyahLogo from "/public/images/white-ayahcoding.png";
import { signOut, useSession } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import Head from "next/head";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

type MenuItem = {
  name: ReactElement | string;
  icon: ReactElement | null;
  link: string;
  isActive: boolean;
};

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
    return error.resp;
  }
};

const menu1: MenuItem[] = [
  {
    name: <h1>Dashboard</h1>,
    icon: <MdDashboard size={18} className="text-white" />,
    link: "/",
    isActive: false,
  },
  {
    name: <h1>Kategori</h1>,
    icon: <FaTag size={18} className="text-white" />,
    link: "/data/category",
    isActive: false,
  },
  {
    name: <h1>Jenis</h1>,
    icon: <BiSolidFoodMenu size={18} className="text-white" />,
    link: "/data/type",
    isActive: false,
  },
  {
    name: <h1>Menu</h1>,
    icon: <FaCartShopping size={18} className="text-white" />,
    link: "/data/menu",
    isActive: false,
  },
  {
    name: <h1>Stok</h1>,
    icon: <AiOutlineStock size={18} className="text-white" />,
    link: "/data/stok",
    isActive: false,
  },
  {
    name: <h1>Customer</h1>,
    icon: <FaTableCellsLarge size={18} className="text-white" />,
    link: "/data/customer",
    isActive: false,
  },
  {
    name: <h1>Laporan Transaksi</h1>,
    icon: <FaTableCellsLarge size={18} className="text-white" />,
    link: "/data/listTransaksi",
    isActive: false,
  },
  {
    name: <h1>Laporan Detail Transaksi</h1>,
    icon: <FaTableCellsLarge size={18} className="text-white" />,
    link: "/data/listDetailTransaksi",
    isActive: false,
  },
  {
    name: <h1>Produk Titipan</h1>,
    icon: <FaProductHunt size={18} className="text-white" />,
    link: "/data/products",
    isActive: false,
  },
];

const menu2: MenuItem[] = [
  {
    name: <h1>Transaksi</h1>,
    icon: <FaShoppingBag size={18} className="text-white" />,
    link: "/applications/transaction",
    isActive: false,
  },
  {
    name: <h1>Karyawan</h1>,
    icon: <BsFillPeopleFill size={18} className="text-white" />,
    link: "/data/karyawan",
    isActive: false,
  },
  {
    name: <h1>Absensi</h1>,
    icon: <FaClipboardList size={18} className="text-white" />,
    link: "/data/absensi",
    isActive: false,
  },
  {
    name: <h1>Tentang</h1>,
    icon: <FiAlertCircle size={18} className="text-white" />,
    link: "/about",
    isActive: false,
  },
];

const MainHeader = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    const response = await logout(session?.user.accessToken);

    if (response.status === 200) {
      signOut();

    } else {
      console.error(response.data?.message);
    }
  };
  return (
    <div>
      {status === "authenticated" && (
        <div className="shadow-lg">
          <section className="sticky-sidebar w-20 md:w-64 bg-blue-dark h-screen shadow-black shadow">
            <div className="p-2 pl-5 pb-0 flex justify-start items-center">
              <Image
                src={AyahLogo}
                alt="Logo Ayah Coding"
                width={100}
                height={100}
                className="mr-2 sm:w-10 sm:h-10"
              />
              <span className="hidden sm:block">
                <h1 className="font-rubik text-xl text-white">Coffee Shop</h1>
              </span>
              <span className="sm:hidden">
                <h1 className="font-rubik text-xl">CS</h1>
              </span>
            </div>

            <div className="p-5 pb-2 text-sm">
              <Menus menu={menu1} title="LIST" />
            </div>
            <div className="p-5 pt-2 pb-2 text-sm">
              <Menus menu={menu2} title="APPLICATION" />
            </div>
            <div className="p-5 pt-2 pb-2 text-sm">
              <div
                onClick={handleLogout}
                className="flex gap-2 items-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer text-white hover:rounded-md"
              >
                <CiLogout size={18} />
                <span>Logout</span>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

const Menus: React.FC<{ menu: MenuItem[]; title: string }> = ({ menu, title}) => {
  return (
    <div>
      <h6 className="mb-2 text-xs sm:text-sm text-white">{title}</h6>
      <ul>
        {menu.map((item, index) => {
          const menuActive = item.isActive
            ? "bg-opacity-10 flex px-3 border border-blue-100 py-2 rounded-md text-blue-400 border-none items-center"
            : "px-3 py-2 flex items-center";
          const textActive = item.isActive
            ? "text-blue-500"
            : "text-white hover:text-blue-300";
          return (
            <Link
              key={index}
              href={item.link}
              className={`${menuActive} hover:bg-blue-300 hover:bg-opacity-10 hover:rounded-md`}
            >
              <li className={`cursor-pointer flex`}>
                {item.icon}
                <div
                  className={`ml-2 ${textActive} hidden sm:block`}
                  key={index}
                >
                  {item.name}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default MainHeader;
