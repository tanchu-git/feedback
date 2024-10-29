import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { Alert, AlertTitle, CircularProgress, Fab,  } from "@mui/material";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import DoneIcon from '@mui/icons-material/Done';
import React from "react";
import { useGetFeedbackLinkQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import FeedbackForm from "./feedbackForm";
import StarRating from "./starRating";
import { whiteCircleVariant, titleVariant, buttonVariant, errorVariant } from "./variants";

type Props = {
    feedbackLink: string
}

// Main page to structure all components
export const FeedbackView = ( {feedbackLink}: Props ) => {
    // Always put all hooks at top!
    const { push } = useRouter();
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const [value, setValue] = React.useState<number | null>(0);
    const [variant, setVariant] = React.useState("");

    // Prisma built await function
    const {
        data: business,
        isLoading: businessLoading,
        isError: businessError
      } = useGetFeedbackLinkQuery( {feedbackLink: feedbackLink} );

    if (businessLoading) {
        return <div><CircularProgress size={80} /></div>
    }
    if (businessError || !business || !business[0]) {
        return (
                <div>
                    <Alert variant="filled" severity="info">
                        <AlertTitle>
                            <h2 className="text-2xl font-semibold tracking-tighter bg-gradient-to-b 
                            from-black to-[#1443dd] text-transparent bg-clip-text"
                            >
                                Error
                            </h2>
                        </AlertTitle>
                        <h2 className="text-2xl font-semibold tracking-tighter bg-gradient-to-b 
                            from-black to-[#1443dd] text-transparent bg-clip-text"
                        >
                            Please verify your link
                        </h2>
                    </Alert>
                </div>
            )
    }

    // Check if no rating has been selected
    const goodRating = value! >= Number(business[0].ratingLimit);
    const businessId = business[0].id;
    const placeId = business[0].placeId;  
    const googleReview = "https://search.google.com/local/writereview?placeid=";

    return (
        // Main input for animation, hooks and data for components to use
        <motion.nav
            initial={"closed"}
            animate={variant}
            ref={containerRef}
        >
            {/* Animation - small white circle to expand and cover whole page */}
            <motion.div className="background bg-white" variants={whiteCircleVariant} /> 

            {/* Feedback component */}
            <FeedbackForm businessId={businessId} rating={value!} placeId={placeId!} setVariant={setVariant} />

            {/* Titles to display */}
            <motion.h2 
                className="absolute text-lg font-bold tracking-tighter bg-gradient-to-b 
                    from-black to-[#0a38cf] text-transparent bg-clip-text"
                variants={titleVariant}
            >
                {isOpen ? "Feedback received!" : "Share your thoughts"}
            </motion.h2>
            <motion.h2 
                className="absolute text-lg font-bold tracking-tighter bg-gradient-to-b 
                    from-black to-[#0a38cf] text-transparent bg-clip-text max-w-48"
                variants={errorVariant}
            >
                Oopsie! Something went wrong on our end. Please try again later!
            </motion.h2>

            {/* Rating component */}
            <StarRating isOpen={isOpen} setValue={setValue} value={value}></StarRating>

            {/* Button to display */}
            <motion.div
                initial={"closed"}
                variants={buttonVariant}
                animate={value ? variant : "disabled"}             
                className="absolute"                
            >
                <Fab 
                    disabled={!value}
                    color="primary"
                    onClick={ () => { 
                        {
                            goodRating 
                            ? 
                            push(googleReview + placeId) 
                            :                         
                            !isOpen
                            ?
                            ( toggleOpen(), setVariant("open") )
                            :
                            ( toggleOpen(), setVariant("closed") )
                        }
                    }}
                >
                    {
                        !value ? <PanToolAltIcon fontSize="large" /> : 
                        isOpen ? <RefreshIcon fontSize="large"  /> : 
                            <DoneIcon fontSize="large" />
                    }
                </Fab>
            </motion.div>
        </motion.nav>    
    )
}