import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, TextField, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchCategoryById, updateCategory } from '../../api/index';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: theme.spacing(3),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
}));

function EditProductCategory() {
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        color: '',
    });

    useEffect(() => {
        const fetchAndSetCategoryData = async () => {
            try {
                const { data } = await fetchCategoryById(id);
                if (data) {
                    setCategoryData({
                        name: data.name || '',
                        description: data.description || '',
                        color: data.color || '',
                    });
                }
                // console.log(categoryData, "categorydata")
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        if (id) {
            fetchAndSetCategoryData();
        }
    }, [id]);

    const handleChange = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategory(id, categoryData);
            history.push('/product-categories');  // Adjust the route as necessary
        } catch (error) {
            console.error('Error updating category:', error);
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
                        value={categoryData.name}
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
                        value={categoryData.description}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.field}
                        label="Color"
                        variant="outlined"
                        fullWidth
                        name="color"
                        value={categoryData.color}
                        onChange={handleChange}
                    />
                    <Button type="submit" color="primary" variant="contained">
                        Update
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default EditProductCategory;
