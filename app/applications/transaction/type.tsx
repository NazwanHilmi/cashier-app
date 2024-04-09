'use client'

type Type = {
    id: number;
    nama_jenis: string;
}

const styles = {
    item: "py-1 px-4 bg-white text-slate-700 rounded-full cursor-pointer shadow-md font-bold hover:bg-blue-primary hover:text-white transition",
    active: "py-1 px-4 bg-blue-primary text-white rounded-full cursor-pointer shadow-md font-bold hover:bg-opacity-80 transition"
}

const Type = ({ type, selectedType, handleSelectType }: { type: Type[], selectedType: string, handleSelectType: (category: string) => boolean }) => {
    const handleClick = (category: string) => {
        handleSelectType(category)

        return true
    }
    return (
        <div className="flex flex-wrap items-center justify-start gap-3 w-full py-4 space-x-4 mb-5">
            <div onClick={() => handleClick("Semua")} className={selectedType == 'Semua' ? styles.active : styles.item}>
                Semua
            </div>
            {type.map((item, index) => (
                <div key={index} onClick={() => handleClick(item.nama_jenis)} className={selectedType == item.nama_jenis ? styles.active : styles.item}>
                    {item.nama_jenis}
                </div>
            ))}
        </div>
    )
}

export default Type