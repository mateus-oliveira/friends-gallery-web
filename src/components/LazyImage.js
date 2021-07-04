import React, {useState} from 'react';

export default function LazyImage({className, alt, src, srcLow, onClick}) {
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            <img 
                alt={alt} 
                src={src} 
                onLoad={() => setLoaded(true)}
                className={`${loaded ? 'block ' : 'hidden '} ${className} `}
                onClick={onClick}
            />
            <img 
                alt={alt} 
                src={srcLow} 
                className={`${loaded ? 'hidden ' : 'block '} ${className} filter blur-sm`}
                onClick={onClick}
            />
        </>
    )
}