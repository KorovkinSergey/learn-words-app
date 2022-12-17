import { Modal } from '@mui/material'
import { Portal } from '@mui/base'
import React from 'react'
import Box from '@mui/material/Box'

export interface PopupProps {
	open: boolean
	handleClose: () => void
	children: React.ReactNode
}

const Popup: React.FC<PopupProps> = ({ open, handleClose, children }) => {
	return (
		<Portal disablePortal={!open}>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box>{children}</Box>
			</Modal>
		</Portal>
	)
}

export default Popup
