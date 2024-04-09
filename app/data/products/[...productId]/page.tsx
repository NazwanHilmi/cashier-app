const ProductsDetail = ({params}: {params: {productsId: string}}) => {
    return (
        <div>
        Category {params.productsId[1]}
        </div>
    )
}

export default ProductsDetail
