import React, { useEffect } from 'react';

export default function DataTablePage({ products } : {products: any}) {
 useEffect(() => {
    if (typeof window !== 'undefined') {
      window.$('#example').DataTable({
        responsive: true,
      }).columns.adjust().responsive.recalc();
    }
 }, []);

 return (
    <div>

    </div>
 );