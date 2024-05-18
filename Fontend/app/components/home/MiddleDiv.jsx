import React from 'react';
import Image from 'next/image';

const MiddleDiv = ({activity}) => {
    const {name,post,time_ago} = activity;
    return (
        <div className="  px-3 py-3  pt-8">
            <div className='flex-1 flex h-7 items-center '>
                <Image className='rounded-full mx-1' src="https://i.ibb.co/kXJJpN2/images.png" alt="Book" width={60} height={100} />
                <div className=''>
                <p>{name}</p>
                <p className='text-sm'>{time_ago}</p>
                </div>
            </div>
            <div className="flex text-start pl-10 py-3 mt-5">
                {post}
            </div>
            <hr />
        </div>
    );
};

export default MiddleDiv;