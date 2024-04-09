import axios from 'axios'
import Content from './Content';

type Type = {
    id: number;
    nama_jenis: string;
}

type PaymentMethod = {
    id: number;
    icon: string;
    name: string;
}

type Menu = {
    id: number;
    nama_menu: string;
    harga: number;
    image: string;
    note: string;
    type: {
        id: number;
        nama: string
    }
    stok : {
        id: number;
        jumlah: number
    }
}

const getType = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/type`);

    return res.data.data;
}

const getPaymentMethod = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment_methods`);

    return response.data.data;
}

const getMenu = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu`);

    return res.data.data;
}

const Transaction = async () => {
    const type: Type[] = await getType();
    const paymentMethod: PaymentMethod[] = await getPaymentMethod();
    let menu: Menu[] = await getMenu();

    return (
        <div>
            <Content type={type} menu={menu} paymentMethod={paymentMethod} />
        </div>
    )
}

export default Transaction