import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Label, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

function Statistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => formatData(data.content))
        .then(stat => setData(stat))
        .catch(err => console.error(err))
    }, []);

    const formatData = (data) => {
        let statistics = _(data).groupBy('activity')
                                .map((objs, key) => ({
                                'activity': key,
                                'duration': _.sumBy(objs, 'duration') }))
                                .value();
        return statistics;
    };

    return (
        <div class="page">
            <div style={{width: "99%", height: 600, marginTop: "20%", marginLeft: "5%"}}>
                <ResponsiveContainer width="80%" height={550}>
                    <BarChart data={data} margin={{ top: 50, right: 30, left: 20, bottom: 0 }}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="activity" stroke="white"/>
                        <YAxis name="Duration (min)" stroke="black"/>
                        <Tooltip wrapperStyle={{backgroundColor: 'yellow' }} />
                        <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                        <Bar name="Duration (min) of Activity" dataKey="duration" fill="#ace7ff"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Statistics;