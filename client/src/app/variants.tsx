// Animations data for the components to use

export const whiteCircleVariant = {
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
};

export const buttonVariant = {
    open: {
        y: 1000,
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
    },
    submitted: {
        y: 2000,
        x: -50,
    },
    error: {
        y: 2000,
        x: -50,
    }
}

export const backVariant = {
    open: {
        y: 310,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 40
        }
    },
    closed: {
        y: 1000,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 40
        }
    },
    submitted: {
        y: 2000,
        x: -50,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 60
        }
    },
    error: {
        y: 2000,
        x: -50,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 60
        }
    }
}

export const titleVariant = {
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
        y: -150,
        x: -8,
        scale: 1.5,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    },
    submitted: {
        y: -150,
        x: -8,
        scale: 1.5,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    },
    error: {
        scale: 0,
    }
}

export const formVariant = {
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
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 60
        }
    },
    error: {
        y: 2000,
        x: -50,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 60
        }
    }
}

export const errorVariant = {
    open: {
        scale: 0,
    },
    closed: {
        scale: 0,
    },
    submitted: {
        scale: 0,
    },
    error: {
        y: -150,
        x: -8,
        scale: 1.5,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 50
        }
    }
}