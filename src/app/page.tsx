"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PRODUCTS } from "./data/products";
import ProductVeganRating from "./ui/product-vegan-rating";
import Link from "next/link";

const PRODUCT_NAME_SEARCH_PARAM = 'productName';

export default function Home() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [inputValue, setInputValue] = useState('');
    const [suggestedProduct, setSuggestedProduct] = useState('');

    const handleSearch = (product: string) => {
        setInputValue(product);

        const productSuggestion = product ? PRODUCTS.keys().find(key => key.includes(product.toLocaleLowerCase())) : '';
        setSuggestedProduct(productSuggestion || '');
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const params = new URLSearchParams(searchParams);
        if (inputValue) {
            params.set(PRODUCT_NAME_SEARCH_PARAM, inputValue.toLocaleLowerCase());
        } else {
            params.delete(PRODUCT_NAME_SEARCH_PARAM);
        }

        setInputValue('');
        setSuggestedProduct('')

        replace(`${pathname}?${params.toString()}`)
    };

    const handleProductSuggestion = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const params = new URLSearchParams(searchParams);
        params.set(PRODUCT_NAME_SEARCH_PARAM, suggestedProduct.toLocaleLowerCase());

        setInputValue('');
        setSuggestedProduct('');

        replace(`${pathname}?${params.toString()}`)
    };

    const handleAutocompleteSearch = (event: { key: string; }) => {
        if (event.key === 'Tab') setInputValue(suggestedProduct.charAt(0).toLocaleUpperCase() + suggestedProduct.slice(1).toLocaleLowerCase())
    }

    return (<>
        <header className="pb-4">
            <Link key="help" href="/ayuda">
                <p className="hover:underline hover:cursor-pointer p-5">Ayuda: ¿Qué productos están disponibles?</p>
            </Link>
        </header>
        <main className="flex flex-col w-[50%] gap-[18px] items-center sm:items-start">
            { Boolean(searchParams.get(PRODUCT_NAME_SEARCH_PARAM)) && <ProductVeganRating productName={searchParams.get(PRODUCT_NAME_SEARCH_PARAM) || ''}/> }
            <form className="flex w-full gap-[18px] items-center justify-center sm:items-start" onSubmit={handleSubmit}>
                <input
                    onChange={(event) => handleSearch(event.target.value)}
                    onKeyDown={(event) => handleAutocompleteSearch(event)}
                    className="rounded-2xl w-[45%] border border-green-500 py-[9px] pl-5 text-sm outline-0 placeholder:text-green-900"
                    placeholder={"Tu producto favorito"}
                    name="product"
                    value={inputValue}
                />
                <button
                    className="hover:cursor-pointer h-10 rounded-2xl bg-green-400 px-4  text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-green-800"
                    type="submit"
                >
                ¿Es vegano?
                </button>
            </form>
            <div className="self-center" onClick={handleProductSuggestion}>
                { suggestedProduct && <p className="self-center hover:underline hover:cursor-pointer">💡 Sugerencia: {suggestedProduct.charAt(0).toLocaleUpperCase() + suggestedProduct.slice(1).toLocaleLowerCase()}</p>}
            </div>
        </main>
        </>
    )
}
