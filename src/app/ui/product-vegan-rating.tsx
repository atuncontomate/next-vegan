import Image from "next/image";
import { PRODUCTS } from "../data/products";
import { NOT_FOUND_PRODUCT_IMG, NOT_VEGAN_PRODUCT_IMG, VEGAN_PRODUCT_IMG } from "../data/images";
import { IS_NOT_VEGAN_MSG, IS_VEGAN_MSG, PRODUCT_NOT_FOUND_MSG } from "../data/messages";

type Props = {
    productName: string;
};

export default function ProductVeganRating({ productName }: Props) {
    // NOTA: Si en lugar de default function fuese default async function, esto sería un React Server component.

    const isVegan = PRODUCTS.get(productName.toLocaleLowerCase());
    const message = isVegan === undefined 
        ? PRODUCT_NOT_FOUND_MSG 
        : isVegan ? IS_VEGAN_MSG : IS_NOT_VEGAN_MSG;

    const image = isVegan === undefined 
        ? NOT_FOUND_PRODUCT_IMG 
        : isVegan ? VEGAN_PRODUCT_IMG : NOT_VEGAN_PRODUCT_IMG;

    return (<>
        
        <Image
            className="max-w-[35%] self-center mb-4 rounded-sm"
            src={image.src}
            alt="Meme vegano"
            width={image.width}
            height={image.height}
        />

        <h3 className="self-center">
            <strong>{productName.charAt(0).toLocaleUpperCase() + productName.slice(1).toLocaleLowerCase()}</strong>
        </h3>
        
        <p className="self-center">{message}</p>
    </>);
}
