import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { cloudstoragefunction } from '@/app/lib/Services/api';

function Piechart(userId) {

    const [storageData, setStorageData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const fetchStorageData = async () => {
                try {
                    const userId = sessionStorage.getItem("adminId");
                    const response = await cloudstoragefunction(userId);
                    setStorageData(response);
                }
                catch (error) {
                    console.error("Error fetching storage data:", error);
                }
            }
            fetchStorageData();
        }, 500);
    }, [userId]);

    return (
        <div className='px-5 py-2' style={{ height: "360px" }}>
            <ResponsivePie
                data={storageData}
                margin={{ top: 10, right: 80, bottom: 75, left: 78 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'Files'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'Videos'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'Images'
                        },
                        id: 'lines'
                    },
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 80,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#241F26'
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}

export default Piechart