import React, { useEffect, useState } from 'react';
import { LinearProgress, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Image from 'next/image';

const useStyles = makeStyles({
    progressBar: {
        '& .MuiLinearProgress-barColorPrimary': {
            backgroundColor: '#fc8d1e',
        },
        '& .MuiLinearProgress-colorPrimary': {
            backgroundColor: '#fce4d1', // lighter shade for the track
        },
    },
    starImage: {
        width: 70, // Adjust the size as needed
        height: 20, // Adjust the size as needed
    },
    ratingText: {
        fontFamily: 'var(--secondary-font)',
        color: 'var(--secondary-text)',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: '-0.01em',
        textAlign: 'left',
    },
    ratingContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px', // Adjust as needed
    },
    starAndTextContainer: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 120,
    },
});

function Courserating() {
    const classes = useStyles();

    const ratings = {
        '5_star': 56,
        '4_star': 37,
        '3_star': 8,
        '2_star': 1,
        '1_star': 0.5,
    };

    const starImages = {
        '5_star': '/5Stars.svg',
        '3_star': '/3Stars.svg',
        '4_star': '/4Stars.svg',
        '2_star': '/2Stars.svg',
        '1_star': '/1Stars.svg',
    };

    const totalRatings = Object.values(ratings).reduce((acc, rating) => acc + rating, 0);
    const getPercentage = (count) => (count / totalRatings) * 100;
    return (
        <Box>
            {Object.entries(ratings).map(([key, value]) => (
                <Box key={key} className={classes.ratingContainer}>
                    <Box className={classes.starAndTextContainer}>
                        <Image src={starImages[key]} alt={`${key} star`} className={classes.starImage} width={70} height={20} />
                        <Typography variant="body2" className={classes.ratingText}>
                            {key.replace('_', ' ').toUpperCase()}
                        </Typography>
                    </Box>
                    <Box width="100%" mr={1}>
                        <LinearProgress
                            className={classes.progressBar}
                            variant="determinate"
                            value={getPercentage(value)}
                        />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        {Math.round(getPercentage(value))}%
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}

export default Courserating