import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addClient } from '../../api/index';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: theme.spacing(3),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
}));

function AddClient() {
    const classes = useStyles();
    const history = useHistory();
    const [clientData, setClientData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addClient(clientData);
            history.push('/customerlist');
        } catch (error) {
            console.error('Error during client creation:', error);
            alert("Failed to create client. Check console for more details.");
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
                        value={clientData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.field}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={clientData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.field}
                        type='number'
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        value={clientData.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.field}
                        label="Address"
                        variant="outlined"
                        fullWidth
                        name="address"
                        value={clientData.address}
                        onChange={handleChange}
                    />
                    <Button type="submit" color="primary" variant="contained">
                        Create Client
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default AddClient;
