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
    }
}

type Props = {
    isOpen: boolean
    setValue: Dispatch<SetStateAction<number | null>>
    value: number | null
}

export const StarRating = ({ isOpen, setValue, value }: Props) => {

    return (
        <motion.div variants={ratingVariant}>
            <Rating
                size="large"
                name="stars"
                value={value}
                readOnly={isOpen ? true : false}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            />
         </motion.div>
    )

}

export default StarRating