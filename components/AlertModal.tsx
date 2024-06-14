// components/AlertModal.js
import React from 'react';

const AlertModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 rounded-2xl flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-10 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-black">Are you a dealer?</h2>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => onConfirm('yes')}
                        className="px-8 py-2 border border-black bg-deepBlue text-white rounded-full hover:bg-white hover:border-deepBlue hover:text-black"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => onConfirm('no')}
                        className="px-8 py-2 border border-black bg-white text-black rounded-full hover:bg-white"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
