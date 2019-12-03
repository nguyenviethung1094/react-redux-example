function checkPhoneNumber (strNumber) {
    const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g
    if (!strNumber) {
        return false
    }
    return phoneRegex.test(strNumber) 
}
export default checkPhoneNumber