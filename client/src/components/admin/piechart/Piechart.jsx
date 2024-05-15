    import React, { useState, useEffect } from 'react';
    import { ResponsivePie } from '@nivo/pie';


    function Piechart() {

        const [storageData, setStorageData] = useState([]);

        useEffect(() => {
            setTimeout(() => {
                setStorageData([
                    {
                        "id": "Images",
                        "label": "Images",
                        "value": 207,
                        "color": "hsl(233, 70%, 50%)"
                    },
                    {
                        "id": "Videos",
                        "label": "Videos",
                        "value": 120,
                        "color": "hsl(235, 70%, 50%)"
                    },
                    {
                        "id": "Files",
                        "label": "Files",
                        "value": 162,
                        "color": "hsl(314, 70%, 50%)"
                    },
                    {
                        "id": "Free Space",
                        "label": "Free Space",
                        "value": 499,
                        "color": "hsl(89, 70%, 50%)"
                    }
                ]);
            }, 1000);
        }, []);

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