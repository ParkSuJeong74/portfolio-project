class setUtil {
    static compareValues(toUpdate, model) {
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
