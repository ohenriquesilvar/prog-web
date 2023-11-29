'use client'

import { Box, Stack, Typography } from '@mui/material'
import './global.css'
import BetForm from '@/components/BetForm'
import { Card } from '@/components/Card'
import RecentBets from '@/components/RecentBets'
import { recentBets } from '@/utils/recentBets'
import RecentResults from '@/components/Results'
import { results } from '@/utils/results'
import { AuthService } from '@/services/AuthService'

export default function Home() {
	const logout = () => {
		AuthService.logout()
		window.location.href = '/login'
	}

	return (
		<Box
			sx={{
				width: '100%',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					height: '45px',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'green',
					marginBottom: '20px',
					cursor: 'pointer',
				}}
			>
				<Typography
					onClick={() => logout()}
					style={{
						right: '20px',
						position: 'absolute',
						color: 'white',
					}}
				>
					Sair
				</Typography>
				<Typography variant='h6' color={'white'}>
					Bet do bicho
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'space-evenly',
				}}
			>
				<Box width={'40%'}>
					<Card>
						<Typography variant='h6'>Criar nova aposta</Typography>
						<BetForm />
					</Card>
				</Box>

				<Stack width={'40%'} spacing={2}>
					<Card>
						<RecentBets />
					</Card>

					<Card>
						<RecentResults />
					</Card>
				</Stack>
			</Box>
		</Box>
	)
}
