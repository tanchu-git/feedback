import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { Alert, AlertTitle, CircularProgress,  } from "@mui/material";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import React from "react";
import { useGetFeedbackLinkQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import FeedbackForm from "./feedbackForm";
import StarRating from "./starRating";
import { whiteCircleVariant, titleVariant, buttonVariant, backVariant } from "./variants";

type Props = {
    feedbackLink: string
}

export const FeedbackView = ( { feedbackLink }: Props ) => {
    const { push } = useRouter();
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const [value, setValue] = React.useState<number | null>(0);
    const [variant, setVariant] = React.useState("");

    const {
        data: business,
        isLoading: businessLoading,
        isError: businessError
      } = useGetFeedbackLinkQuery({ feedbackLink: feedbackLink });

    if (businessLoading) {
        return <div><CircularProgress size={80} /></div>
    }
    if (businessError || !business || !business[0]) {
        return (
                <div>
                    <Alert variant="filled" severity="info">
                        <AlertTitle>Error</AlertTitle>
                        Please verify your link
                    </Alert>
                </div>
            )
    }

    const goodRating = value! >= Number(business[0].ratingLimit);
    const businessId = business[0].id;
    const placId = business[0].placeId;  

    return (
        <motion.nav
            initial={"closed"}
            animate={variant}
            ref={containerRef}
        >            
            <motion.div className="background bg-white" variants={whiteCircleVariant} /> 
            <FeedbackForm businessId={businessId} rating={value!} placeId={placId!} setVariant={setVariant} />
            <motion.h2 
                className="absolute text-lg font-bold tracking-tighter bg-gradient-to-b 
                    from-black to-[#0a38cf] text-transparent bg-clip-text"
                variants={titleVariant}
            >
                {isOpen ? "Feedback received!" : "Share your thoughts"}
            </motion.h2>
            <StarRating isOpen={isOpen} setValue={setValue} value={value}></StarRating>
            <motion.button
                variants={buttonVariant}
                disabled={!value}         
                className="background w-[50px] h-[50px] outline-none border-none 
                    font-bold text-blue-900 text-xl cursor-pointer bg-transparent"
                onClick={ () => { 
                    {
                        goodRating 
                        ? 
                        push(`https://search.google.com/local/writereview?placeid=${placId}`) 
                        : 
                        setVariant("open");
                        toggleOpen();
                    }
                }}
            >   
                {!value? <PanToolAltIcon fontSize="large"/> : "Go!"}
            </motion.button>
            <motion.button
                variants={backVariant}             
                className="background w-[50px] h-[50px] outline-none border-none 
                    font-bold text-blue-900 text-xl cursor-pointer bg-transparent"
                onClick={ () => { 
                    {
                        setVariant("closed");
                        toggleOpen();
                    }
                }}
            >   
                Back
            </motion.button>
        </motion.nav>    
    )
}