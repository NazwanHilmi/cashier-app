'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [income, setIncome] = useState(0);
  const [soldMenu, setSoldMenu] = useState(0);

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
    const getCountMenu = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-countmenu`)

        console.log(response)
        setSoldMenu(response.data.soldMenu)
      } catch (error: any) {
        console.log('Terjadi kesalahan', error);
      }      
    };

    getCountMenu();
  }, [])

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
                          <div className="text-xl font-bold text-gray-800 mr-2">24.7K</div>
                            <div className="text-sm font-medium text-green-500">+49%</div>
                            </div>
                            <div className="text-sm text-gray-700">Unique Visitors</div>
                        </div>
                        <div className="hidden md:block p-1 rounded-sm h-12 bg-gray-800 mr-5" aria-hidden="true"></div>
                    </div>
                    <div className="flex items-center bg-zinc-100 p-5 rounded-md mb-4">
                  <div className="mr-5">
                      <div className="flex items-center">
                          <div className="text-xl font-bold text-gray-800 mr-2">24.7K</div>
                            <div className="text-sm font-medium text-green-500">+49%</div>
                            </div>
                            <div className="text-sm text-gray-700">Unique Visitors</div>
                        </div>
                        <div className="hidden md:block p-1 rounded-sm h-12 bg-gray-800 mr-5" aria-hidden="true"></div>
                    </div>
                </div>
            </div>
    </main>
  );
}
