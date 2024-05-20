// import React, { useEffect, useState } from 'react';
// import { LinearProgress, Typography, Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
// import Image from 'next/image';
// import { overallcourseratingfunction } from '@/app/lib/Services/api';

// const useStyles = makeStyles({
//     progressBar: {
//         width: '100%',
//         '& .MuiLinearProgress-barColorPrimary': {
//             backgroundColor: '#fc8d1e',
//         },
//         '& .MuiLinearProgress-colorPrimary': {
//             backgroundColor: '#fce4d1',
//         },
//     },
//     starImage: {
//         width: 70,
//         height: 20,
//     },
//     ratingText: {
//         fontFamily: 'var(--secondary-font)',
//         color: 'var(--secondary-text)',
//         fontSize: 14,
//         fontWeight: 400,
//         lineHeight: '22px',
//         letterSpacing: '-0.01em',
//         textAlign: 'left',
//     },
//     ratingContainer: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '15px',
//         alignItems: 'center',
//     },
//     starAndTextContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         minWidth: '100%',
//         gap: '12px'
//     },
// });

// function Courserating() {
//     const classes = useStyles();
//     const [courseRatings, setCourseRatings] = useState([]);

//     const fetchoverallcourserating = async () => {
//         try {
//             const userId = sessionStorage.getItem('adminId');
//             if (!userId) {
//                 throw new Error("No adminId found in sessionStorage");
//             }
//             const response = await overallcourseratingfunction(userId);
//             setCourseRatings(Array.isArray(response) ? response : [response]);
//             console.log(response)
//         }
//         catch (error) {
//             console.log("Error fetching profile data:", error);
//         }
//     }

//     useEffect(() => {
//         fetchoverallcourserating();
//     }, [])

//     const getPercentage = (count, total) => total > 0 ? (count / total) * 100 : 0;
//     return (
//         <Box>
//             {courseRatings && courseRatings.map((course, index) => (
//                 <Box key={index} className={classes.ratingContainer}>
//                     {course.ratings && Object.entries(course.ratings).map(([key, value], idx) => (
//                         <Box key={index + '-' + idx + '-' + key} className={classes.starAndTextContainer}>
//                             <Image src={`/${key.replace('_', '-')}.svg`} alt={`${key} star`} className={classes.starImage} width={70} height={20} />
//                             <Typography variant="body2" className={classes.ratingText}>
//                                 {`${key}`}
//                             </Typography>
//                             <Box width="100%" mr={1}>
//                                 <LinearProgress
//                                     className={classes.progressBar}
//                                     variant="determinate"
//                                     value={
//                                         course.ratings[key] !== undefined
//                                             ? getPercentage(course.ratings[key], course.totalRatings)
//                                             : 0
//                                     }
//                                 />
//                             </Box>
//                             <Typography variant="body2" color="textSecondary">
//                                 {Math.round(getPercentage(course.ratings[key] !== undefined ? course.ratings[key] : 0, course.totalRatings))}%
//                             </Typography>
//                         </Box>
//                     ))}
//                 </Box>
//             ))}
//         </Box>
//     )
// }

// export default Courserating;


import React, { useEffect, useState } from 'react';
import { LinearProgress, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Image from 'next/image';
import { overallcourseratingfunction } from '@/app/lib/Services/api';

const useStyles = makeStyles({
    progressBar: {
        width: '100%',
        '& .MuiLinearProgress-barColorPrimary': {
            backgroundColor: '#fc8d1e',
        },
        '& .MuiLinearProgress-colorPrimary': {
            backgroundColor: '#fce4d1',
        },
    },
    starImage: {
        width: 70,
        height: 20,
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
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
    },
    starAndTextContainer: {
        display: 'flex',
        alignItems: 'center',
        minWidth: '100%',
        gap: '12px'
    },
});

function Courserating() {
    const classes = useStyles();
    const [courseRatings, setCourseRatings] = useState([]);

    // Inside Courserating component
    const fetchoverallcourserating = async () => {
        try {
            const userId = sessionStorage.getItem('adminId');
            if (!userId) {
                throw new Error("No adminId found in sessionStorage");
            }
            const response = await overallcourseratingfunction(userId);
            if (!response.ratings) response.ratings = { "1stars": 0, "2stars": 0, "3stars": 0, "4stars": 0, "5stars": 0 };
            setCourseRatings(Array.isArray(response) ? response : [response]);
        } catch (error) {
            console.log("Error fetching profile data:", error);
        }
    };


    useEffect(() => {
        fetchoverallcourserating();
    }, [])

    const getPercentage = (count, total) => total > 0 ? (count / total) * 100 : 0;
    return (
        <Box>
            {courseRatings && courseRatings.map((course, index) => (
                <Box key={index} className={classes.ratingContainer}>
                    {course.ratings && Object.entries(course.ratings).map(([key, value], idx) => (
                        <Box key={index + '-' + idx + '-' + key} className={classes.starAndTextContainer}>
                            <Image src={`/${key.replace('_', '-')}.png`} alt={`${key} star`} className={classes.starImage} width={70} height={20} />
                            <Typography variant="body2" className={classes.ratingText}>
                                {`${key}`}
                            </Typography>
                            <Box width="100%" mr={1}>
                                <LinearProgress
                                    className={classes.progressBar}
                                    variant="determinate"
                                    value={
                                        course.ratings[key] !== undefined
                                            ? getPercentage(course.ratings[key], course.totalRatings)
                                            : 0
                                    }
                                />
                            </Box>
                            <Typography variant="body2" color="textSecondary">
                                {Math.round(getPercentage(course.ratings[key] !== undefined ? course.ratings[key] : 0, course.totalRatings))}%
                            </Typography>
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    )
}

export default Courserating;