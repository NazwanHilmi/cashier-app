import Image from 'next/image'
import React from 'react'
import AyahLogo from "/public/images/white-ayahcoding.png";

const aboutPage = () => {
    return (
        <div className='w-full rounded p-12 bg-slate-200 font-montserrat'>
            <div className="w-full mb-3">
                <div className="w-full flex items-center justify-between gap-4">
                <div>
                    <h1 className='text-2xl text-black font-bold mb-3'>Tentang Coffee Shop</h1>
                    <p className='text-gray-800 text-md leading-7'>
                        Aplikasi Coffee Shop adalah platform yang memudahkan pelanggan untuk menemukan, memesan, dan menikmati kopi berkualitas di berbagai kafe. Dengan berbagai fitur dan menu yang lengkap, pelanggan dapat dengan mudah menjelajahi pilihan kopi dan tempat bersantai favorit mereka.
                    </p>
                </div>
            <Image src={AyahLogo} alt='ayah logo' className='object-cover' width={70} height={70} />
        </div>
    </div>
        <div className="w-full mb-4">
            <h1 className='text-xl text-black font-bold mb-3'>Layanan Aplikasi</h1>
        <ul className='ml-3'>
          <li className='mb-3'>
            <span className="text-md font-bold inline-block mb-1">
                Pesan dan Personalisasi
            </span>
            <p className="text-sm">
                Pesan kopi dan menu lainnya dari perusahaan kopi kami dengan mudah dan sesuai dengan preferensi Anda. Nikmati kemudahan personalisasi pesanan sesuai dengan selera Anda.
            </p>
          </li>
          <li className='mb-3'>
            <span className="text-md font-bold inline-block mb-1">
                Informasi Produk
            </span>
            <p className="text-sm">
                Temukan informasi lengkap tentang berbagai kopi, minuman, dan makanan yang tersedia di perusahaan kopi kami, termasuk deskripsi rasa, kandungan nutrisi, dan informasi tambahan lainnya.
            </p>
          </li>
          <li className='mb-3'>
            <span className="text-md font-bold inline-block mb-1">
                Promo dan Pembayaran
            </span>
            <p className="text-sm">
                Dapatkan akses eksklusif ke promo-promo terbaru dari perusahaan kami dan nikmati kemudahan pembayaran yang aman dan nyaman melalui aplikasi kami.
            </p>
          </li>
        </ul>
      </div>
      <div className="w-full mb-7">
        <h1 className='text-2xl text-black font-bold mb-3'>Sejarah</h1>
        <p className='text-gray-800 text-md leading-7'>
            Aplikasi Coffee Shop lahir dari hasrat untuk memberikan pengalaman yang lebih baik bagi para pecinta kopi dalam menikmati minuman favorit mereka.
        </p>
      </div>
    </div>
  )
}

export default aboutPage