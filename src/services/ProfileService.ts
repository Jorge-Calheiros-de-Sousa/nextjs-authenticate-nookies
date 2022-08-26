import axios from 'axios';

type DataLogin = {
    email: string
    password: string
}

type DataRegister = {
    name: string
    email: string
    phone: string
    password: number | string
    confirmPassword: number | string
    description: null | string
    linkedin: string
    github: string
}

type DataUpdate = {
    name: string
    email: string
    phone: string
    password: number | string
    description: null | string
    linkedin: string
    github: string
}

class ProfileService {
    baseUrl: string
    constructor() {
        this.baseUrl = 'http://localhost:8080/api'
    }

    async get(token: string) {
        try {
            const response = await axios(`${this.baseUrl}/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return [response.data, false];
        } catch (error) {
            return [null, error]
        }
    }

    async login(data: DataLogin) {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/login`, data)
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async logout(token: string) {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/logout`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return [response.data, false]
        } catch (error) {
            return [null, error]
        }
    }

    async register(data: DataRegister) {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/register`, data);
            return [response.data, false];
        } catch (error) {
            return [null, error];
        }
    }

    async update(data: DataUpdate, id: number | string, token: string) {
        try {
            const response = await axios.put(`${this.baseUrl}/user/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return [response.data, false];
        } catch (error) {
            return [null, error]
        }
    }
}

export default new ProfileService;