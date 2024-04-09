export const metadata = {
    title: "Menu",
}
import axios from 'axios'
import AddMenu from './addMenu'
import DeleteMenu from './deleteMenu'
import EditMenu from './editMenu'
import ExportPDF from './exportPDF'
import ExportExcel from './exportExcel'
import ImportExcel from './importExcel'

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
        <header className='w-full p-4 bg-white shadow-lg sticky top-0'>
            <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
        </header>
        <div className="px-10 py-5">
            <div className="py-2 flex gap-3 items-end">
                <AddMenu type={type} category={category}/>
                <ExportPDF />
                <ExportExcel />
                <ImportExcel />
            </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-700 text-base'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Nama Menu</th>
                            <th className='text-xs'>Harga</th>
                            <th className='text-xs'>Image</th>
                            <th className='text-xs'>Jenis</th>
                            <th className='text-xs'>Stok</th>
                            <th className='text-xs'>Deskripsi</th>
                            <th className='text-xs text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map((menu, index) => (
                            <tr key={menu.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{menu.nama_menu}</td>
                                <td>{menu.harga}</td>
                                <td>
                                    <img className='h-10' src={menu.image} alt='image' />
                                </td>
                                <td>{menu.type?.nama ?? '-'}</td>
                                <td>{menu.stok?.jumlah ?? '-'}</td>
                                <td>{menu.deskripsi}</td>
                                <td className='flex items-center justify-center gap-2'>
                                        <EditMenu  type={type} menu={menu} category={category}/>
                                        <DeleteMenu {...menu} />
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

export default MenuList;
