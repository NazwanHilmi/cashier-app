'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [income, setIncome] = useState(0);
  const [soldMenu, setSoldMenu] = useState(0);
  const [totalMenu, setTotalMenu] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-income`)

        console.log(response)
        setIncome(response.data.income)
      } catch (error: any) {
        console.log('Terjadi kesalahan', error);
      }      
    };

    getIncome()        ;
  }, [])

  useEffect(() => {
    const getSoldMenu = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-soldmenu`)

        console.log(response)
        setSoldMenu(response.data.sold_menu)
      } catch (error: any) {
        console.log('Terjadi kesalahan', error);
      }      
    };

    getSoldMenu();
  }, [])

  useEffect(() => {
    const getTotalMenu = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-total`)

        console.log(response)
        setTotalMenu(response.data.total_menu)
      } catch (error: any) {
        console.log('Terjadi kesalahan', error);
      }      
    };

    getTotalMenu();
  }, [])

  useEffect(() => {
    // Fungsi untuk mengambil data produk terlaris dari API
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-seller`);
        // Set data produk terlaris ke dalam state
        setTopProducts(response.data.best_seller);
      } catch (error) {
        console.error('Terjadi kesalahan', error);
      }
    };

    // Panggil fungsi untuk mengambil data produk terlaris saat komponen dimuat
    fetchTopProducts();
  }, []); 

  

  return (
    <main className="">
       <div className="px-5 py-1">
          <div className="flex flex-wrap bg-blue-dark p-5 rounded-lg shadow-xl justify-between">
              <div className="flex items-center bg-zinc-100 p-5 rounded-md mb-4">
                  <div className="mr-5">
                      <div className="flex items-center">
                        <div className="text-xl font-bold text-gray-800 mr-2">{soldMenu}</div>
                            </div>
                          <div className="text-sm text-gray-700">Jumlah Menu Terjual</div>
                        </div>
                        <div className="hidden md:block p-1 rounded-sm h-12 bg-gray-800 mr-5" aria-hidden="true"></div>
                    </div>
                    <div className="flex items-center bg-zinc-100 p-5 rounded-md mb-4">
                  <div className="mr-5">
                      <div className="flex items-center">
                          <div className="text-xl font-bold text-gray-800 mr-2">Rp. {income}</div>
                            </div>
                            <div className="text-sm text-gray-700">Total Pendapatan</div>
                        </div>
                        <div className="hidden md:block p-1 rounded-sm h-12 bg-gray-800 mr-5" aria-hidden="true"></div>
                    </div>
                    <div className="flex items-center bg-zinc-100 p-5 rounded-md mb-4">
                  <div className="mr-5">
                      <div className="flex items-center">
                          <div className="text-xl font-bold text-gray-800 mr-2">{totalMenu}</div>
                            </div>
                            <div className="text-sm text-gray-700">Jumlah Menu</div>
                        </div>
                        <div className="hidden md:block p-1 rounded-sm h-12 bg-gray-800 mr-5" aria-hidden="true"></div>
                    </div>
                    <div className="flex items-center bg-zinc-100 p-5 rounded-md mb-4">
                  <div className="mr-5">
                      <div className="flex items-center">
                          <div className="text-xl font-bold text-gray-800 mr-2">Ayam Goreng</div>
                            </div>
                            <div className="text-sm text-gray-700">Menu Terlaris</div>
                        </div>
                        <div className="hidden md:block p-1 rounded-sm h-12 bg-gray-800 mr-5" aria-hidden="true"></div>
                    </div>
                </div>
                <div>
                  <h2>Produk Terlaris</h2>
                  <ul>
                    {topProducts.map((product) => (
                      <li key={product.menu_id}>
                        Produk ID: {product.menu_id}, Jumlah Terjual: {product.total_penjualan}
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
    </main>
  );
}
