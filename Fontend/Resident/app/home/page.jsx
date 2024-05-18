"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MiddleDiv from '../components/home/MiddleDiv'; 
import LeftSide from '../components/home/LeftSide';
import RightSide from '../components/home/RightSide';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('data.json')
            .then(res => setData(res.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div className="grid grid-cols-4  justify-center mx-10 gap-4 mt-3">
            <div className=" pt-20">
                <p className='text-2xl'>Blog</p>
                <hr />
                {data.blogs?.map(blog => (
                    <LeftSide key={blog.id} blog={blog} />
                ))}
            </div>
            <div className="col-span-2 grid grid-cols-1 pt-5 px-6 border border-white ">
                <h2 className='text-4xl'>Activity Feed</h2>
                {data.people_activity?.map(activity => (
                    <MiddleDiv key={activity.id} activity={activity} />
                ))}
            </div>
            <div className="grid col-span-1  mt-3">
                <div className=" pt-20">
                    <p className='text-2xl '>Recent Member</p>
                    <hr />
                    {data.actives?.map(active => (
                        <RightSide key={active.name} active={active} />
                    ))}
                </div>
              
            </div>
        </div>
    );
};

export default Home;

