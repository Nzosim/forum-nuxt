export function formatDate(date) {
    // Format the date to be displayed in the format: dd/mm/yyyy hh:mm
    const d = new Date(date)
    let day = d.getDate()
    if(day < 10) day = `0${day}`
    let month = d.getMonth() + 1   
    if(month < 10) month = `0${month}`
    const year = d.getFullYear()
    let hours = d.getHours()
    if(hours < 10) hours = `0${hours}`
    let minutes = d.getMinutes()
    if(minutes < 10) minutes = `0${minutes}`
    return `${day}/${month}/${year} ${hours}:${minutes}`
}