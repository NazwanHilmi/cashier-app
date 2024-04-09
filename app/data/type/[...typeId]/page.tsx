const TypeDetail = ({params}: {params: {typeId: string}}) => {
    return (
        <div>
        Jenis {params.typeId[1]}
        </div>
    )
}

export default TypeDetail
