export function displayDate(data: number) {
    // @ts-ignore
    const date = new Date(parseInt(data, 10))
    const dateNow = new Date()
    const yearDif = dateNow.getFullYear() - date.getFullYear()
    if (yearDif === 0) {
        const dayDif = dateNow.getDay() - date.getDay()
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours()
            if (hourDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes()

                if (minutesDif >= 0 && minutesDif < 5) return '1 минуту назад'
                if (minutesDif >= 5 && minutesDif < 10) return '5 минут назад'
                if (minutesDif >= 10 && minutesDif < 30) {
                    return '10 минут назад'
                }
                return '30 минут назад'
            }
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return `Сегодня в ${date.getHours()}:${helper(date.getMinutes())}${date.getMinutes()}`
        }

        return date.toLocaleString('ru-RU')
    }
    return (
        `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    )
}

function helper(min: number) {
    if (min < 10) {
        return 0
    }
    return ''
}
