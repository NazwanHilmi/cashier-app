export const metadata = {
    title: "Menu",
}
import axios from 'axios'
import DataMenu from './data';

type Menu = {
    id: number;
    nama_menu: string;
    harga: number;
    image: string;
    deskripsi: string;
    type: {
        id: number,
        nama: string
    }
    stok: {
        id: number,
        jumlah: number
    }
    category: {
        id: number;
        nama: string;
    }
}

type Type = {
    id: number;
    nama_jenis: string;
    category: {
        id: number
        nama: string
    }
}

type Category = {
    id: number;
    nama: string;
}


const getMenu = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu`);

    return res.data.data
}

const getType = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/type`);

    return res.data.data
}

const getCategory = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);

    return res.data.data
}

const MenuList = async () => {
    const menu: Menu[] = await getMenu();
    const type: Type[] = await getType();
    const category: Category[] = await getCategory();

    return (
        <div>
            <DataMenu menu={menu} type={type} category={category}/>
        </div>
    );
};

export default MenuList;
