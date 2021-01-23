export default function validateInfo(city, setIsSubmitted) {
    let errors = {}

    if(!city) {
        errors.city = 'City name is required!';
        setIsSubmitted(false)
    }
    return errors
}