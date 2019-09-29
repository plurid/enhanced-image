import { loadImage } from './image';
import { arrayBufferToWordArray } from './arrayBuffer';

import CryptoJS from 'crypto-js';
import sha256 from 'crypto-js/sha256';



/**
 * Compute a unique SHA from the image data
 */
const computeImageSha = async function(src: string) {
    const image: any = await loadImage(src);
    const { width, height } = image;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context: any = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    const sha = sha256(arrayBufferToWordArray(imageData.data));
    const shaString = sha.toString(CryptoJS.enc.Hex);

    return shaString;
}


export default computeImageSha;
