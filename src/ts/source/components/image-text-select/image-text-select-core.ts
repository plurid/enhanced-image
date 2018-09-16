import { HTMLImageTextSelectElement } from './image-text-select-define';
import { HTMLImageTextElement } from '../image-text/image-text-define';
import { HTMLImageSelectElement } from '../image-select/image-select-define';



interface IImageText {
    id: string,
    begin: number,
    end: number,
    xCoord: number,
    yCoord: number,
    perspective: string,
    rotation: string,
    skew: string,
    fontFamily: string,
    fontSize: number,
    letterSpacing: number,
    lineHeight: number,
    wordSpacing: number,
    textContent: string
}


interface IITSData {
    id: string,
    imageText: IImageText[]
}


export function setImage(its: HTMLImageTextSelectElement) {
    // Create img element.
    const imgEl: HTMLImageElement = document.createElement('img');

    // Set video attributes.
    // imgEl.autoplay = its.autoplay;
    // imgEl.controls = its.controls;
    imgEl.height = parseInt(its.height);
    // imgEl.loop = its.loop;
    // imgEl.muted = its.muted;
    // imgEl.poster = its.poster;
    // imgEl.preload = its.preload;
    imgEl.src = its.source;
    imgEl.width = parseInt(its.width);

    // If text has been generated, load it from database
    // or get it from server and set it in page.

    // If text has not been generated, add event listener to generate button.

    // To generate:
    // 1. send img to server
    // 2. receive text data
    // 3. store text data or store only the img id for further retrieval

    // In future:
    // Allow the user to change the text select
    // and/or the text characteristics (placement, size, font, etc)
    // and send that feedback to server
    // for a better calibration of text-image.

    its.appendChild(imgEl);


    // Dummy load data and based on it set the img text.
    loadJSON('./data/text.json', (itsData: IITSData) => {
        setImageText(its, itsData);
    });
}


function setImageText(image: HTMLImageTextSelectElement, itsData: IITSData) {
    const imageEl = image.getElementsByTagName('image')[0];

    image.id = itsData.id;

    let imageText: HTMLImageTextElement = document.createElement('image-text');

    itsData.imageText.map((imageTextEl: IImageText) => {
        let imageSelect: HTMLImageSelectElement = document.createElement('image-select');
        imageSelect.innerHTML = escapeHTML(imageTextEl.textContent);
        imageSelect.id = imageTextEl.id;

        // imageEl.addEventListener( "loadedmetadata", () => {
        //     // let width = imageEl.videoWidth;
        //     // let height = imageEl.videoHeight;
        //     let ratioHW = height/width;
        //     let ratioWH = width/height;

        //     // console.log('width', width);
        //     // console.log('height', height);
        //     // console.log('ratioHW', ratioHW);
        //     // console.log('ratioWH', ratioWH);
        //     // console.log('duration', videoEl.duration);

        //     return {
        //         width: width,
        //         height: height,
        //         ratioHW: ratioHW,
        //         ratioWH: ratioWH
        //     }
        // }, false );


        // let videoBounding = videoEl.getBoundingClientRect();
        // let videoWidth = videoBounding.width;
        // let videoWidth = videoEl.offsetWidth;
        // let videoHeight = videoEl.offsetHeight;
        // let videoHeight = videoEl.videoHeight;
        // let videoWidth = videoEl.videoWidth;
        // let videoHeight = videoBounding.height;
        // console.log('width', videoWidth);
        // console.log('height', videoHeight);
        // console.log(videoBounding);

        // values are good for 995px width page
        imageSelect.style.fontFamily = imageTextEl.fontFamily;
        imageSelect.style.fontSize = imageTextEl.fontSize + 'px';
        imageSelect.style.letterSpacing = imageTextEl.letterSpacing + 'px';
        imageSelect.style.lineHeight = imageTextEl.lineHeight + 'px';
        imageSelect.style.wordSpacing = imageTextEl.wordSpacing + 'px';

        imageSelect.style.left = imageTextEl.xCoord + 'px';
        imageSelect.style.top = imageTextEl.yCoord + 'px';

        imageText.appendChild(imageSelect);
    });

    image.appendChild(imageText);


    // Get aspect ratio of the video in a promise

    // Get rendered width, calculate height of the video

    // For each text in the video text select object,
    // adjust the positioning, size, etc of the text
    // based on the ratio between current width (height)
    // and video resolution width (height).

    // Set text on page

    // Listen for page resize and repeat
}




/**
 * Utility function to escape HTML entities from a given string.
 *
 * @param unsafe {string}
 */
function escapeHTML(unsafe: string) {
    return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}



/**
 * Utility function to load dummy data
 * which will be received from the server.
 *
 * @param path {string}
 * @param callback {Function}
 */
function loadJSON(path: string, callback: Function) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");

    xobj.open('GET', path, true);
    xobj.onreadystatechange = () => {
        if (xobj.readyState == 4 && xobj.status == 200) {
            callback( JSON.parse(xobj.responseText) );
        }
    };

    xobj.send(null);
}
