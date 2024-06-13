import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { adminchartfunction, userchartfunction } from '@/app/lib/Services/api';
import './graph.css';

function Graph() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const authtoken = sessionStorage.getItem('auth_token');
      const role = authtoken.slice(-1);

      if (!role) {
        console.log("Auth token not found")
        return;
      }

      let response;
      if (role === '2') {
        response = await adminchartfunction();
        console.log(response);
        setData(response);
      }

      else if (role === '3') {
        response = await userchartfunction();
        console.log(response);
        setData(response);
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  const maxValue = Math.max(...data.map(item => item.value));
  console.log(maxValue);

  return (
    <div className="bar-charts">
      <div className="bar-heading w-full flex justify-between">
        <div className="bar-text flex flex-col justify-center gap-2">
          <h5>Total Courses:</h5>
          <h6>5 Courses</h6>
        </div>
        <div className="bar-stats">
          <Image src="/vector-points.svg" width={20} height={20} alt="vector-stats" />
        </div>
      </div>
      <div className="bar-dotted-line"></div>
      <div className="bar-chart">
        {data.map((item) => (
          <div className={`bar ${item === maxValue ? 'max-bar' : ''}`}
            key={item.label}
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          >
            <div className="bar-label">{item.label}</div>
            <div className="bar-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Graph