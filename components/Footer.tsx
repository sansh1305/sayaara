import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 absolute bottom-0 w-full">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm">© 2022 Your Website</div>
                    <div className="text-sm">
                        Powered by Next.js, Tailwind CSS, and Shadow CSS
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;