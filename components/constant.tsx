import React from 'react';
import { MdDashboard } from "react-icons/md";

import { BiSolidFoodMenu } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import { FaTableCellsLarge, FaTag, FaCartShopping } from "react-icons/fa6";
import { FaShoppingBag, FaClipboardList } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import AyahLogo from "/public/images/white-ayahcoding.png";
import { signOut, useSession } from "next-auth/react";
import { IoMdContact } from "react-icons/io";
import { GiTable } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { SidenavItem } from './types';

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    title: <h1 className='text-sm text-white'>Dashboard</h1>,    
    path: '/',
    icon: <MdDashboard size={18} className="text-white" />,
  },
  {
    title: <h1 className='text-sm text-white'>Master Data</h1>,
    path: '/',
    icon: <MdDashboard size={18} className="text-white" />,
    submenu: true,
    subMenuItems: [
      {
        title: <h1 className='text-sm text-white'>Kategori</h1>,
        path: '/data/category',
        icon: <FaTag size={15} className="text-white" />
      },
      {
        title: <h1 className='text-sm text-white'>Jenis</h1>,
        icon: <BiSolidFoodMenu size={18} className="text-white" />,
        path: "/data/type",
      },
      {
        title: <h1 className='text-sm text-white'>Menu</h1>,
        icon: <FaCartShopping size={18} className="text-white" />,
        path: "/data/menu",
      },
      // {
      //   name: <h1>Meja</h1>,
      //   icon: <GiTable size={18} className="text-white" />,
      //   path: "/data/meja"
      // },
      {
        title: <h1 className='text-sm text-white'>Stok</h1>,
        icon: <AiOutlineStock size={18} className="text-white" />,
        path: "/data/stok",
      },
      {
        title: <h1 className='text-sm text-white'>Customer</h1>,
        icon: <FaTableCellsLarge size={18} className="text-white" />,
        path: "/data/customer",
      }
    ]
  },
  {
    title: <h1 className='text-sm text-white'>Transaksi</h1>,
    path: '/applications/transaction',
    icon: <FaShoppingBag size={18} className="text-white" />,
    submenu: true,
    subMenuItems: [
      {
        title: <h1 className='text-sm text-white'>Transaksi</h1>,
        icon: <FaShoppingBag size={18} className="text-white" />,
        path: "/applications/transaction"
      },
      {
        title: <h1 className='text-sm text-white'>Daftar Transaksi</h1>,
        icon: <CiBoxList size={18} className="text-white" />,
        path: "/data/laporan/daftar",
      },
      {
        title: <h1 className='text-sm text-white'>Laporan</h1>,
        icon: <TbReportAnalytics size={18} className="text-white" />,
        path: "/data/laporan",
      },
    ]
  },
  {
    title: <h1 className='text-sm text-white'>Karyawan</h1>,
    icon: <BsFillPeopleFill size={18} className="text-white" />,
    path: "/data/karyawan"
  },
  {
    title: <h1 className='text-sm text-white'>Absensi</h1>,
    icon: <FaClipboardList size={18} className="text-white" />,
    path: "/data/absensi"
  },
  {
    title: <h1 className='text-sm text-white'>Contact Us</h1>,
    icon: <IoMdContact size={18} className="text-white" />,
    path: "/pages/contact"
  },
  {
    title: <h1 className='text-sm text-white'>Tentang</h1>,
    icon: <FiAlertCircle size={18} className="text-white" />,
    path: "/pages/about"
  },
]
