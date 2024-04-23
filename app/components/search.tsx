const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value.length > 0) {
        const newData = data.filter((data) => data.name.toLowerCase().includes(value))

        setData(newData)
    } else {
        setData(product)
    }


    setSearch(value)
}