const MejaDetail = ({params}: {params: {mejaId: string}}) => {
    return (
        <div>
        Meja {params.mejaId[1]}
        </div>
    )
}

export default MejaDetail
