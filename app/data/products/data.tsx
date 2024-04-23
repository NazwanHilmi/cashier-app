"use client"

import React, { useState } from 'react'
import axios from 'axios'
import AddProduct from './addProduct';
import DeleteProduct from './deleteProduct';
import EditProduct from './editProduct';
import ExportPDF from './exportProduct';
import ImportProduct from './importProduct';
// import PaginationSection from '@/app/components/pagination';
import { useRouter } from 'next/navigation';
import SweetAlert from '@/app/components/sweetAlert';
import ExportButton from './exportExcel';

type Product = {
    id: number;
    name: string;
    supplier_name: string;
    purchase_price: number;
    selling_price: number;
    stock: number;
}

const editProduct = async (data: Product | undefined) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/product/${data?.id}`, data);

        return response
    } catch (error: any) {
        return error.response
    }
}


const DataProduct = ({ product }: { product: Product[] }) => {
    const [data, setData] = useState<Product[]>(product)
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [stock, setStock] = useState<any>([])
    const [status, setStatus] = useState<any>(false)
    const [message, setMessage] = useState<any>(null)

    // konfigurasi pagination
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    const router = useRouter();

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if (value.length > 0) {
            const newData = data.filter((data) => data.name.toLowerCase().includes(value))

            setData(newData)
        } else {
            setData(product)
        }


        setSearch(value)
    }

    const handleDoubleClick = (id: number, amount: number) => {
        const data = {
            id,
            amount
        }
        const dataStock = [...stock]

        dataStock.push(data)

        setStock(dataStock)
    }

    const handleEditStockChange = (id: number, amount: string) => {
        const stocks = [...stock]
        const numericValue = Number(amount.replace(/\D/g, ''));

        const data = {
            id,
            amount: numericValue
        }

        const stockIndex = stocks.findIndex(data => data.id == id)

        if (stockIndex < 0) {
            stocks.push(data)
        } else {
            const dataStock = stocks[stockIndex]

            stocks[stockIndex] = { ...dataStock, amount: numericValue }
        }

        setStock(stocks)
    }

    const handleValue = (id: number) => {
        const isStock = stock.find((data: any) => data.id == id);

        if (isStock != undefined) {
            return isStock.amount
        } else {
            const dataProduct = product.find((data) => data.id == id);

            return dataProduct?.stock
        }
    }

    const handleBlurStockChange = () => {
        console.log('blur')
        setStock([])
    }

    const handleSubmitStock = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const productToUpdate = product.find(data => data.id === stock[0].id);
    
        if (productToUpdate) {
            const data: Product = {
                ...productToUpdate,
                stock: stock[0].amount as number
            };
    
            const res = await editProduct(data);
            setStatus(res.status);
    
            if (res.status === 200) {
                setMessage('Stok produk berhasil diperbarui');
            } else {
                setMessage('Stok produk gagal diperbarui');
            }
        } else {
            setMessage('Produk tidak ditemukan');
        }
    }
    

    const checkIsEdit = (id: number) => {
        const isStock = stock.find((data: any) => data.id == id);

        return isStock ? true : false
    }

    const resetState = () => {
        setStatus(false)
        setMessage(false)
        setStock([])
        location.reload()
    }

    return (
        <div>
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">Produk Titipan</h1>
            </header>
            <div className="px-10 py-5">
                <div className="py-2 flex justify-between items-end">
                    <div className='flex gap-2'>
                        <AddProduct />
                        <ExportPDF/>
                        <ExportButton />
                        <ImportProduct />
                    </div>
                    <div>
                        <input type="text" id='nama_produk' value={search} onChange={handleSearchData} placeholder='Cari Produk Titipan' className='input input-sm bg-white input-bordered text-sm' />
                    </div>
                </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table display' id='myTable' >
                    <thead>
                        <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Nama Produk</th>
                            <th className='text-xs'>Nama Supplier</th>
                            <th className='text-xs'>Harga Beli</th>
                            <th className='text-xs'>Harga Jual</th>
                            <th className='text-xs'>Stok</th>
                            <th className='text-xs text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.supplier_name}</td>
                                <td>{product.purchase_price}</td>
                                <td>{product.selling_price}</td>
                                <td className='cursor-pointer' onDoubleClick={() => handleDoubleClick(product.id, product.stock)}>
                                    {checkIsEdit(product.id) ? <form onSubmit={handleSubmitStock}>
                                        <input type="text" className='w-8 border border-solid rounded outline-none bg-white' value={handleValue(product.id)} onChange={(e) => handleEditStockChange(product.id, e.target.value)} onBlur={handleBlurStockChange} />
                                    </form> : product.stock}
                                </td>
                                <td className='flex items-center justify-center gap-2'>
                                    <EditProduct {...product} />
                                    <DeleteProduct {...product} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {/* <PaginationSection totalItems={data.length} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
        {status && <SweetAlert status={status} message={message} isTransaksi={false} setStatus={setStatus} resetState={resetState} />}
    </div>
    )
}

export default DataProduct