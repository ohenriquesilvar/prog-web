import { Box } from '@mui/material'

export const Card = ({ children }: { children: React.ReactNode }) => (
	<Box
		style={{
			boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
			backgroundColor: 'white',
			width: '100%',
			padding: '20px',
			gap: '10px',
			borderRadius: '10px',
			justifyContent: 'center',
			textAlign: 'center',
			boxSizing: 'border-box',
		}}
	>
		{children}
	</Box>
)
