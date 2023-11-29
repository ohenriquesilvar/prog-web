'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box, Link } from '@mui/material'
import { AuthService, User } from '@/services/AuthService'

interface RegistrationFormProps {
	onRegister: (userData: User) => void
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
	const [userData, setUserData] = useState<User>({
		name: '',
		email: '',
		password: '',
		cpf: '',
		password_confirmation: '',
	})

	const [formErrors, setFormErrors] = useState<User>({
		name: '',
		email: '',
		password: '',
		cpf: '',
		password_confirmation: '',
	})

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setUserData((prevData) => ({
			...prevData,
			[name]: name === 'cpf' ? value.replace(/\D/g, '') : value,
		}))
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		if (!validateForm()) return

		AuthService.register(userData)
			.then((response) => {
				if (response) {
					window.location.href = '/login'
				}
			})
			.catch((err) => {
				setFormErrors((prevData) => ({
					...prevData,
					[err.field]: err.message,
				}))
			})
	}

	const validateForm = (): boolean => {
		setFormErrors((prevData) => ({
			name: '',
			email: '',
			password: '',
			cpf: '',
			password_confirmation: '',
		}))

		if (!userData.cpf || userData.cpf.length != 11) {
			setFormErrors((prevData) => ({
				...prevData,
				cpf: 'O CPF deve ter 11 caracteres',
			}))
			return false
		}
		if (!userData.name || userData.name.length < 2) {
			setFormErrors((prevData) => ({
				...prevData,
				name: 'O nome deve ter no mínimo 2 caracteres',
			}))
			return false
		}
		if (!userData.password || userData.password.length < 8) {
			setFormErrors((prevData) => ({
				...prevData,
				password: 'A senha deve ter no mínimo 8 caracteres',
			}))
			return false
		}
		if (userData.password !== userData.password_confirmation) {
			setFormErrors((prevData) => ({
				...prevData,
				password_confirmation: 'As senhas não conferem',
			}))
			return false
		}
		return true
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
				label='CPF'
				variant='outlined'
				name='cpf'
				value={userData.cpf}
				onChange={handleInputChange}
				fullWidth
				margin='normal'
				error={formErrors.cpf !== ''}
				helperText={formErrors.cpf}
			/>
			<TextField
				label='Nome'
				variant='outlined'
				name='name'
				value={userData.name}
				onChange={handleInputChange}
				fullWidth
				margin='normal'
				error={formErrors.name !== ''}
				helperText={formErrors.name}
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
				error={formErrors.email !== ''}
				helperText={formErrors.email}
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
				error={formErrors.password !== ''}
				helperText={formErrors.password}
			/>
			<TextField
				label='Confirmação de Senha'
				variant='outlined'
				type='password'
				name='password_confirmation'
				value={userData.password_confirmation}
				onChange={handleInputChange}
				fullWidth
				margin='normal'
				error={formErrors.password_confirmation !== ''}
				helperText={formErrors.password_confirmation}
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
