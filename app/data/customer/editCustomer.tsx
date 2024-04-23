"use client"
import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { TiEdit } from "react-icons/ti";
import SweetAlert from '@/app/components/sweetAlert';

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const EditCustomer = (params: Customer) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState(params.name)
    const [email, setEmail] = useState(params.email)
    const [phone, setPhone] = useState(params.phone)
    const [address, setAddress] = useState(params.address)
    const [isMutating, setIsMutating] = useState(false);
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)

    const router = useRouter();

    const handleChange = () => {
        setModal(!modal);
        setName(params.name);
        setEmail(params.email);
        setPhone(params.phone);
        setAddress(params.address);
    };

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsMutating(true);
        let endpoint = `${API_URL}/customer/${params.id}`;
        const data = { 
            'name': name,
            'email': email,
            'phone': phone,
            'address': address,
        };
        try {
            const res = await axios.patch(endpoint, data);
            setName(params.name)
            setEmail(params.email)
            setPhone(params.phone)
            setAddress(params.address)
            setIsMutating(false);
            setModal(false);

            setMessage(res.data?.message)
            setStatus(res.status)

            router.refresh();
        } catch (error: any) {
            setIsMutating(false)

            setStatus(error.response.status)
            setMessage('Customer gagal diedit')
            router.refresh();
        }
    };

return (
    <div className='font-montserrat'>
        <button className="p-2 rounded-md text-white bg-green-600 hover:bg-green-700 border-none" onClick={handleChange}>
            <TiEdit size='20' />
        </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box bg-white border-slate-950">
                    <h3 className="font-bold text-lg text-slate-800">Edit Customer {params.name}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Phone"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Alamat</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Alamat"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn btn-sm bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white" onClick={handleChange}>
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-sm bg-blue-primary hover:bg-blue-600 font-medium border-none text-white text-sm">
                                    Submit
                                </button>
                            ) : (
                                <button type="button" className="loading loading-md bg-slate-600"></button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus} />}
    </div>
);
};

export default EditCustomer