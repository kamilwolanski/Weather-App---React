export default function addZero(x) {
    if(x.toString().length === 1) {
        return 0+x.toString()
    }

    return x
}