import React from 'react';

const Profile: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
                <div className="flex items-center">
                    <img
                        className="w-12 h-12 rounded-full mr-4"
                        src="/path/to/profile-picture.jpg"
                        alt="Profile Picture"
                    />
                    <div>
                        <h2 className="text-lg font-bold">John Doe</h2>
                        <p className="text-gray-500">Software Engineer</p>
                    </div>
                </div>
                <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    consectetur, nunc id aliquet tincidunt, nunc nisl consectetur est, id
                    aliquam nunc nisl in nunc. Sed vitae nunc in nunc aliquet
                    sollicitudin. Sed id nunc id nunc aliquet sollicitudin. Sed id nunc id
                    nunc aliquet sollicitudin.
                </p>
            </div>
        </div>
    );
};

export default Profile;