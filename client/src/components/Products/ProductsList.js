
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Container, IconButton, TableFooter } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { fetchProducts, deleteProduct } from '../../api'; // Ensure the path to your API functions is correct

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const history = useHistory();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { data } = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        loadProducts();
    }, []);

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product._id !== id));
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

    const handleAddProduct = () => {
        history.push('/addproduct');
    };

    const handleEditProduct = (id) => {
        history.push(`/products/edit/${id}`);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

    return (
        <Container style={{ width: '85%' }}>
            <Button style={{ marginTop: '20px', marginBottom: '20px' }} variant="contained" color="primary" onClick={handleAddProduct}>
                Add Product
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell> {/* New Column for Product Category */}
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={row._id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.productCategory ? row.productCategory.name : 'No Category'}</TableCell> {/* Display category name */}
                                <TableCell>
                                    <IconButton onClick={() => handleEditProduct(row._id)}>
                                        <BorderColorIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteProduct(row._id)}>
                                        <DeleteOutlineRoundedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={7} />
                        </TableRow>}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={7}
                                count={products.length}
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

export default ProductTable;
