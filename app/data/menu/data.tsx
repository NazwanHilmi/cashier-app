'use client'

export const metadata = {
    title: "Menu",
}

import React, {useState} from 'react'
import AddMenu from './addMenu'
import DeleteMenu from './deleteMenu'
import EditMenu from './editMenu'
import ExportPDF from './exportPDF'
import ExportExcel from './exportExcel'
import ImportExcel from './importExcel'
import PaginationSection from '@/app/components/pagination'
import SweetAlert from '@/app/components/sweetAlert'

type Menu = {
    id: number;
    nama_menu: string;
    harga: number;
    image: string;
    deskripsi: string;
    type: {
        id: number,
        nama: string
    }
    stok: {
        id: number,
        jumlah: number
    }
    category: {
        id: number;
        nama: string;
    }
}

type Type = {
    id: number;
    nama_jenis: string;
    category: {
        id: number
        nama: string
    }
}

type Category = {
    id: number;
    nama: string;
}


const DataMenu = ({menu, type, category}: {menu: Menu[], type: Type[], category: Category[]}) => {
    const [data, setData] = useState<Menu[]>(menu)
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [status, setStatus] = useState<number | boolean>(false)
    const [message, setMessage] = useState<string | boolean>(false)
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);


    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if (value.length > 0) {
            const newData = data.filter((data) => data.nama_menu.includes(value) || data.nama_menu.toUpperCase().includes(value) || data.nama_menu.toLowerCase().includes(value))


            setData(newData)
        } else {
            setData(menu)
        }


        setSearch(value)
    }

    const resetState = () => {
        setStatus(false)
        setMessage(false)
        location.reload()
    }

    return (
        <div>
        <header className='w-full p-4 bg-white shadow-lg sticky top-0'>
            <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
        </header>
        <div className="px-10 py-5">
                <div className="py-2 flex justify-between items-end">
                    <div className='flex gap-2'>
                        <AddMenu type={type} category={category}/>
                        <ExportPDF />
                        <ExportExcel />
                        <ImportExcel />
                    </div>
                <div>
                    <input type="text" id='kategori' value={search} onChange={handleSearchData} placeholder='Cari Kategori' className='input input-sm bg-white input-bordered text-sm' />
                </div>
            </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-700 text-base'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Nama Menu</th>
                            <th className='text-xs'>Harga</th>
                            <th className='text-xs'>Image</th>
                            <th className='text-xs'>Jenis</th>
                            <th className='text-xs'>Stok</th>
                            <th className='text-xs'>Deskripsi</th>
                            <th className='text-xs text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((menu, index) => (
                            <tr key={menu.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{menu.nama_menu}</td>
                                <td>{menu.harga}</td>
                                <td>
                                    <img className='h-10' src={menu.image} alt='image' />
                                </td>
                                <td>{menu.type?.nama ?? '-'}</td>
                                <td>{menu.stok?.jumlah ?? '-'}</td>
                                <td>{menu.deskripsi}</td>
                                <td className='flex items-center justify-center gap-2'>
                                        <EditMenu  type={type} menu={menu} category={category}/>
                                        <DeleteMenu {...menu} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
            <PaginationSection totalItems={data.length} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {status && <SweetAlert status={Number(status)} message={message.toString()}  isTransaksi={false} resetState={resetState} setStatus={setStatus} />}
        </div>
    );
};

export default DataMenu;
