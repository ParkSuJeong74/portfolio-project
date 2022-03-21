class setUtil {
    static compareValues(toUpdate, model){
        let updateObject = {}
        
        Object.entries(toUpdate)
        .forEach((element) => {
            // 원래 데이터와 바꾸려는 데이터를 비교하여 바뀐 항목만 updatedObject에 추가
            if (element[1] !== model[element[0]])
                updateObject[element[0]] = element[1]
        })
        return updateObject
    }
}
module.exports = { setUtil }
