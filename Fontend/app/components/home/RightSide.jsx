import React, { act } from 'react';
import Image from 'next/image';

const RightSide = ({active}) => {

    const {name} = active;

    return (
        <div className='h-12  pl-3 mt-4 flex'>
            <Image className='rounded-3xl mx-1' src="https://i.ibb.co/kXJJpN2/images.png" alt="Book" width={50} height={100} />
            <p>{name}</p>
            
        </div>
    );
};

export default RightSide;