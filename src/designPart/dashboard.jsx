import React, { useEffect, useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import randomName from '@scaleway/random-name';
import io from 'socket.io-client';
const socket = io.connect(`${process.env.REACT_APP_BACKEND_URL}`);

export default function Dashboard() {
    const navigate = useNavigate();
    const [recipient, setRecipient] = useState('');
    const [theme, setTheme] = useState('');
    const [body, setBody] = useState('');
    const [butRef, setButRef] = useState(true);
    const [allMessages, setAllMessages] = useState([]);
    const [dropDownNames, setDropDownNames] = useState([]);
   
    function allStorage() {
        let values = [], keys = Object.keys(localStorage), i = keys.length;
        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }
        return values;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await socket.emit('new_message', {
            sender: window.localStorage.getItem('curUser'),
            reciever: recipient,
            title: theme,
            body: body
        })
        let ranName = randomName();
        window.localStorage.setItem(ranName, recipient);
        setTimeout(() => {
            setButRef(prev => !prev);
        }, 1000);
    } 

    useEffect(() => {
        socket.emit('allHisMessages', { user: window.localStorage.getItem('curUser') });
        socket.on('allHisMessages', (data) => {
            setAllMessages(data);
        })
        console.log(allMessages, 'here');
    }, [window.localStorage.getItem('curUser'), butRef]);

    return (
        <div>
            <AppBar>
                <Toolbar sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        background: '#33ab9f'
                        }}>
                        <IconButton disableRipple><Typography variant='h6'>WEB CHAT SYSTEM</Typography></IconButton>
                        <IconButton onClick={() => {navigate('/')}}><LogoutIcon /></IconButton>
                </Toolbar>
            </AppBar>
            <Box marginY={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                <form style={{ width: '400px' }} onSubmit={handleSubmit}>
                    <Autocomplete 
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        options={dropDownNames}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Enter Recipient's name"
                                helperText="Please enter Recipient's name"
                                value={recipient}
                                onFocus={() => {setDropDownNames(allStorage())}}
                                onChange={({target}) => setRecipient(target.value)} />
                        )} />
                    <TextField
                        autoComplete='off'
                        name="name"
                        type="name"
                        variant='outlined'
                        label='Enter Theme'
                        color='info'
                        helperText="Please enter Theme"
                        value={theme}
                        onChange={({target}) => setTheme(target.value)}
                        sx={{
                            width: 400,
                            marginTop: '20px',
                        }} />
                    <TextField
                        id="outlined-multiline-static"
                        label="Body of the Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        helperText="Please enter your Message"
                        value={body}
                        onChange={({target}) => setBody(target.value)}
                        sx={{ width: 400, marginTop: '20px', marginBottom: '20px'}} />
                    <Button type='submit' variant='outlined' size='large'>Submit</Button>
                </form>
            </Box>
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center',}}>
                <div style={{ border: '', width: 400, height: 500, overflowY: 'auto'}} className='scroll'>
                    {allMessages.map((each, ndx) => {
                        return (<div style={{ border: '1px solid black', height: 65, fontSize: '20px', borderRadius: '10px' }}>
                            <h6 style={{ height: 20, margin: 0 }}>From: {each.fromOf}</h6>
                            <h6 style={{ height: 20, margin: 0 }}>Message: {each.body}</h6>
                            <h6 style={{ height: 20, margin: 0 }}>Send Time: {each.createdAt}</h6>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    );
}
