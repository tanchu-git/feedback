import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { motion } from "framer-motion";
import React, { Dispatch, useState } from 'react';
import { Button, CircularProgress, FormLabel, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useCreateFeedbackMutation } from '@/state/api';
import { formVariant } from './variants';
import { languageText } from './language';

type Props = {
    businessId: number
    rating: number
    placeId: string
    setVariant: Dispatch<React.SetStateAction<string>>
    language: string
}

export const FeedbackForm = ( {businessId, rating, placeId, setVariant, language}: Props ) => {
    const [tagProduct, setTagProduct] = useState("");
    const [tagService, setTagService] = useState("");
    const [tagStaff, setTagStaff] = useState("");
    const [tagOther, setTagOther] = useState("");

    const [createFeedback, { isLoading }] = useCreateFeedbackMutation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const disableSubmit = !tagProduct && !tagService && !tagStaff && !tagOther && !name && !email && !message

    // Async function building the feedback message
    const submit = async () => {
        const date = new Date().toISOString();
        const tags: string[] = [];

        // Checkboxes data input
        {
            if (tagProduct) tags.push(tagProduct)
            if (tagService) tags.push(tagService)
            if (tagStaff) tags.push(tagStaff)
            if (tagOther) tags.push(tagOther)
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
        }).then(
                // success -> show success msg
                // error -> show error msg
                data => data.error ? setVariant("error") : setVariant("submitted"),
                _err => setVariant("error")
            )
    }

    return (
        // Bulding the feedback form
        <motion.div className='absolute' variants={formVariant}>
            <div>
                <FormLabel 
                    component="legend"
                    sx={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14,
                        maxWidth: 260
                    }}
                >
                    {languageText.formLabel[language as keyof typeof languageText.formLabel]}
                </FormLabel>
                <FormLabel 
                    component="legend"
                    sx={{
                        color: 'black',
                        fontSize: 16,
                        mt: 2,
                        mb: 1
                    }}
                >
                    {languageText.formLabelTwo[language as keyof typeof languageText.formLabelTwo]}
                </FormLabel>
            </div>
            <div className='flex columns-2 gap-4 justify-start'>
                <FormGroup>
                    <FormControlLabel 
                        control={
                        <Checkbox 
                            sx={ {marginTop: "-2px"} }
                            onChange={e => {
                                e.target.checked ?
                                setTagProduct(languageText.checkProduct[language as keyof typeof languageText.checkProduct]) :
                                setTagProduct("");
                            }}
                        />} 
                        label={languageText.checkProduct[language as keyof typeof languageText.checkProduct]} 
                    />
                    <FormControlLabel control={
                        <Checkbox 
                            sx={ {marginTop: "-2px"} }
                            onChange={e => {
                                e.target.checked ?
                                setTagService(languageText.checkService[language as keyof typeof languageText.checkService]) :
                                setTagService("");
                            }}
                        />} 
                        label={languageText.checkService[language as keyof typeof languageText.checkService]} 
                    />
                                    </FormGroup>
                                    <FormGroup>
                    <FormControlLabel control={
                        <Checkbox 
                            sx={ {marginTop: "-2px"} }
                            onChange={e => {
                                e.target.checked ?
                                setTagStaff(languageText.checkStaff[language as keyof typeof languageText.checkStaff]) :
                                setTagStaff("");  
                            }}
                        />} 
                        label={languageText.checkStaff[language as keyof typeof languageText.checkStaff]}  
                    />
                    <FormControlLabel control={
                        <Checkbox 
                            sx={ {marginTop: "-2px"} }
                            onChange={e => {
                                e.target.checked ?
                                setTagOther(languageText.checkOther[language as keyof typeof languageText.checkOther]) :
                                setTagOther("");  
                            }}
                        />} 
                        label={languageText.checkOther[language as keyof typeof languageText.checkOther]}  
                    />                    
                </FormGroup>
            </div>
            <FormGroup>
                <div className=''>
                    <TextField 
                        sx={{
                            width: '25ch',
                            mt: 1
                        }}
                        label={languageText.textDetails[language as keyof typeof languageText.textDetails]} 
                        variant="outlined"
                        size="small"
                        multiline
                        rows={3}
                        onChange={ (e) => setMessage(e.target.value) }
                    />
                </div>
                <div className='mt-4 mb-1'>
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
                        {languageText.formFollowUp[language as keyof typeof languageText.formFollowUp]}
                    </FormLabel>
                </div>                
                <TextField 
                    sx={ {width: '15ch', marginBottom: 1} }
                    label={languageText.formName[language as keyof typeof languageText.formName]} 
                    variant="outlined"
                    size="small"
                    onChange={ (e) => setName(e.target.value) }
                />               
                <TextField 
                    sx={{ width: '25ch' }}
                    label={languageText.formEmail[language as keyof typeof languageText.formEmail]} 
                    variant="outlined"
                    size="small"
                    onChange={ (e) => setEmail(e.target.value) }
                />
            </FormGroup>
            <div className='mt-12 justify-center flex mr-4'>
                <Button 
                    size="large"
                    disabled={disableSubmit || isLoading}
                    variant="contained"
                    endIcon={isLoading ? <CircularProgress color="inherit" size={22}/> : <SendIcon />}
                    onClick={ () => {
                        submit()                        
                    }}
                >
                    {languageText.submitBtn[language as keyof typeof languageText.submitBtn]} 
                </Button>
            </div>
        </motion.div>
    );
}

export default FeedbackForm;