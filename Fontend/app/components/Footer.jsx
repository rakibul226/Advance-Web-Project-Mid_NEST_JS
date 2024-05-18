
const Footer = () => {
    return (
        <footer className="footer p-10  text-base-content pl-24 bg-gray-950 mt-4">
            <aside>
            <h2 className="text-3xl pt-10">everNeighbor</h2>
            <p className="text-sm">&copy; 2024 everNeighbor. All rights reserved.</p>

            </aside> 
                <nav>
                    <h6 className="footer-title text-gray-200">Games</h6> 
                    <a className="link link-hover">Action</a>
                    <a className="link link-hover">Adventure</a>
                    <a className="link link-hover">Strategy</a>
                    <a className="link link-hover">Role-playing</a>
                </nav> 
                <nav>
                    <h6 className="footer-title text-gray-200">Community</h6> 
                    <a className="link link-hover">Forums</a>
                    <a className="link link-hover">Events</a>
                    <a className="link link-hover">Leaderboards</a>
                    <a className="link link-hover">Fan Art</a>
                </nav> 
                <nav>
                    <h6 className="footer-title text-gray-200">Legal</h6> 
                    <a className="link link-hover">Terms of Service</a>
                    <a className="link link-hover">Privacy Policy</a>
                    <a className="link link-hover">Cookie Policy</a>
                </nav>
        </footer>
    );
};

export default Footer;