"use client"
import React, { SyntheticEvent } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { TiEdit } from "react-icons/ti";
import SweetAlert from '@/app/components/sweetAlert';

type Products = {
    id: number;
    name: string;
    supplier_name: string;
    purchase_price: number;
    selling_price: number;
    stock: number;
}

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
    const EditProduct = (params: Products) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState(params.name)
    const [supplier, setSupplier] = useState(params.supplier_name)
    const [purchase, setPurchase] = useState(params.purchase_price)
    const [selling, setSelling] = useState(params.selling_price)
    const [stock, setStock] = useState(params.stock)
    const [isMutating, setIsMutating] = useState(false);
    const [status, setStatus] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)

    const router = useRouter();

    const handleChange = () => {
        setModal(!modal);
        setName(params.name);
        setSupplier(params.supplier_name);
        setPurchase(params.purchase_price);
        setSelling(params.selling_price);
        setStock(params.stock);
    };

    const handleSellingPrice = (purchasePrice : number) =>  {
        const profit = purchasePrice * 0.7;
        const roundedProfit = Math.round(profit / 500) * 500;
        const sellingPrice = purchasePrice + roundedProfit;
        return sellingPrice;
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsMutating(true);
        let endpoint = `${API_URL}/product/${params.id}`
        const data = { 
            'name': name,
            'supplier_name': supplier,
            'purchase_price': purchase,
            'selling_price': selling,
            'stock': stock
        }

        try {
            const res = await axios.patch(endpoint, data);
            setModal(false);
            setIsMutating(false);
            setMessage(res.data?.message);
            setStatus(res.status);
            router.refresh();
        } catch (error: any) {
            setIsMutating(false);
            setStatus(error.response.status);
            setMessage('Produk Titipan gagal diupdate');
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
            <h3 className="font-bold text-lg text-slate-800">Edit Produk {params.name}</h3>
            <form onSubmit={handleUpdate}>
                <div className="form-control">
                    <label className="label font-bold text-slate-800">Nama Produk</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                            placeholder="Nama Produk"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-slate-800">Nama Supplier</label>
                            <input
                                type="text"
                                value={supplier}
                                onChange={(e) => setSupplier(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Nama Supplier"
                            />
                        </div>
                        <div className="form-control">
                        <label className="label font-bold">Harga Beli</label>
                            <input
                                type="number"
                                value={purchase}
                                min="0"
                                onChange={(e) => {
                                    const newPurchasePrice = parseInt(e.target.value)
                                    setPurchase(newPurchasePrice)
                                    const sellingPrice = handleSellingPrice(newPurchasePrice);

                                    setSelling(sellingPrice);
                                }}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Harga Beli"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Harga Jual</label>
                            <input
                                readOnly
                                type="number"
                                value={selling}
                                min="0"
                                onChange={(e) => setSelling(parseInt(e.target.value))}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Stok</label>
                            <input
                                type="number"
                                value={stock}
                                min="0"
                                onChange={(e) => setStock(parseInt(e.target.value))}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Stok"
                            />
                    </div>
                <div className="modal-action">
                <button type="button" className="btn btn-sm rounded-md bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white" onClick={handleChange}>
                    Close
                </button>
                {!isMutating ? (
                    <button type="submit" className="btn btn-sm rounded-md bg-blue-primary hover:bg-blue-600 font-medium border-none text-white text-sm">
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

export default EditProduct