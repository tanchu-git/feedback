import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { motion } from "framer-motion";
import React, { useState } from 'react';
import { Box, Button, FormLabel, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const formVariant = {
    open: {
        y: -150,
        x: -50,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 60
        }
    },
    closed: {
        y: -700,
        x: -50,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 60
        }
    }
}

export const FeedbackForm = () => {
    const [tagProduct, setTagProduct] = useState(false);
    const [tagService, setTagService] = useState(false);
    const [tagStaff, setTagStaff] = useState(false);
    const [tagOther, setTagOther] = useState(false);

    return (
        <motion.div className='absolute' variants={formVariant}>
            <div className='mb-2'>
                <FormLabel component="legend">Help us improve by telling</FormLabel>
                <FormLabel component="legend">us about the issues you have.</FormLabel>
            </div>
            <FormGroup>
                <FormControlLabel 
                    control={
                    <Checkbox 
                        onChange={e => {
                            setTagProduct(e.target.checked); 
                        }}
                    />} 
                    label="Product" 
                />
                <FormControlLabel control={
                    <Checkbox 
                        onChange={e => {
                            setTagService(e.target.checked); 
                    }}
                    />} 
                    label="Service" />
                <FormControlLabel control={
                    <Checkbox 
                        onChange={e => {
                            setTagStaff(e.target.checked);   
                    }}
                    />} 
                    label="Staff" />
                <FormControlLabel control={
                    <Checkbox 
                        onChange={e => {
                            setTagOther(e.target.checked);   
                    }}
                    />} 
                    label="Other" />
                <div className='mt-2'>
                    <TextField 
                        sx={{ width: '25ch' }}
                        id="outlined-basic" 
                        label="Specify" 
                        variant="outlined"
                        multiline
                        rows={2}
                    />
                </div>
                <div className='mt-3'>
                <FormLabel component="legend">Want us to follow up with you?</FormLabel>
                </div>                  
                    <TextField 
                        sx={{ width: '25ch' }}
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined"
                    />
            </FormGroup>
            <div className='mt-8 mx-[67px]'>
                <Button 
                    variant="contained" 
                    endIcon={<SendIcon />}
                    onClick={ () => {
                        console.log(tagProduct)
                        console.log(tagService)
                        console.log(tagStaff)
                        console.log(tagOther)
                    }}
                >
                    Submit
                </Button>
            </div>
        </motion.div>
    );
}

export default FeedbackForm;