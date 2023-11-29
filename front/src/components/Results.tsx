import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { groups } from '@/utils/groups'
import { BetService, Result } from '@/services/BetService'

const RecentResults = () => {
	const [results, setResults] = React.useState<Result[]>([])
	const fetchResults = async () => {
		const { results } = await BetService.getResults()
		setResults(results)
	}

	useEffect(() => {
		fetchResults()
	}, [])

	return (
		<div>
			<Typography variant='h5'>Últimos Resultados:</Typography>
			<List>
				{results.map((result) => (
					<ListItem key={result.id} sx={{ padding: '0' }}>
						<Typography variant='body1'>
							<strong> Rodada:</strong> {result.round} | Grupo {result.group} (
							{groups.find((a) => Number(a.key) === result.group)?.animal})
						</Typography>
					</ListItem>
				))}
			</List>
		</div>
	)
}

export default RecentResults
