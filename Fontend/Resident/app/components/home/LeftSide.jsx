import Image from "next/image";

const LeftSide = ({blog}) => {
    const {title,date} = blog;
    return (
        <div className="flex gap-2 mt-4">
            <div className='h-14 w-16 flex'><Image className='w-14' src="https://i.ibb.co/pX55cVy/community.jpg" alt="Book" width={60} height={100} /></div>
            <div>
                <p>{title}</p>
                <p className="font-thin">{date}</p>
            </div>
    
        </div>
    );
};

export default LeftSide;