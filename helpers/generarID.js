
const generarID = () => {
    const date = Date.now().toString(32)
    const random = Math.random().toString(32).split('.')[1]

    return date + random;
}
module.exports = generarID;
