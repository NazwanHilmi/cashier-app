'use client'

export const metadata = {
    title: "Kategori",
}
import axios from 'axios'
import React, { useState } from 'react';
import AddCategory from './addCategory';
import DeleteCategory from './deleteCategory';
import EditCategory from './editCategory';
import ExportPDF from './exportPDF';
import ExportExcel from './exportExcel';
import ImportExcel from './importExcel';
import PaginationSection from '../../components/pagination'
import SweetAlert from '@/app/components/sweetAlert';

type Category = {
    id: number;
    nama: string;
}

const DataCategory = ({category} : {category : Category[]}) => {
    const [data, setData] = useState<Category[]>(category)
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
            const newData = data.filter((data) => data.nama.includes(value) || data.nama.toUpperCase().includes(value) || data.nama.toLowerCase().includes(value))

            setData(newData)
        } else {
            setData(category)
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
        <header className='w-full p-4 bg-white shadow-lg rounded-lg'>
            <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
        </header>
            <div className="px-10 py-5">
                <div className="py-2 flex justify-between items-end">
                    <div className='flex gap-2'>
                        <AddCategory />
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
                        <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Nama Kategori</th>
                            <th className='text-xs text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((category, index) => (
                            <tr key={category.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{category.nama}</td>
                                <td className='flex items-center justify-center gap-2'>
                                    <EditCategory {...category} />
                                    <DeleteCategory {...category} />
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
    )
}

export default DataCategory