import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

function Ratinggraph() {

    const [ratingData, setRatingData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setRatingData([
                {
                    id: "test",
                    data: [
                        { x: "week1", y: 20 },
                        { x: "week2", y: 22 },
                        { x: "week3", y: 18 },
                        { x: "week4", y: 21 },
                        { x: "week5", y: 13 }
                    ]
                }
            ]);
        }, 1000);
    }, []);

    return (
        <div style={{ height: 115, width: '100%' }}>
            <ResponsiveLine
                data={ratingData}
                margin={{ top: 25, right: 0, bottom: 50, left: 0 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                curve='monotoneX'
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                enableGridX={false}
                enableGridY={false}
                enablePoints={false}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableArea={true}
                isInteractive={false}
                enableTouchCrosshair={true}
                colors="#FC8D1E" // Set the line color
                fill={[
                    { match: '*', id: 'gradientA' }
                ]}
                defs={[
                    {
                        id: 'gradientA',
                        type: 'linearGradient',
                        colors: [
                            { offset: 0, color: '#FFF2E5' },
                            { offset: 100, color: '#FFF2E5' }
                        ],
                    },
                ]}
                legends={[]}
            />
        </div>
    )
}

export default Ratinggraph;