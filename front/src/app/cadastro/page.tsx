'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box, Link } from '@mui/material'

interface RegistrationFormProps {
	onRegister: (userData: UserData) => void
}

interface UserData {
	name: string
	email: string
	password: string
	cpf: string
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
	const [userData, setUserData] = useState<UserData>({
		name: '',
		email: '',
		password: '',
		cpf: '',
	})

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		// Validar e processar os dados, por exemplo, chamando a função onRegister
		onRegister(userData)
	}

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				width: '500px',
				margin: 'auto',
				justifyContent: 'center',
				boxShadow: ' 0px 0px 10px 0px rgba(0,0,0,0.75)',
				padding: '20px',
				borderRadius: '10px',
				marginTop: '100px',
				textAlign: 'center',
			}}
		>
			<Typography variant='h5' gutterBottom>
				Cadastro
			</Typography>
			<TextField
				label='Nome'
				variant='outlined'
				name='name'
				value={userData.name}
				onChange={handleInputChange}
				fullWidth
				margin='normal'
			/>
			<TextField
				label='E-mail'
				variant='outlined'
				type='email'
				name='email'
				value={userData.email}
				onChange={handleInputChange}
				fullWidth
				margin='normal'
			/>
			<TextField
				label='Senha'
				variant='outlined'
				type='password'
				name='password'
				value={userData.password}
				onChange={handleInputChange}
				fullWidth
				margin='normal'
			/>
			<TextField
				label='CPF'
				variant='outlined'
				name='cpf'
				value={userData.cpf}
				onChange={handleInputChange}
				fullWidth
				margin='normal'
			/>
			<Button
				type='submit'
				variant='contained'
				color='primary'
				fullWidth
				style={{ marginTop: '16px' }}
			>
				Cadastrar
			</Button>
			<Box marginTop='16px'>
				<Link href='/login' variant='body2'>
					Já tem uma conta? Faça login
				</Link>
			</Box>
		</form>
	)
}

export default RegistrationForm
