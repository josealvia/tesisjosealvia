import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import Header from './Header/Header'
import MainMenu from './MainMenu/MainMenu'
import Footer from './Footer/Footer'

const Layout = ({ children }) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Header setOpen={setOpen} />
			<MainMenu open={open} setOpen={setOpen} />
			<Container maxWidth='lg' className={classes.container}>
				{children}
			</Container>
			<Footer />
		</>
	)
}

export default Layout



