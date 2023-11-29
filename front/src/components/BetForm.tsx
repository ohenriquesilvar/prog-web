'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { Button, InputAdornment, Typography } from '@mui/material'
import Image from 'next/image'

import { groups } from '@/utils/groups'
import { BetService } from '@/services/BetService'
import { AuthService } from '@/services/AuthService'

interface BetFormProps {}

const BetForm: React.FC<BetFormProps> = () => {
	const [betValue, setBetValue] = useState<string>('')
	const [betGroup, setBetGroup] = useState<string>('')
	const [betRound, setBetRound] = useState<number>()
	const [roundsList, setRoundsList] = useState<
		{ label: string; value: number }[]
	>([])
	const [cpf, setCpf] = useState<string>('')

	const handleAmountChange = (event: any) => {
		// Remove caracteres não numéricos (exceto ponto e vírgula) e formata como moeda
		const formattedAmount = event.target.value
			.replace(/[^\d.,]/g, '')
			.replace(',', '.') // Substitui vírgula por ponto para permitir números decimais
			.replace(/(\..*?)\..*/g, '$1') // Remove múltiplos pontos decimais

		setBetValue(formattedAmount)
	}

	const handleBetGroupChange = (event: any) => {
		setBetGroup(event.target.value as string)
	}

	const fetchRounds = async () => {
		const { rounds } = await BetService.getRounds()
		setRoundsList(
			rounds.map((round) => ({ label: round.date, value: round.id }))
		)
	}

	const handleSubmit = async () => {
		const bet = {
			value: parseFloat(betValue),
			group: Number(betGroup),
			round_id: betRound ?? 0,
			cpf: '12345678910',
		}

		const res = await BetService.createBet(bet)
		if (res) {
			window.location.href = '/'
		}
	}

	useEffect(() => {
		if (!AuthService.isAuthenticated()) {
			window.location.href = '/login'
		}
		setCpf(AuthService.getUser()?.cpf ?? '')
		fetchRounds()
	}, [])

	return (
		<form
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Image
				alt=''
				width={400}
				height={300}
				src='/grupos.jpeg'
				style={{
					margin: '10px 0 10px 0',
				}}
			/>
			<Typography variant='caption'>
				Os grupos são representados pelos números em vermelho na imagem
			</Typography>

			<TextField
				label='Valor em Reais'
				variant='outlined'
				value={betValue}
				onChange={handleAmountChange}
				sx={{ width: '100%', marginTop: '10px', textAlign: 'start' }}
				InputProps={{
					startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
				}}
			/>

			<FormControl
				variant='outlined'
				style={{ margin: '8px', width: '100%', textAlign: 'start' }}
			>
				<InputLabel id='bet-group-label'>Grupo da Aposta</InputLabel>
				<Select
					labelId='bet-group-label'
					id='bet-group'
					value={betGroup}
					onChange={handleBetGroupChange}
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

			<FormControl
				variant='outlined'
				style={{ margin: '8px', width: '100%', textAlign: 'start' }}
			>
				<InputLabel id='bet-group-label'>Rodada da aposta</InputLabel>
				<Select
					value={betRound}
					onChange={(e) => setBetRound(e.target.value as number)}
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

			<Button
				variant='contained'
				color='primary'
				style={{ margin: '10px' }}
				disabled={!betValue || !betGroup || !betRound}
				onClick={() => handleSubmit()}
			>
				Confirmar
			</Button>
		</form>
	)
}

export default BetForm
