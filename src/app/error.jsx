'use client';

import React, { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-6">Something went wrong!</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-2 bg-[var(--primary-green)] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                    Try again
                </button>
                <a
                    href="/"
                    className="px-6 py-2 border border-[var(--primary-green)] text-[var(--primary-green)] rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
