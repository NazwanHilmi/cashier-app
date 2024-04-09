'use client'

import axios from 'axios'
import React, { useEffect } from 'react'
import { IoReturnUpBackSharp } from 'react-icons/io5'
import Link from 'next/link'
import CetakPDF from './pdf'
import ExportPDF from './exportFaktur'

type Transaksi = {
    id: number
    tanggal: number
    total_harga: number
    image: string
    note: string
    payment: {
        id: number
        name: string
    }
    detail: {
        id: number
        sub_total: number
        unit_price: number
        quantity: number
        menu: {
            id: number
            nama: string
        }
    }[]
}

const getTransaksi = async (id: number) => {
    let res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transaksi/${id}`
    )

    return res.data.data

}


const PageFaktur = async ({params}: {params: { id: number }}) => {
    const transaksi: Transaksi = await getTransaksi(params.id)

    console.log(transaksi)
    return (
        <div>
            <div className="w-full flex mt-4 mb-4 justify-evenly">
                <ExportPDF id={params.id} />
                <Link
                    href="/applications/transaction"
                    className="btn btn-sm bg-blue-500 text-white border-none font-bold hover:bg-blue-700"
                >
                    <IoReturnUpBackSharp size={20} />
                </Link>
            </div>
            <CetakPDF transaksi={transaksi}/>
        </div>
    )
}

export default PageFaktur
