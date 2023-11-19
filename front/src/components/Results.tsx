import React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { groups } from '@/utils/groups'

interface Result {
	id: number
	date: string
	group: string
	animal: string
}

const RecentResults: React.FC<{ results: Result[] }> = ({ results }) => {
	return (
		<div>
			<Typography variant='h5'>Últimos Resultados:</Typography>
			<List>
				{results.map((result) => (
					<ListItem key={result.id} sx={{ padding: '0' }}>
						<Typography variant='body1'>
							<strong> Rodada:</strong> {result.date} | Grupo ({result.group})
						</Typography>
					</ListItem>
				))}
			</List>
		</div>
	)
}

export default RecentResults
