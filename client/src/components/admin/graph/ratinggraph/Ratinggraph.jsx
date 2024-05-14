import React from 'react';
import { ResponsiveLine } from '@nivo/line';

function Ratinggraph({ data }) {
    return (
        <div style={{ height: 152, width: '90%' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 25, right: 0, bottom: 0, left: 0 }}
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
                legends={[]}
            />
        </div>
    )
}

export default Ratinggraph