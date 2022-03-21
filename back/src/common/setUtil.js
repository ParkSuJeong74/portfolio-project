class setUtil {
    static compareValue(toUpdate, model) {
        let updateObject = {}

        Object.entries(toUpdate)
            .forEach((element) => {
                if (element[1] !== model[element[0]])
                    updateObject[element[0]] = element[1]
            })

        return updateObject
    }
}

module.exports = { setUtil }
