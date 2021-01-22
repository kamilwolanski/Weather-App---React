export default function validateInfo(city) {
    let errors = {}

    if(!city) {
        errors.city = 'City name is required!'
    }
    return errors
}