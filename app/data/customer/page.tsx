export const metadata = {
    title: "Customer",
}
import axios from 'axios'
import Link from 'next/link'
import AddCustomer from './addCustomer'
import DeleteCustomer from './deleteCustomer'
import EditCustomer from './editCustomer'

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

const getCustomer = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer`);

    return res.data.data
}

const CustomerList = async () => {
    const customer: Customer[] = await getCustomer();
    return (
        <div>
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
            </header>
        <div className="px-10 py-5">
            <div className="py-2">
                <AddCustomer />
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
                        {customer.map((customer, index) => (
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

export default CustomerList;
