// @ts-ignore
export function validator(data, config) {
    const errors = {}
    const { oldPassword, newPassword, confirmThePassword } = data
    // @ts-ignore
    // eslint-disable-next-line consistent-return
    function validate(validateMethod, data, config) {
        let statusValidate
        switch (validateMethod) {
            case 'isRequired': {
                if (typeof data === 'boolean') {
                    statusValidate = !data
                } else {
                    statusValidate = data.trim() === ''
                }
                break
            }
            case 'isEmail': {
                const emailRegExp = /^\S+@\S+\.\S+$/g
                statusValidate = !emailRegExp.test(data)
                break
            }
            case 'isCapitalSymbol': {
                const capitalRegExp = /[A-Z]+/g
                statusValidate = !capitalRegExp.test(data)
                break
            }
            case 'isContainDigit': {
                const digitRegExp = /\d+/g
                statusValidate = !digitRegExp.test(data)
                break
            }
            case 'min': {
                statusValidate = data.length < config.value
                break
            }
            case 'number': {
                const numberRegExp = /^\d+$/
                statusValidate = !numberRegExp.test(data)
                break
            }
            case 'confirmThePassword': {
                if (newPassword !== confirmThePassword) statusValidate = true
                break
            }
            case 'confirmTheNewPassword': {
                if (newPassword === oldPassword) statusValidate = true
                break
            }
            default:
                break
        }
        if (statusValidate) return config.message
    }

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const fieldName in data) {
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod],
            )
            // @ts-ignore
            if (error && !errors[fieldName]) {
                // @ts-ignore
                errors[fieldName] = error
            }
        }
    }
    return errors
}
