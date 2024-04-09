export const metadata = {
    title: "Meja",
}
import axios from 'axios'
import AddMeja from './addMeja'
import DeleteMeja from './deleteMeja'
import EditMeja from './editMeja'

type Meja = {
    id: number;
    nomor_meja: number;
    kapasitas: number;
    status: string;
}

const getMeja = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/meja");

    return res.data.data
}

const MejaList = async () => {
    const meja: Meja[] = await getMeja();
    return (
        <div className="font-montserrat">
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">Meja</h1>
            </header>
            <div className="px-10 py-5">
            <div className="py-2">
                <AddMeja />
            </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Nomor Meja</th>
                            <th className='text-xs'>Kapasitas</th>
                            <th className='text-xs'>Status</th>
                            <th className='text-xs text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meja.map((meja, index) => (
                            <tr key={meja.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{meja.nomor_meja}</td>
                                <td>{meja.kapasitas}</td>
                                <td>{meja.status}</td>
                                <td className='flex items-center justify-center gap-2'>
                                    <EditMeja {...meja} />
                                    <DeleteMeja {...meja} />
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

export default MejaList;
