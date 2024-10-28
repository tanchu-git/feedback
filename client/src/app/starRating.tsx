import { motion, useCycle } from "framer-motion";
import { Rating } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

const ratingVariant = {
    open: {
        y: -350,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    },
    closed: {
        y: -50,
        scale: 2,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
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
    },
    error: {
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