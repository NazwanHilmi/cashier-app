'use client'

import React, { useEffect, useState} from 'react'
import Type from './type';
import Menu from './menu';
import SelectedMenu from './selectedMenu'
import PaymentMethods from './paymentMethod';
import axios from 'axios'
import ErrorWarning from '@/app/components/error'
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation'
import SweetAlert from '@/app/components/sweetAlert';

type TypeItem = {
    id: number;
    nama_jenis: string;
}

type PaymentMethod = {
    id: number;
    icon: string;
    name: string;
}

type MenuType = {
    id: number;
    nama_menu: string;
    harga: number;
    image: string;
    note: string;
    type: {
        id: number;
        nama: string
    }
    stok : {
        id: number;
        jumlah: number;
    }
}

type orderedMenu = {
    menu_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    sub_total: number;
    image: string;
    stok: number;
}

const Content = ({type, menu, paymentMethod}: {type: TypeItem[], menu: MenuType[], paymentMethod: PaymentMethod[]}) => {
    const [searching, setSearching] = useState(false)
    const [selecting, setSelecting] = useState(false)
    const [name, setName] = useState("")
    const [note, setNote] = useState("")
    const [searchedMenu, setSearchedMenu] = useState<MenuType[]>([])
    const [selectedType, setSelectedType] = useState('Semua')
    const [selectedMenu, setSelectedMenu] = useState<MenuType[]>([])
    const [filteredMenu, setFilteredMenu] = useState<MenuType[]>([])
    const [total, setTotal] = useState(0)
    const [orderedMenu, setOrderedMenu] = useState<orderedMenu[]>([])
    const [selectedPayment, setSelectedPayment] = useState(0)
    const [isMutating, setIsMutating] = useState(false);
    const [status, setStatus] = useState<boolean | number>(false);
    const [message, setMessage] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [cetakFaktur, setCetakFaktur] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        if (searching && selecting) {
            let data: MenuType[] = menu.filter(item => item.nama_menu.toLowerCase().includes(name.toLowerCase()) && item.type.nama == selectedType)
            setFilteredMenu(data)
        }
    }, [searching, selecting, menu, name, selectedType])

    const handleSearchMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setName(value)
        let dataSearchedMenu: MenuType[] = menu.filter(item => item.nama_menu.toLowerCase().includes(name.toLowerCase()))

        value.length > 0 ? setSearching(true) : setSearching(false)
        setSearchedMenu(dataSearchedMenu)

        return true
    }

    const handleSelectCategory = (category: string) => {
        let dataSelectedMenu: MenuType[] = []

        if (category == "Semua") {
            setSelecting(false)
            dataSelectedMenu = menu
        } else {
            setSelecting(true)
            dataSelectedMenu = menu.filter(item => item.type.nama == category)
        }

        setSelectedType(category)
        setSelectedMenu(dataSelectedMenu)

        return true
    }

    const resetState = () => {
        setCetakFaktur(true)
        setStatus(false)
        window.open(`/applications/faktur/${data.id}`)
    }

        

    const handleShowMenu = () => {
        if (!searching && !selecting)
            return <Menu menu={menu} type='Semua' setOrderedMenu={setOrderedMenu} orderedMenu={orderedMenu} setTotal={setTotal} />
        if (searching && !selecting)
            return <Menu menu={searchedMenu} type='Semua' setOrderedMenu={setOrderedMenu} orderedMenu={orderedMenu} setTotal={setTotal} />
        if (!searching && selecting)
            return <Menu menu={selectedMenu} type={selectedType} setOrderedMenu={setOrderedMenu} orderedMenu={orderedMenu} setTotal={setTotal} />
        if (searching && selecting)
            return filteredMenu.length > 0 ? <Menu menu={filteredMenu} type={selectedType} setOrderedMenu={setOrderedMenu} orderedMenu={orderedMenu} setTotal={setTotal} /> : <ErrorWarning message='Menu yang anda cari tidak ditemukan' />

        return <ErrorWarning message='Menu yang anda cari tidak ditemukan' />
    }

    const handleFormatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }
    
    const handleTransaction = async () => {
        const data = {
            "total_harga": total,
            "payment_method_id": selectedPayment,
            "note": note,
            "menu": orderedMenu,
        }

        
        setIsMutating(true);
        
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transaksi`, data)
            setOrderedMenu([])
            setTotal(0)
            setSelectedPayment(0)
            setNote("")
            setIsMutating(false);
            console.log(res)
            setStatus(res.status);
            setMessage(res.data?.message)
            setData(res.data?.data)

            router.refresh()
        } catch (error: any) {
            console.log(error)
            setIsMutating(false);
            setStatus(error.response.status);
            setMessage('Transaksi gagal ditambahkan')

            router.refresh();
        }
    }
    
    return (
        <div className='flex flex-wrap-reverse gap-5 items-end justify-start'>
            <div className="p-5 lg:basis-[65%] min-w-96 flex-1 w-full bg-white rounded-md">
                <div className="flex flex-wrap w-full items-center justify-between gap-2 mb-5">
                    <h1 className='text-black text-2xl font-bold'>Pilih Kategori</h1>
                    <div className='md:basis-1/2 h-10 w-full flex items-center justify-start bg-white rounded-lg px-2 py-1'>
                        <input type="text" onChange={handleSearchMenu} placeholder="Cari Menu" className="h-full bg-none outline-none flex-1 text-md p-2 rounded-md bg-slate-100 border-black" id='input-search-menu' />
                        <Icon icon="iconoir:search" width="24" height="24" className='cursor-pointer' />
                    </div>
                </div>
                <Type type={type} selectedType={selectedType} handleSelectType={handleSelectCategory} />
                {handleShowMenu()}
            </div>
            <div className="lg:basis-[30%] flex-1 bg-white p-5 rounded-md">
                <h2 className='text-black text-xl font-bold mb-3'>Pembayaran</h2>
                <SelectedMenu setTotal={setTotal} orderedMenu={orderedMenu} setOrderedMenu={setOrderedMenu} />
                <hr className='bg-slate-200 mb-4' />
                <div className="flex items-center justify-between font-bold mb-5 w-full">
                    <span className="text-sm">Total</span>
                    <span className="text-md">{handleFormatPrice(total)}</span>
                </div>
                <PaymentMethods selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} method={paymentMethod} />
                <div className="mb-4">
                    <h2 className='text-black text-xl font-bold mb-3'>Note</h2>
                    <textarea className='input w-full h-28 rounded p-2 text-sm bg-slate-100 border-black' onChange={(e) => setNote(e.target.value)} value={note}></textarea>
                </div>

                {isMutating ? (
                    <button type='button' disabled className="btn btn-sm capitalize w-full">Menyimpan...</button>
                ) : (
                    <button className="btn btn-sm bg-blue-primary text-white hover:bg-blue-primary border-none hover:bg-opacity-80 capitalize w-full" onClick={handleTransaction}>Pembayaran</button>
                )}
            </div>
            {status && <SweetAlert status={status}  message={message}  isTransaksi={true} resetState={resetState} setStatus={setStatus}  />}
        </div>
    )
}

export default Content