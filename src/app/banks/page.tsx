"use client"
import React from 'react';
import { usePathname } from "next/navigation";


export default function Banks() {
    const pathName = usePathname();

    return (
        <div
            id="basiclayout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >

        </div>
    );
};