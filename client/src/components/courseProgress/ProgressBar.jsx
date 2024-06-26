import React, { useState, useEffect } from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    borderRadius: 5,
    '& .MuiLinearProgress-bar': {
        backgroundColor: '#23BD33', // Custom green color
    },
}));

function ProgressBar({ courseId }) {

    const [completion, setCompletion] = useState(15);  // Example static value

    // You can simulate data fetching with useEffect and setTimeout
    useEffect(() => {
        // Simulate fetching data after a delay
        const timer = setTimeout(() => {
            // Simulate a dynamic fetch response
            setCompletion(75);  // Change the value to simulate a data fetch
        }, 2000);  // 2000 ms delay for simulation

        return () => clearTimeout(timer);
    }, [courseId]);

    return (
        <div className="course-progress-container flex flex-col gap-4">
            <div className="lecture-title-info-wrapper flex justify-between items-center">
                <Typography component="h4">Course Contents</Typography>
                <Typography component="span">{completion}% Completed</Typography>
            </div>
            <CustomLinearProgress variant="determinate" value={completion} />
        </div>
    )
}

export default ProgressBar