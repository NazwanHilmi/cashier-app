export const metadata = {
    title: "Customer",
}
import axios from 'axios'
import React from 'react'
import DataCustomer from './data';

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
            <DataCustomer customer={customer}/>
        </div>
    );
};

export default CustomerList;
