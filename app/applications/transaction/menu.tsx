'use client'

import { useState } from "react";
import { CiWarning } from "react-icons/ci";

type Menu = {
    id: number;
    nama_menu: string;
    harga: number;
    image: string;
    note: string;
    stok: {
        id: number;
        jumlah: number;
    }
}

type orderedMenu = {
    menu_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    sub_total: number;
    image: string
    stok: number
}

const handleDescription = (string: string) => {
    const limit = 15
    const words = string.split(' ')
    const truncated = words.slice(0, limit).join(' ')

    return words.length > limit ? `${truncated}...` : truncated
}

const handleFormatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price)
}

const handleStok = (stok: number | string) => {
    return stok === 0 || stok === "-" 

}


const Menu = ({ menu, type, setOrderedMenu, orderedMenu, setTotal }: { menu: Menu[], type: string, setOrderedMenu: React.Dispatch<React.SetStateAction<orderedMenu[]>>, orderedMenu: orderedMenu[], setTotal: React.Dispatch<React.SetStateAction<number>>}) => {
const handleChoiceMenu = (
        menu_id: number,
        name: string,
        quantity: number,
        unit_price: number,
        image: string,
        stok: number
    ) => {
        const existingMenu = orderedMenu.find((item) => item.menu_id === menu_id);

        if (existingMenu) {

            const updatedMenu = orderedMenu.map((menu) => {
                if (menu.menu_id === menu_id) {
                    setTotal(prev => prev + menu.unit_price)
                    return {
                        ...menu,
                        quantity: menu.quantity + quantity,
                        sub_total: (menu.quantity + quantity) * menu.unit_price,
                    }
                    

                } else {
                    return menu
                }
            });

            setOrderedMenu(updatedMenu);
        } else {

            const newMenu = {
                menu_id,
                name,
                quantity,
                unit_price,
                sub_total: quantity * unit_price,   
                image,
                stok
            };

            setOrderedMenu((prev) => [...prev, newMenu]);
            setTotal(prev => prev + newMenu.unit_price)
        
        }

        return true;
    };
    
    return (
        <div>
        <h2 className='text-black font-montserrat text-xl font-bold mb-5'>{type} Menu</h2>
        <div className="w-full grid md:grid-cols-3 gap-2">
            {menu.map((item, index) => (
                <div key={index} className="card card-compact bg-slate-200 shadow-xs">
                    {/* <figure className="shadow h -40"><img className="w-full h-full object-cover" src={item.image} alt="Menu Image" /></figure> */}
                    <div className="card-body">
                        <h2 className="card-title font-bold">{item.nama_menu}</h2>
                        {/* <p className=''>{handleDescription(item.deskripsi)}</p> */}
                        <div className="card-actions items-center justify-between w-full">
                            <span className='italic text-md text-black font-semibold'>{handleFormatPrice(item.harga)}</span>
                            <span className="text-xs">Stok : {item.stok.jumlah}</span>
                            <div className="flex justify-end w-full">
                            {
                                handleStok(item.stok.jumlah) ? <button className="p-2 text-red-500 flex items-center text-sm italic cursor-default"> <CiWarning size={20} className="font-bold" /> Unavailable</button> : <button className='btn btn-sm text-white bg-blue-primary hover:bg-opacity-80 hover:bg-blue-primary border-none capitalize' onClick={() => handleChoiceMenu(item.id, item.nama_menu, 1, item.harga, item.image, item.stok.jumlah)} disabled={handleStok(item.stok.jumlah)}>{handleStok(item.stok.jumlah) ? "Unavailable" : "Pilih Menu"}</button> 
                            }
                            </div>
                            
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );

}

export default Menu

    