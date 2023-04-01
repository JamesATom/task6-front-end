import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

export default function Main() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [typed, setTyped] = useState(false);

    useEffect(() => {
        setTyped(name ? false : true);
    }, [name]);

    const handleFocusOrNext = () => {
        window.localStorage.setItem('curUser', name);
        navigate('/dashboard');
    }
    
    return (
        <div>
            <Paper 
                elevation={6}
                sx={{
                    width: 300,
                    mx: 'auto', 
                    py: 3,
                    px: 2, 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    borderRadius: '1em',
                    boxShadow: 'md',
                }}>
                <div style={{ marginBottom: '40px', border: '1px solid black', borderRadius: '10px' }}>
                    <Typography level="h4" component="h1">
                        Welcome!
                    </Typography>
                    <Typography level="body2">Enter your name to continue.</Typography>
                </div>
                <FormControl>
                    <TextField
                        autoComplete='off'
                        name="name"
                        type="name"
                        variant='outlined'
                        label='Name'
                        color='success'
                        helperText="Please enter your name"
                        required={true}
                        value={name}
                        onChange={({target}) => setName(target.value)} />
                </FormControl>
                <Button variant="outlined" color='info' disabled={typed} onClick={handleFocusOrNext}>Next</Button>
            </Paper>
        </div>
    );
}
