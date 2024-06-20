import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, TextField, Paper, Container } from '@material-ui/core';
import { fetchClientById1, updateClient, } from '../../api';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: theme.spacing(3),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
}));

function EditClient() {
    const { id } = useParams();
    console.log("Client ID from URL:", id);
    const classes = useStyles();
    const history = useHistory();
    const [clientData, setClientData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data } = await fetchClientById1(id);
                console.log("Fetched client:", data);
                if (data) {
                    setClientData({
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        address: data.address || '',
                    });
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchDetails();
    }, [id]);

    const handleChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateClient(id, clientData);
            history.push('/customerlist');
        } catch (error) {
            console.error('Update error:', error);
            alert("Failed to update client. Check console for more details.");
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
                        Update Customer
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default EditClient;
