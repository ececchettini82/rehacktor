import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function LazyLoadGameImage({ image,altName }) {
    return (
        <LazyLoadImage
            src={image}
            alt={altName}
            effect="blur"
            wrapperProps={
                {
                    style: { transictionDelay: "0.5s" }
                }
            }
        />
    );
}