import React from 'react'
import axios from 'axios'
import AddStok from './addStok'
import DeleteStok from './deleteStok'
import EditStok from './editStok'
import ExportPDF from './exportPDF'
import ExportExcel from './exportExcel'
import ImportExcel from './importExcel'

type Stok = {
    id: number;
    jumlah: number;
    menu: {
        id: number,
        nama: string
    }
}

type Menu = {
    id: number;
    nama_menu: string;
}

const getStok = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stok`);

    return res.data.data
}

const getMenu = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu`);

    return res.data.data
}

const StokList = async () => {

    let stok: Stok[] = await getStok();
    let menu: Menu[] = await getMenu();
    
    return (
        <div className='font-montserrat'>
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">Stok</h1>
            </header>
        <div className="px-10 py-5">
            <div className="py-2 flex gap-3 items-end">
                <AddStok menu={menu} stok={stok} />
                <ExportPDF />
                <ExportExcel />
                <ImportExcel />
            </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Menu</th>
                            <th className='text-xs'>Jumlah</th>
                            <th className='text-center text-xs'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stok.map((stok, index) => (
                            <tr key={stok.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{stok.menu.nama}</td>
                                <td>{stok.jumlah}</td>
                                <td className='flex items-center justify-center gap-2'>
                                    <EditStok stok={stok} menu={menu} />
                                    <DeleteStok {...stok}/>
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

export default StokList;