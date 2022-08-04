import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';  
import TablePaginationDemo from './pagination';

import Button from '@mui/material/Button';
import './table.css';
import axios from "axios";


const DynamicTable = () => {
    const [data, setData] = React.useState([]);
    const [saveddata, setSavedData] = React.useState([]);

    const [search, setSearch] = React.useState('');

    const [btnSaved, setButton] = React.useState(false);
    
    React.useEffect(() => {

        axios
            .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then((res) => {
                setData(res.data);

            })
            .catch((error) => {
                console.log(error);
            });

        axios.get("http://localhost:5000/data").then((res) => {
            console.log(res.data);
            setSavedData(res.data)
        }).catch(err => console.log(err));

    }, []);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const filteredData = data.filter(each => each.name.toLowerCase().includes(search.toLowerCase()))

    const selected = (name, symbol, market_cap, current_price) => {
        // console.log("clicked")
        axios.post("http://localhost:5000/savedata", { name, symbol, market_cap, current_price }).then(() => {
            // console.log("done")
        }).catch((err) => console.log(err));

        setButton(true);

    }

    
    return (
        <>
        
        <div className="TableContainer" component={Paper}>
            <div className="searchBox">
                <p align="center">Stock Details Table</p>

                <div>

                    <input type="text" value={search} placeholder='Search by Company Name' onChange={handleChange} />
                </div>
                <Button href="/view" className='Button'>SAVED TABLES</Button>
            </div>
            <Table className="Table" aria-label="simple table" stickyHeader>
                <thead>
                    <TableRow sx={{ background: "#f0ebfc", color: "#615c6d" }}>
                        <TableCell align="center"> NAME</TableCell>
                        <TableCell align="center">SYMBOL</TableCell>
                        <TableCell align="center">MARKET CAP</TableCell>
                        <TableCell align="center">   </TableCell>
                         
                        <TableCell align="center">CURRENT PRICE</TableCell>

                    </TableRow>
                </thead>
                <TableBody>

                    {filteredData.slice(0, 5).map((row) => (
            <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">
                    <button className="symbol-btn">
                        {row.symbol}
                    </button>
                </TableCell>
                <TableCell align="center">${row.market_cap}</TableCell>

                <TableCell>

                    
                <button onClick={() => selected(row.name, row.symbol, row.market_cap, row.current_price)} 
                    className="view-btn">SAVE</button>
                  </TableCell>

                   
                <TableCell align="center">${row.current_price.toFixed(2)}
                    <p>USD</p>
                </TableCell>

            </TableRow>
        ))}
    </TableBody>
</Table>

        <TablePaginationDemo/>
        </div>
        </>
    )
}
export default DynamicTable;