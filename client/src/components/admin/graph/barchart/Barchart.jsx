import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const dummyData = [
    {
        days: 'Monday',
        'views': 60,
    },
    {
        days: 'Tuesday',
        'views': 50,
    },
    {
        days: 'Wednesday',
        'views': 40,
    },
    {
        days: 'Thursday',
        'views': 50,
    },
    {
        days: 'Friday',
        'views': 60,
    },
    {
        days: 'Saturday',
        'views': 70,
    },
    {
        days: 'Sunday',
        'views': 37,
    },
];

function Barchart({ data = dummyData }) {
    return (
        <div className='px-5 py-4' style={{ height: '360px', width: '100%' }}>
            <ResponsiveBar
                data={data}
                keys={[
                    'hot dog',
                    'burger',
                    'sandwich',
                    'kebab',
                    'views',
                ]}
                indexBy="days"
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