import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000'

export class AuthService {
	private static COOKIE_PASS =
		'd6fcc1345196f834dbcf5d8dca89cd5b27fb9cb9e454b99fdfbb25f35e64e223'
	private static USER_KEY = 'user'

	private static parseUser(user: any): User {
		return {
			cpf: user['cpf'],
			name: user['name'],
			email: user['email'],
		}
	}

	static async login(user: User): Promise<boolean> {
		const res = await axios.post(`${baseUrl}/login`, JSON.stringify(user))
		console.log(res.data['user'])
		if (res.data.status === 'error') {
			return false
		}
		this.setUser(AuthService.parseUser(res.data['user']), res.data['admin'])
		return true
	}

	static setUser(user: User, admin?: boolean): void {
		localStorage.setItem(
			AuthService.USER_KEY,
			JSON.stringify({
				cpf: user.cpf,
				name: user.name,
				email: user.email,
				admin: admin,
			})
		)
	}

	static logout(): void {
		localStorage.removeItem(AuthService.USER_KEY)
	}

	static isAuthenticated(): boolean {
		const user = localStorage.getItem(AuthService.USER_KEY)
		return !!user // Retorna true se houver um usuário no LocalStorage
	}

	static getUser(): User | null {
		const userString = localStorage.getItem(AuthService.USER_KEY)
		return userString ? JSON.parse(userString) : null
	}

	static register(user: User): Promise<boolean> {
		return axios
			.post(`${baseUrl}/register`, JSON.stringify(user))
			.then((res) => {
				if (res.data.status === 'error') {
					return false
				}
				return true
			})
			.catch((err) => {
				return Promise.reject({
					field: err.response.data.field,
					message: err.response.data.message,
				})
			})
	}
}
export interface User {
	cpf: string
	name?: string
	email?: string
	password?: string
	password_confirmation?: string
}
