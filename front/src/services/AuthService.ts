export class AuthService {
	private static USER_KEY = 'user'

	static login(user: User): void {
		localStorage.setItem(AuthService.USER_KEY, JSON.stringify(user))
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
}

interface User {
	name: string
	email: string
}
