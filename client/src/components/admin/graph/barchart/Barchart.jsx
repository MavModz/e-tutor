import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { profileviewfunction } from '@/app/lib/Services/api';

function Barchart() {
    const [profileViews, setProfileViews] = useState([]);

    const defaultProfileViews = [
        { day: 'Sunday', views: 0 },
        { day: 'Monday', views: 0 },
        { day: 'Tuesday', views: 0 },
        { day: 'Wednesday', views: 0 },
        { day: 'Thursday', views: 0 },
        { day: 'Friday', views: 0 },
        { day: 'Saturday', views: 0 },
    ];


    const fetchprofileviews = async () => {
        try {
            const userId = sessionStorage.getItem('adminId');
            if (!userId) {
                throw new Error("No adminId found in sessionStorage");
            }
            const response = await profileviewfunction(userId);
            const responseData = response.map(view => ({ day: view.day, views: view.views }));

            // Merge default data with the response
            const mergedData = defaultProfileViews.map(defaultDay => {
                const dayData = responseData.find(d => d.day === defaultDay.day);
                return dayData ? { ...defaultDay, views: dayData.views } : defaultDay;
            });

            setProfileViews(mergedData);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setProfileViews(defaultProfileViews); // Set to default if there's an error
        }
    }


    useEffect(() => {
        fetchprofileviews();
    }, [])

    return (
        <div className='px-5 py-4' style={{ height: '360px', width: '100%' }}>
            <ResponsiveBar
                data={profileViews}
                keys={[
                    'hot dog',
                    'burger',
                    'sandwich',
                    'kebab',
                    'views',
                ]}
                indexBy="day"
                margin={{ top: 50, right: 0, bottom: 20, left: 30 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'views'
                        },
                        id: 'dots'
                    }
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
                enableTotals={true}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[]}
                motionConfig="stiff"
                role="application"
                ariaLabel="Profile Clicks"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in India: " + e.indexValue}
            />
        </div>
    )
}

export default Barchart