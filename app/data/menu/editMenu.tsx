'use client'

import React, { SyntheticEvent, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TiEdit } from 'react-icons/ti';
import SweetAlert from '@/app/components/sweetAlert';

type Menu = {
  id: number;
  nama_menu: string;
  harga: number;
  image: string;
  deskripsi: string;
  type: {
    id: number;
    nama: string;
  };
  stok: {
    id: number;
    jumlah: number;
  };
  category: {
    id: number;
    nama: string;
  };
};

type Type = {
  id: number;
  nama_jenis: string;
  category: {
    id: number;
    nama: string;
  };
};

type Category = {
  id: number;
  nama: string;
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const EditMenu = ({ menu, type, category }: { menu: Menu; type: Type[]; category: Category[] }) => {
  const [modal, setModal] = useState(false);
  const [namaMenu, setNamaMenu] = useState(menu.nama_menu);
  const [harga, setHarga] = useState(menu.harga);
  const [image, setImage] = useState(menu.image);
  const [deskripsi, setDeskripsi] = useState(menu.deskripsi);
  const [typeId, setTypeId] = useState(menu.type.id);
  const [status, setStatus] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const [isMutating, setIsMutating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(menu.image);

  const router = useRouter();

  const handleChange = () => {
    setModal(!modal);
    setNamaMenu(menu.nama_menu);
    setHarga(menu.harga);
    setImage(menu.image);
    setDeskripsi(menu.deskripsi);
    setTypeId(menu.type.id);
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value: any = e.target;
    if (value.files && value.files[0]) {
      const selectedImage = value.files[0];
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setIsMutating(true);

    const endpoint = `${API_URL}/menu/${menu.id}`;
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('nama_menu', namaMenu);
    formData.append('harga', harga.toString());
    formData.append('deskripsi', deskripsi);
    formData.append('type_id', typeId.toString());
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await axios.post(endpoint, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      setModal(false);
      setNamaMenu(menu.nama_menu);
      setHarga(menu.harga);
      setImage(menu.image);
      setDeskripsi(deskripsi);
      setTypeId(menu.type.id);
      setIsMutating(false);

      setStatus(res.status);
      setMessage(res.data.message);

      router.refresh();
    } catch (error: any) {
      setIsMutating(false);

      setStatus(error.response.status);
      setMessage('Menu gagal diedit');

      router.refresh();
    }
  };

  return (
    <div className="font-montserrat">
      <button className="p-2 rounded-md text-white bg-green-600 hover:bg-green-700 border-none" onClick={handleChange}>
        <TiEdit size="20" />
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white border-slate-950">
          <h3 className="font-bold text-lg text-slate-800">Edit Menu {menu.nama_menu}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                value={namaMenu}
                onChange={(e) => setNamaMenu(e.target.value)}
                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                placeholder="Menu Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Harga</label>
              <input
                type="number"
                value={harga}
                onChange={(e) => setHarga(parseInt(e.target.value))}
                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                placeholder="Harga"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Image</label>
              <input type="file" name="image" onChange={handleChangeImage} className="bg-white border-slate-300" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 max-w-52 max-h-52" />}
            </div>
            <div className="form-control">
              <label className="label font-bold">Deskripsi</label>
              <textarea
                value={deskripsi}
                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Deskripsi"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label font-bold">Jenis</label>
              <select
                className="select select-bordered w-full bg-white text-slate-800 border-slate-300 "
                onChange={(e) => setTypeId(parseInt(e.target.value))}
                defaultValue={menu.type.id}
              >
                <option>Pilih Type</option>
                {type.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.nama_jenis}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-sm bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white"
                onClick={handleChange}
              >
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

export default EditMenu;
