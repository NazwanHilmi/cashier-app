export const metadata = {
    title: "Karyawan",
}
import axios from 'axios'
import Link from 'next/link'
import AddKaryawan from './addKaryawan'
import DeleteKaryawan from './deleteKaryawan'
import EditKaryawan from './editKaryawan'

type Karyawan = {
    id: number;
    nip: number;
    nik: number;
    nama: string;
    jenis_kelamin: string;
    telepon: string;
    agama: string;
    status_nikah: string;
    alamat: string;
    golongan_id: number;
    foto: string;
}

const getKaryawan = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/karyawan`);

    return res.data.data
}

const KaryawanList = async () => {
    const karyawan: Karyawan[] = await getKaryawan();
    return (
        <div>
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
            </header>
        <div className="px-10 py-5">
            <div className="py-2">
                <AddKaryawan />
            </div>
            <div className="overflow-x-auto">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-800'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>NIP</th>
                            <th className='text-xs'>NIK</th>
                            <th className='text-xs'>Nama</th>
                            <th className='text-xs'>Jenis Kelamin</th>
                            <th className='text-xs'>Telepon</th>
                            <th className='text-xs'>Agama</th>
                            <th className='text-xs'>Status Nikah</th>
                            <th className='text-xs'>Alamat</th>
                            <th className='text-xs'>Foto</th>
                            <th className='text-xs text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {karyawan.map((karyawan, index) => (
                            <tr key={karyawan.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{karyawan.nip}</td>
                                <td>{karyawan.nik}</td>
                                <td>{karyawan.nama}</td>
                                <td>{karyawan.jenis_kelamin}</td>
                                <td>{karyawan.telepon}</td>
                                <td>{karyawan.agama}</td>
                                <td>{karyawan.status_nikah}</td>
                                <td>{karyawan.alamat}</td>
                                <td>
                                    <img src={karyawan.foto} alt='image' />
                                </td>
                                <td className='flex items-center justify-center gap-2'>
                                        {/* <EditKaryawan {...karyawan} /> */}
                                    {/* <DeleteKaryawan {...karyawan} /> */}
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

export default KaryawanList;
