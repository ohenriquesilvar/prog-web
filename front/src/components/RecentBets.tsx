import React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { groups } from '@/utils/groups'

interface Bet {
	id: number
	amount: string
	group: string
	round: string
}

const RecentBets: React.FC<{ bets: Bet[] }> = ({ bets }) => {
	return (
		<div>
			<Typography variant='h5'>Últimas Apostas:</Typography>
			<List>
				{bets.map((bet) => (
					<ListItem key={bet.id} sx={{ padding: '0' }}>
						<Typography variant='body1'>
							<strong> Rodada:</strong> {bet.round} | Grupo {bet.group} (
							{groups.find((a) => a.key === bet.group)?.animal}) |{' '}
							<strong> R$ {bet.amount} </strong>
						</Typography>
					</ListItem>
				))}
			</List>
		</div>
	)
}

export default RecentBets
