const MenuDetail = ({params}: {params: {menuId: string}}) => {
    return (
        <div>
        Menu {params.menuId[1]}
        </div>
    )
}

export default MenuDetail
