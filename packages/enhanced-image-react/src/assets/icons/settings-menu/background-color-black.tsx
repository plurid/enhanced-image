import React from 'react';



const SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <title>Black</title>

        <defs>
            <style>
                {`
                    .cls-1, .cls-3 {
                        stroke: #000;
                        stroke-miterlimit: 10;
                        stroke-width: 2px;
                    }

                    .cls-2 {
                        fill: #fff;
                    }

                    .cls-3 {
                        fill: none;
                    }
                `}
            </style>
        </defs>
        <g>
            <circle className="cls-1" cx="500" cy="500" r="353"/>
            <g>
                <path className="cls-2" d="M500,50C251.47,50,50,251.47,50,500S251.47,950,500,950,950,748.53,950,500,748.53,50,500,50Zm0,803c-195,0-353-158-353-353S305,147,500,147,853,305,853,500,695,853,500,853Z"/>
                <path className="cls-3" d="M500,50C251.47,50,50,251.47,50,500S251.47,950,500,950,950,748.53,950,500,748.53,50,500,50Zm0,803c-195,0-353-158-353-353S305,147,500,147,853,305,853,500,695,853,500,853Z"/>
            </g>
        </g>
    </svg>
);


export default SVG;
