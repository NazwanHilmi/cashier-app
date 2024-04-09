const StokDetail = ({params}: {params: {StokId: string}}) => {
    return (
        <div>
        Stok {params.StokId[1]}
        </div>
    )
}

export default StokDetail
