import { AuthService } from '@/services/AuthService'
import { BetService } from '@/services/BetService'
import { groups } from '@/utils/groups'
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import { use, useEffect, useState } from 'react'

export const AdminCard = () => {
	const [admin, setAdmin] = useState<boolean>()
	const [roundDate, setRoundDate] = useState<string>(new Date().toString())
	const [roundId, setRoundId] = useState<number>()
	const [group, setGroup] = useState<number>()
	const [roundsList, setRoundsList] = useState<
		{ label: string; value: number }[]
	>([])

	const fetchRounds = async () => {
		const { rounds } = await BetService.getRounds()
		setRoundsList(
			rounds.map((round) => ({ label: round.date, value: round.id }))
		)
	}

	useEffect(() => {
		const admin = AuthService.getUser()?.admin ?? false
		setAdmin(admin)

		fetchRounds()
	}, [])

	const handleSubmit = async () => {
		const round = {
			date: new Date(roundDate),
		}
		const res = await BetService.createRound(round)
		if (res) {
			window.location.href = '/'
		}
	}

	const handleResultSubmit = async () => {
		const result = {
			group: group ?? 0,
			round_id: roundId ?? 0,
		}

		const res = await BetService.createResult(result)
		if (res) {
			window.location.href = '/'
		}
	}

	if (!admin) return null

	return (
		<>
			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<Typography variant='h6'>Nova Rodada</Typography>
				<TextField
					label='Data da rodada'
					placeholder='dd/mm/aaaa'
					hiddenLabel
					variant='outlined'
					value={roundDate}
					type='date'
					onChange={(e) => setRoundDate(e.target.value)}
					sx={{ width: '100%', marginTop: '10px', textAlign: 'start' }}
				/>

				<Button
					variant='contained'
					color='primary'
					style={{ margin: '10px' }}
					disabled={Date.parse(roundDate) < Date.now()}
					onClick={() => handleSubmit()}
				>
					Confirmar
				</Button>
			</form>
			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<Typography variant='h6'>Novo Resultado</Typography>

				<FormControl
					variant='outlined'
					style={{ margin: '8px', width: '100%', textAlign: 'start' }}
				>
					<InputLabel id='bet-group-label'>Rodada da aposta</InputLabel>
					<Select
						value={roundId}
						onChange={(e) => setRoundId(e.target.value as number)}
						label='Rodada da aposta'
						placeholder='Selecione uma rodada'
						MenuProps={{
							style: {
								maxHeight: '250px',
								marginTop: '20px',
							},
						}}
					>
						{roundsList.map((round) => (
							<MenuItem key={round.value} value={round.value}>
								Rodada {round.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl
					variant='outlined'
					style={{ margin: '8px', width: '100%', textAlign: 'start' }}
				>
					<InputLabel id='bet-group-label'>Grupo da Aposta</InputLabel>
					<Select
						labelId='bet-group-label'
						id='bet-group'
						value={group}
						onChange={(e) => setGroup(e.target.value as number)}
						label='Grupo da Aposta'
						placeholder='Selecione um grupo'
						MenuProps={{
							style: {
								maxHeight: '250px',
								marginTop: '20px',
							},
						}}
					>
						{groups.map((animal) => (
							<MenuItem key={animal.key} value={animal.key}>
								Grupo {animal.key} - {animal.animal}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Button
					variant='contained'
					color='primary'
					style={{ margin: '10px' }}
					disabled={!group || !roundId}
					onClick={() => handleResultSubmit()}
				>
					Confirmar
				</Button>
			</form>
		</>
	)
}
