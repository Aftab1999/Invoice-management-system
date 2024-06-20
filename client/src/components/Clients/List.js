import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Container, IconButton, TableFooter } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { fetchClients, deleteClient } from '../../api/index'; // Ensure the path to your API functions is correct

function ClientTable() {
    const [clients, setClients] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const history = useHistory();

    useEffect(() => {
        const loadClients = async () => {
            try {
                const { data } = await fetchClients();
                setClients(data.data); // Adjust according to the actual response structure
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        loadClients();
    }, []);

    const handleDeleteClient = async (id) => {
        try {
            await deleteClient(id);
            setClients(clients.filter(client => client._id !== id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddClient = () => {
        history.push('/addcustomer');
    };

    const handleEditClient = (id) => {
        history.push(`/editcustomer/${id}`);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, clients.length - page * rowsPerPage);

    return (
        <Container style={{ width: '85%' }}>
            <Button style={{ marginTop: '20px', marginBottom: '20px' }} variant="contained" color="primary" onClick={handleAddClient}>
                Add Customer
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={row._id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClient(row._id)}>
                                        <BorderColorIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteClient(row._id)}>
                                        <DeleteOutlineRoundedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={7}
                                count={clients.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ClientTable;
