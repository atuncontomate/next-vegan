"use client";
import ProductVeganRating from "./ui/product-vegan-rating";
import { useState } from "react";
import { PRODUCTS } from "./data/products";

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [suggestedProduct, setSuggestedProduct] = useState('');
    const [submittedProduct, setSubmittedProduct] = useState('');
    
    const handleSearch = (product: string) => {
        setInputValue(product);

        const productSuggestion = product ? PRODUCTS.keys().find(key => key.includes(product.toLocaleLowerCase())) : '';
        setSuggestedProduct(productSuggestion || '');
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setSubmittedProduct(inputValue);
        setInputValue('');
        setSuggestedProduct('');
    };

    const handleProductSuggestion = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setSubmittedProduct(suggestedProduct);
        setInputValue('');
        setSuggestedProduct('');
    };

    const handleAutocompleteSearch = (event: { key: string; }) => {
        if (event.key === 'Tab') setInputValue(suggestedProduct.charAt(0).toLocaleUpperCase() + suggestedProduct.slice(1).toLocaleLowerCase())
    }

    return (<>
        {/*<Link key="create" href="/create">
            <p className="p-5">Añadir producto +</p>
        </Link>*/}
        <main className="flex flex-col w-[50%] gap-[18px] items-center sm:items-start">
            { Boolean(submittedProduct) && <ProductVeganRating productName={submittedProduct}/> }
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
