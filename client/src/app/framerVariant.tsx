import { useRef } from "react";
import { delay, motion, useCycle } from "framer-motion";
import { Rating } from "@mui/material";
import React from "react";
import { useGetFeedbackLinkQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import FeedbackForm from "./feedbackForm";

const negFeedbackVariant = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2}px)`,
        transition: {
        type: "spring",
        stiffness: 10,
        restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px)",
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 40
        }
    }
};

const buttonVariant = {
    open: {
        y: 300,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 40
        }
    },
    closed: {
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 40
        }
    }
}

const ratingVariant = {
    open: {
        y: -170,
        scale: 1.5,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    },
    closed: {
        y: 80,
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
        x: -10,
        scale: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    },
    closed: {
        y: -120,
        x: -10,
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
    const placId = business[0].placeId;
    const router = useRouter()

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            ref={containerRef}
        >            
            <motion.div className="background bg-white" variants={negFeedbackVariant} /> 
            <FeedbackForm />
            <motion.h2 className="absolute text-lg font-bold tracking-tighter bg-gradient-to-b from-black
                to-[#0a38cf] text-transparent bg-clip-text"
                variants={titleVariant}
            >
                Share your thoughts
            </motion.h2>
            <motion.div variants={ratingVariant}>
                <Rating
                    className="mb-48"
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
                    goodRating 
                    ? 
                    router.push(`https://search.google.com/local/writereview?placeid=${placId}`) 
                    : 
                    toggleOpen()
                }}
            >   
            {isOpen ? "Back" : "Go!"}
            </motion.button>
        </motion.nav>    
    )
}