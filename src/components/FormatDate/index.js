export function formatDate(data) {
    const date = new Date(data)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    const formatted = `${day}/${month}/${year}`

    return (formatted)
}; 