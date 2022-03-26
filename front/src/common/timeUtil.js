export class TimeUtil {
    static getTime(UTCTime) {
        const timezoneOffset = new Date().getTimezoneOffset() * 60000
        const kstTime = new Date(UTCTime - timezoneOffset)
        return kstTime
    }
}
