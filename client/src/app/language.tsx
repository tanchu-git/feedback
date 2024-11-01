import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const languageText = {
    welcomeMsg: {
        se: "Dela dina åsikter",
        en: "Share your thoughts"
    },
    errorMsg: {
        se: "Vänligen verifiera din länk.",
        en: "Please verify your link."
    },
    submittedMsg: {
        se: "Din åsikt har skickats",
        en: "Feedback received"
    },
    submitErrorMsg: {
        se: "Oj då, något gick fel hos oss. Försök igen lite senare!",
        en: "Oopsie! Something went wrong on our end. Please try again later!"
    },
    formLabel: {
        se: "Det är helt frivilligt, men du kan hjälpa oss att bli bättre!",
        en: "This is totally optional, but you can help us improve!"
    },
    formLabelTwo: {
        se: "Vad var problemet?",
        en: "What was the issue?"
    },
    checkProduct: {
        se: "Produkt",
        en: "Product"
    },
    checkService: {
        se: "Service",
        en: "Service"
    },
    checkStaff: {
        se: "Personal",
        en: "Staff"
    },
    checkOther: {
        se: "Annat",
        en: "Other"
    },
    textDetails: {
        se: "Detaljer..",
        en: "Details.."
    },
    formFollowUp: {
        se: "Lämna din mejl om du vill att vi ska kontakta dig gällande detta.",
        en: "Leave your e-mail, if you would like us to follow up on your issue."
    },
    formName: {
        se: "Namn",
        en: "Name"
    },
    formEmail: {
        se: "Mejl",
        en: "E-mail"
    },
    submitBtn: {
        se: "Skicka",
        en: "Submit"
    }
}

type Props = {
    language: string
    setLanguage: React.Dispatch<React.SetStateAction<string>>
}

export const SelectLanguage = ( {language, setLanguage}: Props ) => {
    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
    };

    return (
        <FormControl sx={ {m: 1, minWidth: 60} } size="small">
            <Select
                autoWidth
                value={language}
                onChange={handleChange}
            >
                <MenuItem value={"se"}>SE</MenuItem>
                <MenuItem value={"en"}>EN</MenuItem>
            </Select>
        </FormControl>
    );
}

export default SelectLanguage;