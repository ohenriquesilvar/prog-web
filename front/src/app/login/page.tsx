'use client'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AuthService } from '@/services/AuthService'

export default function SignIn() {
	const  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		console.log({
			cpf: data.get('cpf'),
			password: data.get('password'),
		})

		AuthService.login({
			cpf: data.get('cpf') as string,
			name: '',
			email: '',
			password: data.get('password') as string,
		}).then((res) => {
			if (res) {
				window.location.href = '/'
			}
		}).catch((err) => {
			console.log('err:')
			console.log(err)
		})
	}

	const theme = createTheme({
		palette: {
			mode: 'light',
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						boxShadow: ' 0px 0px 10px 0px rgba(0,0,0,0.75)',
						padding: '20px',
						borderRadius: '10px',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Logar
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							id='cpf'
							label='CPF'
							name='cpf'
							autoComplete='cpf'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Senha'
							type='password'
							id='password'
							autoComplete='current-password'
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Entrar
						</Button>
						<Grid container>
							<Grid item>
								<Link href='/cadastro' variant='body2'>
									Cadastre-se
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}
