//Выводит сообщение об ошибки в формате:
//Error: {Дата и время} File: {Название файла} Message: {Сообщение об ошибке}
module.exports.error = (err, fileName) => {
    console.error(`Error: ${date()} File: ${fileName} Message: ${err.message}`)
}

//Выводит сообщение в формате:
//{Дата и время} File: {Название файла} Conversion time: {Время конвертации, если есть}
module.exports.message = (fileName, time) => {
    console.log(`${date()} File: ${fileName} ${time ? 'Conversion time: ' + time + 'ms' : ''}`)
}

const date = () => {
    const now = new Date()
    return `${day(now)} ${time(now)}`
}

const formatTime = (date) => {
    if (date < 10) {
        return '0' + date
    }
    return date
}

const day = (now) => {
    return `${formatTime(now.getDate())}:${formatTime(now.getMonth() + 1)}:${now.getFullYear()}`
}

const time = (now) => {
    return `${formatTime(now.getHours())}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())}`
}