'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChartLine, FaCoins } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import LineChart from "./components/chart";

type OrderedMenu = {
  [x: string]: any;
  menu: string,
  stock: number
}


type Stock = {
  [x: string]: any;
  menu: {
    name: string,
    image: string
  },
  total_orders: number
}

export default function Home() {
  const [income, setIncome] = useState(0);
  const [soldMenu, setSoldMenu] = useState(0);
  const [totalMenu, setTotalMenu] = useState(0);
  const [orderedMenu, setOrderedMenu] = useState<OrderedMenu[] | null>(null)
  const [popular, setPopularMenu] = useState<OrderedMenu | null>(null)
  const [lowStock, setLowStock] = useState<Stock | null>(null)
  const [salesData, setSalesData] = useState([]);
  
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-chart`);

        const formattedData = response.data.daily_income.map((data: { date: string; }) => ({
          ...data,
          date: data.date.split('-').slice(1).join('-'),
        }));
        console.log()

        setSalesData(formattedData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-income`)
        console.log(incomes)
        setIncome(incomes.data.income)

        const count = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/count-menu`);
        setSoldMenu(count.data.sold_menu);
        
        const totalsMenu = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-total`)
        setTotalMenu(totalsMenu.data.total_menu)

        const mostMenu = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-order`)
        setOrderedMenu(mostMenu.data.order_menu)

        const popularMenu = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-popular`)
        setPopularMenu(popularMenu.data.popular_menu)

        const stockMenu = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/grafik-stok`)
        setLowStock(stockMenu.data.low_stock)

      } catch (error: any) {
        console.log('Terjadi kesalahan', error);
      }      
    };

    fetchData()
  }, [])

  const formatToIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  return (
    <main className="">
      <div className="px-5 py-1">
      <div className="grid grid-cols-4 gap-2 bg-blue-dark p-5 rounded-lg shadow-xl mb-5">
          <div className="flex items-center bg-zinc-100 p-5 rounded-md mb-4 justify-between">
              <div className="mr-5">
                  <div className="flex items-center">
                    <div className="text-xl font-bold text-gray-800 mr-2">{soldMenu}</div>
                        </div>
                      <div className="text-sm text-gray-700">Transaksi Hari Ini</div>
                    </div>
                    <div className="hidden md:block mr-5" aria-hidden="true"><FaChartLine className="text-green-400" size={30}/></div>
                </div>
                <div className="flex items-center bg-zinc-100 p-5 rounded-md mb-4 justify-between">
              <div className="mr-5">
                  <div className="flex items-center">
                      <div className="text-xl font-bold text-gray-800 mr-2">Rp. {formatToIDR(income)}</div>
                        </div>
                        <div className="text-sm text-gray-700">Total Pendapatan</div>
                    </div>
                    <div className="hidden md:block mr-5" aria-hidden="true"><FaCoins className="text-green-400" size={30}/></div>
                </div>
                <div className="flex items-center bg-zinc-100 p-5 rounded-md mb-4 justify-between">
              <div className="mr-5">
                  <div className="flex items-center">
                      <div className="text-xl font-bold text-gray-800 mr-2">{totalMenu}</div>
                        </div>
                        <div className="text-sm text-gray-700">Jumlah Menu</div>
                    </div>
                    <div className="hidden md:block mr-5" aria-hidden="true"><BiSolidFoodMenu className="text-green-400" size={30}/></div>
                </div>
                <div className="flex items-center bg-zinc-100 p-5 rounded-md mb-4 justify-between">
              <div className="mr-5">
                    <div className="flex items-center">
                        <h1 className="text-xl text-gray-800 font-bold">Menu Terlaris</h1>
                        </div>
                        <p className="text-md text-gray-700 mr-2">{popular?.menu_name}</p>
                        <h1 className="text-xs text-gray-500 italic">{popular?.total_orders} kali dipesan</h1>
                    </div>
                    <div className="hidden md:block mr-5" aria-hidden="true"><MdOutlineRestaurantMenu className="text-green-400" size={30}/></div>
                </div>
            </div>

            <div className="flex justify-center items-center mb-5 ">
              <div className="w-full">
                <h1 className="text-3xl font-bold mb-4">Grafik Pendapatan</h1>
                <LineChart salesData={salesData}/>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-5 bg-blue-dark p-5 rounded-md shadow-xl w-full">

                <div className="flex items-center bg-zinc-200 rounded-md">
                  <div className="p-5">
                    <h2 className="text-md font-bold p-0 mb-4">Menu Terpopuler</h2>
                    <ol className="list-disc">
                      {orderedMenu && orderedMenu.map((menu: OrderedMenu, index: number) => {
                        return (
                          <li key={index} className="text-gray-800 mb-2">{menu.menu_name} ({menu.total_orders} Terjual)</li>
                        )
                      })}
                    </ol>
                  </div>
                </div>

                <div className="bg-zinc-100 rounded-md">
                <div className="p-2 overflow-x-auto">
                  <div className="flex justify-between">
                    <p className="text-md font-bold p-0 mb-4">Stok Terendah</p>
                    <Link href='/data/stok' className="text-green-500 text-xs">Lihat Detail</Link>
                  </div>
                  <table className="w-full table-auto">
                    <tbody>
                      {lowStock && lowStock.map((item: Stock, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white p-9' : 'bg-gray-100 p-9'}>
                          <td className="text-md">{item.menu.name}
                            <td className="text-md text-center">
                              <td className="text-md">Stok Tersedia : {item.stock}</td>
                            </td>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {lowStock && lowStock.length === 0 && (
                    <p className="text-gray-600 mt-4">Tidak ada menu dengan stok hampir habis.</p>
                  )}
                </div>
              </div>
            </div>
        </div>
    </main>
  );
}
