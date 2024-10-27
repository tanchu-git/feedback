import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { motion } from "framer-motion";
import React, { Dispatch, useState } from 'react';
import { Button, CircularProgress, FormLabel, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useCreateFeedbackMutation } from '@/state/api';

const formVariant = {
    open: {
        y: -300,
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
    },
    submitted: {
        y: 2000,
        x: -50,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 60
        }
    }
}

type Props = {
    businessId: number
    rating: number
    placeId: string
    setVariant: Dispatch<React.SetStateAction<string>>
}

export const FeedbackForm = ({ businessId, rating, placeId, setVariant }: Props) => {
    const [tagProduct, setTagProduct] = useState("");
    const [tagService, setTagService] = useState("");
    const [tagStaff, setTagStaff] = useState("");
    const [tagOther, setTagOther] = useState("");

    const [createFeedback, { isLoading, isError }] = useCreateFeedbackMutation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const disableSubmit = !tagProduct && !tagService && !tagStaff && !tagOther && !name && !email && !message

    const submit = async () => {
        const date = new Date().toISOString();
        const tags: string[] = [];

        {
            tagProduct ? tags.push(tagProduct) : tags.filter( (tag) => tag !== tagProduct )
            tagService ? tags.push(tagService) : tags.filter( (tag) => tag !== tagService )
            tagStaff ? tags.push(tagStaff) : tags.filter( (tag) => tag !== tagStaff )
            tagOther ? tags.push(tagOther) : tags.filter( (tag) => tag !== tagOther )
        }
        
        await createFeedback({
            businessId: businessId,
            rating: rating,
            name: name,
            email: email,
            tags: tags,
            message: message,
            date: date,
            placeId: placeId,
            read: false,
        })
    }

    return (
        <motion.div className='absolute' variants={formVariant}>
            <div>
                <FormLabel 
                    component="legend"
                    sx={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14,
                        maxWidth: 270
                    }}
                >
                    This is totally optional, but you can help us improve!
                </FormLabel>
                <FormLabel 
                    component="legend"
                    sx={{
                        color: 'black',
                        fontSize: 18,
                        mt: 1
                    }}
                >
                    What went wrong?
                </FormLabel>
            </div>
            <FormGroup>
                <FormControlLabel 
                    control={
                    <Checkbox 
                        sx={{ marginTop: "-4px" }}
                        onChange={e => {
                            e.target.checked ? setTagProduct("Product") : setTagProduct("");
                        }}
                    />} 
                    label="Product" 
                />
                <FormControlLabel control={
                    <Checkbox 
                        sx={{ marginTop: "-4px" }}
                        onChange={e => {
                            e.target.checked ? setTagService("Service") : setTagService("");
                    }}
                    />} 
                    label="Service" />
                <FormControlLabel control={
                    <Checkbox 
                        sx={{ marginTop: "-4px" }}
                        onChange={e => {
                            e.target.checked ? setTagStaff("Staff") : setTagStaff("");  
                    }}
                    />} 
                    label="Staff" />
                <FormControlLabel control={
                    <Checkbox 
                        sx={{ marginTop: "-4px" }}
                        onChange={e => {
                            e.target.checked ? setTagOther("Other") : setTagOther("");  
                    }}
                    />} 
                    label="Other" />
                <div className=''>
                    <TextField 
                        sx={{ width: '25ch' }}
                        id="outlined-basic" 
                        label="Details.." 
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                        onChange={ (e) => setMessage(e.target.value) }
                    />
                </div>
                <div className='mt-3 mb-1'>
                    <FormLabel
                        component="legend"
                        sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            mx: 0.5,
                            fontSize: 14,
                            maxWidth: 250
                        }}
                    >
                        If you'd like us to follow up on your issue, please leave your contact info.
                    </FormLabel>
                </div>   
                <TextField 
                    sx={{ width: '15ch', marginBottom: 1}}
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined"
                    size="small"
                    onChange={ (e) => setName(e.target.value) }
                />               
                <TextField 
                    sx={{ width: '25ch' }}
                    id="outlined-basic" 
                    label="E-mail" 
                    variant="outlined"
                    size="small"
                    onChange={ (e) => setEmail(e.target.value) }
                />
            </FormGroup>
            <div className='mt-8 mx-[67px]'>
                <Button 
                    disabled={disableSubmit || isLoading}
                    variant="contained" 
                    endIcon={isLoading ? <CircularProgress color="inherit" size={20}/> : <SendIcon />}
                    onClick={ () => {
                        submit()
                        setVariant("submitted")      
                    }}
                >
                    Submit
                </Button>
            </div>
        </motion.div>
    );
}

export default FeedbackForm;