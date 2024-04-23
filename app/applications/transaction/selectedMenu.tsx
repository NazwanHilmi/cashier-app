'use client'

import React, { useState } from "react"
import { FaTrash } from "react-icons/fa";

type orderedMenu = {
    menu_id : number;
    name: string;
    quantity: number;
    unit_price: number;
    sub_total: number;
    image: string;
    stok: number;
}

const SelectedMenu = ({orderedMenu, setOrderedMenu, setTotal} :{orderedMenu: orderedMenu[], setOrderedMenu: React.Dispatch<React.SetStateAction<orderedMenu[]>>, setTotal: React.Dispatch<React.SetStateAction<number>> }) =>  {
    const [stokLimit, setStokLimit] = useState('');

    const handleFormatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const handleChangeQuantity = (menu_id: number, newQuantity: number) => {

        if (newQuantity < 0 || isNaN(Number(newQuantity))){
            return;
        }

        const numericQuantity = Number(newQuantity)

        const updatedMenu = orderedMenu.map((menu) => {
            if (menu.menu_id === menu_id) {

                if(menu.quantity <= menu.stok){

                    const priceDifference = (numericQuantity - menu.quantity) * menu.unit_price;
                    setTotal(prev => prev + priceDifference);
                    return {
                        ...menu,
                        quantity: numericQuantity,
                        sub_total: numericQuantity * menu.unit_price,
                    };
                }else {
                    setStokLimit('Jumlah pesanan melebihi stok yang tersedia')
                    setTimeout(() => {
                        setStokLimit('');
                    }, 2000);
                    return menu;
                }
            } else {
                return menu;
            }
        });
    
        setOrderedMenu(updatedMenu);
    }

    const handleIncreaseQuantity = (menu_id: number) => {
        const updatedMenu = orderedMenu.map((menu) => {

            if (menu.menu_id === menu_id) {

                if(menu.quantity + 1 <= menu.stok){
                    setTotal(prev => prev + menu.unit_price)
                    return {
                        ...menu,
                        quantity: menu.quantity + 1,
                        sub_total: (menu.quantity + 1) * menu.unit_price,
                    }
                }else {
                    setStokLimit('Jumlah pesanan melebihi stok yang tersedia');
                    setTimeout(() => {
                        setStokLimit('');
                    }, 2000);
                    return menu
                }
            } else {
                return menu
            }

        });

        setOrderedMenu(updatedMenu);
    }

    const handleDecreaseQuantity = (menu_id: number) => {

        const updatedMenu = orderedMenu.map((menu) => {
            
            if (menu.menu_id === menu_id) {
                let newQuantity = menu.quantity - 1;
    
                if (newQuantity > 0) {
                    setTotal(prev => prev - menu.unit_price);
    
                    return {
                        ...menu,
                        quantity: newQuantity,
                        sub_total: newQuantity * menu.unit_price,
                    };
                } else {
                    return menu;
                }
            } else {
                return menu;
            }
        });
    
        setOrderedMenu(updatedMenu);
    }

    const handleDelete = (menu_id: number) => {
        const deleteMenu = orderedMenu.find(menu => menu.menu_id === menu_id);
        const updatedMenu = orderedMenu.filter((menu) => menu.menu_id !== menu_id);
    
        if (deleteMenu) {
            setTotal(prev => prev - deleteMenu.sub_total);
        }

        setOrderedMenu(updatedMenu);
    };

    return (
        <div className="flex flex-col gap-4 w-full pr-2 mb-4 overflow-y-auto max-h-10px">
            {orderedMenu.map((item, index) => (
                <div key={index} className="flex items-start justify-start gap-2 w-full">
                    {/* <figure><img className="w-12 h-12 bg-white border-black border-2 rounded-sm" src={item.image} alt="image menu" /></figure> */}
                    <div className='flex-1 flex-row'>
                        <h4 className='text-md font-bold'>{item.name}</h4>
                        <div className="flex items-center justify-between w-full text-md mb-2">
                            <div className="flex items-center justify-center gap-2">
                                <button className="btn btn-xs bg-red-500 border-none text-white rounded-md hover:bg-red-700 " onClick={() => handleDecreaseQuantity(item.menu_id)}>-</button>
                                <input type="text" className="w-7 text-center bg-white" value={item.quantity} onChange={(e) => handleChangeQuantity(item.menu_id, Number(e.target.value))}/>
                                <button className="btn btn-xs bg-green-600 border-none text-white rounded-md  hover:bg-green-700" onClick={() => handleIncreaseQuantity(item.menu_id)}>+</button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="cursor-pointer text-red-500 transition-colors duration-300 hover:text-opacity-80 hover:text-red-700" onClick={() => handleDelete(item.menu_id)}><FaTrash size={20}/></span>
                                <span className="text-slate-400">{handleFormatPrice(item.sub_total)}</span>
                            </div>
                        </div>
                        {stokLimit && <p className="text-red-500 italic text-sm">{stokLimit}</p>}
                    </div>
                </div>
            ))}
        </div>  
    )
}

export default SelectedMenu