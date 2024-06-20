import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Paper, Container, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createProduct, fetchCategory } from '../../api/index.js';

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
        // currency: '',
        productCategory: '',
    });
    const [categories, setCategories] = useState([]);

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

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productData.name || !productData.description || !productData.price || !productData.productCategory) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await createProduct(productData);
            history.push('/productslist');
        } catch (error) {
            console.error('Error during product creation:', error);
            alert("Failed to create product. Check console for more details.");
        }
    };

    return (
        <Container>
            <Paper className={classes.formContainer}>
                <form onSubmit={handleSubmit}>
                    {/* Existing fields remain unchanged */}
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
                    <TextField
                        className={classes.field}
                        label="Price"
                        variant="outlined"
                        fullWidth
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                    />
                    {/* <TextField
                        className={classes.field}
                        label="Currency"
                        variant="outlined"
                        fullWidth
                        name="currency"
                        value={productData.currency}
                        onChange={handleChange}
                    /> */}
                    <FormControl variant="outlined" fullWidth className={classes.field}>
                        <InputLabel>Product Category</InputLabel>
                        <Select
                            value={productData.productCategory}
                            onChange={handleChange}
                            label="Product Category"
                            name="productCategory"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default AddProduct;
