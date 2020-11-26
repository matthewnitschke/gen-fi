module.exports = (input) => {
    let numbers = parseInt(/\d+/gm.exec(input)[0])
    let letters = (/[A-z ]+/gm.exec(input)[0]).replace(/[ ]/gm, '')

    if (letters == "day" || letters == "days"){
        return numbers * 86400000
    } else if (letters == "hr" || letters == "hrs" || letters == "hour" || letters == "hours"){
        return numbers * 3600000
    } else if (letters == "min" || letters == "minute" || letters == "minutes") {
        return numbers * 60000
    } else if (letters == "sec" || letters == "second" || letters == "seconds"){
        return numbers * 1000
    }
}