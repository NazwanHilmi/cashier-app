export const metadata = {
    title: "Kategori",
}
import axios from 'axios'
import React from 'react';
import AddCategory from './addCategory';
import DeleteCategory from './deleteCategory';
import EditCategory from './editCategory';
import ExportPDF from './exportPDF';
import ExportExcel from './exportExcel';
import ImportExcel from './importExcel';
import DataCategory from './data';

type Category = {
    id: number;
    nama: string;
}


const getCategory = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);

    return res.data.data
}

const CategoryList = async () => {
    const category: Category[] = await getCategory();
    return (
        <div>
            <DataCategory category={category}/>
        </div>
    );
};

export default CategoryList;
