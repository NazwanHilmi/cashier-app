'use client'

export const metadata = {
    title: "Customer",
}

import React, {useState} from 'react'
import AddCustomer from './addCustomer'
import DeleteCustomer from './deleteCustomer'
import EditCustomer from './editCustomer'
import ExportExcel from './exportExcel'
import ExportPDF from './exportPDF'
import ImportExcel from './importExcel'

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}


const DataCustomer = ({customer}: {customer: Customer[]}) => {
    const [data, setData] = useState<Customer[]>(customer)
    const [search, setSearch] = useState("");

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if (value.length > 0) {
            const newData = data.filter((data) => data.name.toLowerCase().includes(value))

            setData(newData)
        } else {
            setData(customer)
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
                        <AddCustomer />
                        <ExportPDF />
                        <ExportExcel />
                        <ImportExcel />
                    </div>
                <div>
                    <input type="text" id='customer' value={search} onChange={handleSearchData} placeholder='Cari Customer' className='input input-sm bg-white input-bordered text-sm' />
                </div>
            </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Name</th>
                            <th className='text-xs'>Email</th>
                            <th className='text-xs'>Phone</th>
                            <th className='text-xs'>Address</th>
                            <th className='text-xs text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((customer, index) => (
                            <tr key={customer.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td className='flex items-center justify-center gap-2'>
                                <EditCustomer {...customer} />
                                <DeleteCustomer {...customer} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default DataCustomer;
