import Link from 'next/link';

const LibraryMannage = () => {
  return (
    <div className="h-screen "
    style={{
      backgroundImage: "url(img1.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    
    
    >
      <div
        className="absolute top-0 left-0 ml-8 mt-8"
        style={{ zIndex: 10 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-white">Library Manage</h1>
        <ul>
          <li className="mb-4">
            <Link href="/book">
              <p className="text-white hover:text-blue-700">Book</p>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/bookmanagement">
              <p className="text-white hover:text-blue-700">Book Management</p>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/librarycard">
              <p className="text-white hover:text-blue-700">Library Card</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="container mx-auto">
      
      </div>
    </div>
  );
};

export default LibraryMannage;
