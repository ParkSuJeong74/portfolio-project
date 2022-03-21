class timeUtil {
    static getTime(){
        const timezoneOffset = new Date().getTimezoneOffset() * 60000
        const time = new Date(Date.now() - timezoneOffset)
        return time
    }
    static getDay({ totalTime }){
        const day = req.body.totalTime.split("T")[0]
        return day
    }
}

module.exports = { timeUtil }