import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

import './table.css'
import axios from 'axios';


class View extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.getSavedData();
    }


    getSavedData = async () => {
 
        axios.get("http://localhost:5000/data").then((res)=>{
            // console.log(res.data);
            this.setState({data:res.data})
        }).catch(err=>console.log(err));
         
    }
     deleted=(id)=>{
        axios.delete(`http://localhost:5000/savedata/${id}`).then((res)=>{
            this.setState({data:res.data})
        }).catch(err=>console.log(err));
     }
    render() {
        const { data } = this.state;


        return (
            <div>
                <div className="TableContainer" component={Paper}>
                    <div className="heading">
                        SAVED DATA TABLE

                    </div>
                    <Table className="Table" aria-label="simple table" stickyHeader>

                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row._id}>
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

                                        <button className="view-btn" onClick={()=>this.deleted(row._id)}>DELETE</button>
                                    </TableCell>
                                    <TableCell align="center">${row.current_price.toFixed(2)}
                                        <p>USD</p>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="heading">
                        <Link to="/"><button className="view-btn backBtn">BACK</button></Link>

                    </div>
                </div>


            </div>
        )

    }
}

export default View