'use client'

const metadata = {
    title: "Type",
}

import React, {useState} from 'react'
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

const DataType = ({type, category}: {type: Type[], category: Category[]}) => {
    const [data, setData] = useState<Type[]>(type)
    const [search, setSearch] = useState("");

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if (value.length > 0) {
            const newData = data.filter((data) => data.nama_jenis.toLowerCase().includes(value))

            setData(newData)
        } else {
            setData(type)
        }


        setSearch(value)
    }
    
    return (
        <div>
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
            </header>
        <div className="px-10 py-5">
                    <div className="py-2 flex justify-between items-end">
                    <div className='flex gap-2'>
                        <AddType category={category} />
                        <ExportPDF />
                        <ExportExcel />
                        <ImportExcel />
                    </div>
                <div>
                    <input type="text" id='type' value={search} onChange={handleSearchData} placeholder='Cari Jenis' className='input input-sm bg-white input-bordered text-sm' />
                </div>
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
                        {data.map((type, index) => (
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

export default DataType;