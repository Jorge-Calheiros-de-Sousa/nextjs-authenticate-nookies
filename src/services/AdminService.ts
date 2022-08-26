import axios from "axios"

class AdminService {
    baseUrl: string
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/adm'
    }

    async allUsers(token: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return [response.data, false]
        } catch (error) {
            return [null, error]
        }
    }

    async user(token: string, id: number | string) {
        try {
            const response = await axios.get(`${this.baseUrl}/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return [response.data, false]
        } catch (error) {
            return [null, error]
        }
    }
}

export default new AdminService