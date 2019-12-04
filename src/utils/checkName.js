import { checkUniqueName } from '../service'

function checkStoreName (name) {
    if (!name) return true
    checkUniqueName(name)
    .then((res) => {
        return res.data
    })
}

export default checkStoreName