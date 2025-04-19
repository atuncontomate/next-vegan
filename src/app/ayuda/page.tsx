"use client";

import Link from "next/link";
import { redirect } from 'next/navigation'
import { PRODUCTS } from "../data/products";

export default function HelpPage() {
    return (
        <>
            <Link 
                key="home"
                href="/"
            >
                <p className="p-5 hover:underline hover:cursor-pointer">Volver a la Home...</p>
            </Link>
            <p><strong>Productos disponibles:</strong></p>
            <ul>
                {[ ...PRODUCTS.keys() ].map((product, index) => (
                    <li onClick={() => redirect(`/?productName=${product}`)} className="hover:underline hover:cursor-pointer" key={index}>- {product}</li>
                ))}
            </ul>
        </>
        
    );
}
