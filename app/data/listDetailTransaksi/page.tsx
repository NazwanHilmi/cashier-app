export const metadata = {
    title: "Detail Transaksi",
}
import axios from 'axios'
import React from 'react';

type DetailTransaksi = {
    id: number;
    sub_total: number;
    unit_price: number;
    quantity: number;
    menu:{
        id:number;
        nama:string
    },
    transaksi: {
        id: number;
        total_harga: number;
    }
}


const getDetailTransaksi = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/detail-transaksi`);

    return res.data.data
}

const DetailTransaksiList = async () => {
    const detailTransaksi: DetailTransaksi[] = await getDetailTransaksi();
    return (
        <div>
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
            </header>
            <div className="px-10 py-5">
                <div className="py-2">
                </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Total Harga</th>
                            <th className='text-xs'>Harga Menu</th>
                            <th className='text-xs'>Quantity</th>
                            <th className='text-xs'>Menu</th>
                            <th className='text-xs'>Transaksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailTransaksi.map((item, index) => (
                            <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{item.sub_total}</td>
                                <td>{item.unit_price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.menu.nama}</td>
                                <td>{item.transaksi.total_harga} ({item.transaksi.id})</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default DetailTransaksiList;
