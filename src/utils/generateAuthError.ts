export function generateAuthError(message: string) {
    switch (message) {
        case 'INVALID_PASSWORD':
            return 'Email или пароль введены некорректно'
        case 'EMAIL_EXISTS':
            return 'Email или пароль введены некорректно'
        default:
            return 'Слишком много попыток входа. Попробуйте позднее'
    }
}
