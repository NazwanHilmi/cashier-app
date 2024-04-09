'use client'

type Transaksi = {
    id: number
    tanggal: number
    total_harga: number
    image: string
    note: string
    payment: {
        id: number
        name: string
    }
    detail: {
        id: number
        sub_total: number
        unit_price: number
        quantity: number
        menu: {
            id: number
            nama: string
        }
    }[]
}


const CetakPDF = ({ transaksi}: {transaksi: Transaksi}) => {


    const amountPrice = (unit_price: number, quantity: number) => {
        return unit_price * quantity
    }

        const formatDate = (tanggal: number) => {
        const date = new Date(tanggal);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}${month}${day}`;
    }

    return (
        <div>
            <div>
                <div className="max-w-lg mx-auto p-8 border border-gray-300 shadow-lg rounded-lg font-poppins text-gray-700 text-base leading-6">
                    <table className="w-full text-left">
                        <tbody>
                            <tr>
                                <td colSpan={2} className="pb-12">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>Coffee Shop</strong>
                                                    <br />
                                                    {formatDate(transaksi.tanggal)}000{transaksi.id}
                                                    <br />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr className="bg-gray-200 p-4 font-bold">
                                <td>Produk</td>
                                <td className="text-right">Subtotal</td>
                            </tr>

                            {transaksi.detail.map((item, index) => (
                                <tr className="total" key={index}>
                                    <td>
                                        {item.menu.nama} <br />
                                        <strong>Harga :</strong>{' '}
                                        {item.unit_price} x {item.quantity}
                                    </td>
                                    <td className="text-right">
                                        Rp.{' '}{amountPrice(item.unit_price,item.quantity)}
                                    </td>
                                </tr>
                            ))}

                            <tr className="total">
                                <td></td>
                                <td className="text-right">
                                    Subtotal : Rp. {transaksi.total_harga}
                                </td>
                            </tr>
                            <tr className="total">
                                <td></td>
                                <td className="text-right">
                                    Pembayaran: Rp -2000 <br />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Detail Pembayaran</strong>
                                </td>
                            </tr>

                            <tr>
                                <td>Transfer ke: {transaksi.id}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Tanggal: {transaksi.tanggal}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CetakPDF
