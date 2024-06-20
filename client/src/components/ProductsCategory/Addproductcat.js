import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createCategory } from '../../api/index.js';  // Only import what's needed

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: theme.spacing(3),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
}));

function AddProduct() {
    const classes = useStyles();
    const history = useHistory();
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        color: '',
    });

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategory(productData);
            history.push('/product-categories');  // Redirects the user to the products page after creating a product
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container>
            <Paper className={classes.formContainer}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className={classes.field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.field}
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                    />
                    {/* <TextField
                        className={classes.field}
                        label="Price"
                        variant="outlined"
                        fullWidth
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                    /> */}
                    <TextField
                        className={classes.field}
                        label="color"
                        variant="outlined"
                        fullWidth
                        name="color"
                        value={productData.color}
                        onChange={handleChange}
                    />
                    <Button type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default AddProduct;
