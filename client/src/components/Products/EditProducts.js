import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, TextField, Paper, Container, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchProductById, updateProduct, fetchCategory } from '../../api/index';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: theme.spacing(3),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
}));

function EditProduct() {
    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        productCategory: '',
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data: product } = await fetchProductById(id);
                const { data: categoryData } = await fetchCategory();
                setCategories(categoryData);
                setProductData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    productCategory: product.productCategory?._id
                });
                // console.log(productData, "productvalues")
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchDetails();
    }, [id]);

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, productData);
            history.push('/productslist');
        } catch (error) {
            console.error('Update error:', error);
            alert("Failed to update product. Check console for more details.");
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
                        Update
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default EditProduct;
