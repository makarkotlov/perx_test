import React from 'react'
import { Helmet } from 'react-helmet'
import TablePage from './TablePage'
import './App.css'

const App = () => (
    <div className="App">
        <Helmet>
            <meta charSet="utf-8" />
            <title>PERX</title>
        </Helmet>
        <TablePage />
    </div>
)

export default App
