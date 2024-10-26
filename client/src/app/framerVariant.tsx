import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { Rating } from "@mui/material";
import React from "react";
import { useGetFeedbackLinkQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import FeedbackForm from "./feedbackForm";
import Router from 'next/router';
import Link from "next/link";

// white circle animation variant
const negFeedbackVariant = {
    open: (height = 1000) => ({
        y: 0,
        clipPath: `circle(${height * 2}px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px)",
        y: 100,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 40,
        }
    }
};

const buttonVariant = {
    open: {
        y: 310,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 40
        }
    },
    closed: {
        y: 100,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 40
        }
    }
}

const ratingVariant = {
    open: {
        y: -290,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    },
    closed: {
        y: 0,
        scale: 2,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    }
}

const titleVariant = {
    open: {
        y: -300,
        x: -8,
        scale: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    },
    closed: {
        y: -110,
        x: -8,
        scale: 1.5,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    }
}

type Props = {
    feedbackLink: string
}

export const FeedbackView = ( { feedbackLink }: Props ) => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);

    const [value, setValue] = React.useState<number | null>(2);    

    const {
        data: business,
        isLoading: businessLoading,
        isError: businessError
      } = useGetFeedbackLinkQuery({ feedbackLink: feedbackLink });

    if (businessLoading) return <div>Loading..</div>;
    if (businessError || !business || !business[0]) return <div>{feedbackLink} - No such link</div>;

    const goodRating = value! >= Number(business[0].ratingLimit);
    const businessId = business[0].id;
    const placId = business[0].placeId;
    const { push } = useRouter();

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            ref={containerRef}
        >            
            <motion.div className="background bg-white" variants={negFeedbackVariant} /> 
            <FeedbackForm businessId={businessId} rating={value!} placeId={placId!} />
            <motion.h2 className="absolute text-lg font-bold tracking-tighter bg-gradient-to-b from-black
                to-[#0a38cf] text-transparent bg-clip-text"
                variants={titleVariant}
            >
                Share your thoughts
            </motion.h2>
            <motion.div variants={ratingVariant}>
                <Rating
                    size="large"
                    name="simple-controlled"
                    value={value}
                    readOnly={isOpen ? true : false}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                />
            </motion.div>
            <motion.button
                variants={buttonVariant}             
                className="background w-[50px] h-[50px] outline-none border-none 
                    font-bold text-blue-900 text-xl cursor-pointer bg-transparent"
                onClick={ () => { 
                    {
                        goodRating 
                        ? 
                        push(`https://search.google.com/local/writereview?placeid=${placId}`) 
                        : 
                        toggleOpen();
                    }
                }}
            >   
            {isOpen ? "Back" : "Go!"}
            </motion.button>
        </motion.nav>    
    )
}