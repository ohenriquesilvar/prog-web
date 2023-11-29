import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { groups } from '@/utils/groups'
import { BetService, GetBet } from '@/services/BetService'

const RecentBets = () => {
	const [bets, setBets] = useState<GetBet[]>([])

	const fetchBets = async () => {
		const { bets } = await BetService.getBets()
		setBets(bets)
	}

	React.useEffect(() => {
		fetchBets()
	}, [])

	return (
		<div>
			<Typography variant='h5'>Últimas Apostas:</Typography>
			<List>
				{bets.map((bet) => (
					<ListItem key={bet.group} sx={{ padding: '0' }}>
						<Typography variant='body1'>
							<strong> Rodada:</strong> {bet.round} | Grupo {bet.group} (
							{groups.find((a) => Number(a.key) === bet.group)?.animal}) |{' '}
							<strong> R$ {bet.value} </strong>
						</Typography>
					</ListItem>
				))}
			</List>
		</div>
	)
}

export default RecentBets
