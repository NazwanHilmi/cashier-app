export const metadata = {
    title: "Type",
}

import React from 'react'
import axios from 'axios'
import AddType from './addType'
import DeleteType from './deleteType'
import EditType from './editType'
import ExportPDF from './exportPDF'
import ExportExcel from './exportExcel'
import ImportExcel from './importExcel'

type Type = {
    id: number;
    nama_jenis: string;
    category: {
        id: number,
        nama: string
    }
}

type Category = {
    id: number;
    nama: string;
}

const getType = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/type`);

    return res.data.data
}

const getCategory = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);

    return res.data.data
}

const TypeList = async () => {
    let type: Type[] = await getType();
    let category: Category[] = await getCategory();
    
    return (
        <div>
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
            </header>
        <div className="px-10 py-5">
            <div className="py-2 flex gap-3 items-end">
                    <AddType category={category} />
                    <ExportPDF />
                    <ExportExcel />
                    <ImportExcel />
                </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                    <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Nama Jenis</th>
                            <th className='text-xs'>Kategori</th>
                            <th className='text-center text-xs'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {type.map((type, index) => (
                            <tr key={type.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{type.nama_jenis}</td>
                                <td>{type.category.nama}</td>
                                <td className='flex items-center justify-center gap-2'>
                                    <EditType type={type} category={category} />
                                    <DeleteType {...type}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default TypeList;