import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    Paper, IconButton, Container, TableFooter, Button
} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { fetchCategory, deleteCategory } from '../../api/index.js'; // Ensure these imports match your API utility file structure
import { useHistory } from 'react-router-dom'; // Assuming you're using react-router for navigation

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    // Add more styles as required
});

function ProductCategoryTable() {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const history = useHistory();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { data } = await fetchCategory();
                setCategories(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        loadCategories();
    }, []);

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter((category) => category._id !== id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, categories.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleAddCategory = () => {
        history.push('/product-categories/add'); // Adjust the route as needed
    };

    const handleEditCategory = (id) => {
        history.push(`/product-categories/edit/${id}`);
    };

    return (
        <div className={classes.pageLayout}>

            <Container style={{ width: '85%' }}>

                <Button style={{ marginTop: '20px', marginBottom: '20px' }} variant="contained" color="primary" onClick={handleAddCategory} className={classes.addButton}>
                    Add Product Category
                </Button>

                <TableContainer component={Paper} elevation={0}>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Number</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : categories
                            ).map((row, index) => (
                                <TableRow key={row._id}>
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.color}</TableCell>
                                    <TableCell>
                                        <IconButton

                                            // onClick={() => console.log('Edit', row._id)}
                                            onClick={() => handleEditCategory(row._id)}


                                        >
                                            <BorderColorIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteCategory(row._id)}>
                                            <DeleteOutlineRoundedIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={5}
                                    count={categories.length}
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

        </div>
    );
}

export default ProductCategoryTable;
