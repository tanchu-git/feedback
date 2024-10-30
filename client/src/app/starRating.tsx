import { motion, useCycle } from "framer-motion";
import { Rating } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { ratingVariant } from "./variants";

type Props = {
    isOpen: boolean
    setValue: Dispatch<SetStateAction<number | null>>
    value: number | null
}

// Make readOnly in feedback form view
export const StarRating = ( {isOpen, setValue, value}: Props ) => {
    return (
        <motion.div variants={ratingVariant}>
            <Rating
                size="large"
                name="stars"
                value={value}
                readOnly={isOpen ? true : false}
                onChange={ (_event, newValue) => {
                setValue(newValue);
                }}
            />
         </motion.div>
    )
}

export default StarRating