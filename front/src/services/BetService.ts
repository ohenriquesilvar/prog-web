import axios from 'axios'
import { AuthService } from './AuthService'
const baseUrl = 'http://localhost:8000'

interface Bet {
	cpf: string
	round_id: number
	group: number
	value: number
}

interface Round {
	id: number
	date: string
}

interface Rounds {
	rounds: Round[]
}

export interface GetBet {
	id: number
	round: string
	group: number
	value: number
}

export interface Result {
	id: number
	round: string
	group: number
}

export class BetService {
	static createBet(bet: Bet) {
		return axios
			.post(`${baseUrl}/bet/create`, JSON.stringify(bet))
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

	static getRounds(): Promise<Rounds> {
		return axios
			.get(`${baseUrl}/rounds`)
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				return Promise.reject({
					field: err.response.data.field,
					message: err.response.data.message,
				})
			})
	}

	static getBets(): Promise<{
		bets: GetBet[]
	}> {
		return axios
			.get(`${baseUrl}/bets?cpf=${AuthService.getUser()?.cpf}`)
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				return Promise.reject({
					field: err.response.data.field,
					message: err.response.data.message,
				})
			})
	}

	static getResults(): Promise<{ results: Result[] }> {
		return axios
			.get(`${baseUrl}/results`)
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				return Promise.reject({
					field: err.response.data.field,
					message: err.response.data.message,
				})
			})
	}

	static createResult(result: { round_id: number; group: number }) {
		return axios
			.post(`${baseUrl}/result`, JSON.stringify(result))
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

	static createRound(round: { date: Date }) {
		return axios
			.post(`${baseUrl}/round`, JSON.stringify(round))
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
