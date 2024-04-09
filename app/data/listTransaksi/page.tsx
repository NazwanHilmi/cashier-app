export const metadata = {
    title: "Daftar Transaksi",
}
import axios from 'axios'
import React from 'react';

type Transaksi = {
    id: number;
    tanggal: string;
    total_harga: number;
    note: string;
    payment: {
        id: number;
        name: string;
    }
}

type Payment = {
    id: number;
    name: string;
}


const getTransaksi = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transaksi`);
    console.log(res)

    return res.data.data
}

// const getPayment = async () => {
//     let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment_methods`);

//     return res.data.data
// }

const ListTransaksi = async () => {
    let transaksi: Transaksi[] = await getTransaksi();
    // const payment: Payment[] = await getPayment();
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
                            <th className='text-xs'>Tanggal</th>
                            <th className='text-xs'>Total Harga</th>
                            <th className='text-xs'>Nota</th>
                            <th className='text-xs'>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi.map((item, index) => (
                            <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{item.tanggal}</td>
                                <td>{item.total_harga}</td>
                                <td>{item.note}</td>
                                <td>{item.payment.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default ListTransaksi;
