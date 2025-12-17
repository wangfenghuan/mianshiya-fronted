"use client"

import React, {  } from 'react';
import {usePathname} from "next/navigation";


export default function Questions () {
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