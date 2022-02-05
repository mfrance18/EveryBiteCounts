export const formatDate = (dateStr) => {
    const year = dateStr.slice(0, 4)
    const month = dateStr.slice(5, 7)
    const day = dateStr.slice(8, 10)

    const dateFormat = month + "/" + day + "/" + year

    return dateFormat
};