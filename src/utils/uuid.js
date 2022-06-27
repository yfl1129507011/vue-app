import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
    let uuid = localStorage.getItem('UUIDTOCKEN')
    if (!uuid) {
        uuid = uuidv4()
        localStorage.setItem('UUIDTOCKEN', uuid)
    }

    return uuid
}