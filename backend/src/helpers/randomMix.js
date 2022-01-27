module.exports = (arr) => {
    if (arr.length <= 1) {
        return arr
    }
    for (let i = 0; i < arr.length; i++) {
        index1 = Math.floor(Math.random() * arr.length)
        index2 = Math.floor(Math.random() * arr.length)
        n = arr[index1]
        arr[index1] = arr[index2]
        arr[index2] = n
    }
    return arr
}
