/** [START] imports */
/** libraries */
import {
    useState,
    useEffect,
} from 'react';


/** external */
import {
    ImageBoxDimensions,
} from '#data/interfaces';


/** internal */
import {
    percentageFromValue,
} from '#services/utilities';
/** [END] imports */



/** [START] hook */
const useGrab = (
    position: any,
    imageBoxDimensions: ImageBoxDimensions,
    element: HTMLDivElement | null,
) => {
    const absoluteX = position.x * imageBoxDimensions.width / 100 + 'px';
    const absoluteY = position.y * imageBoxDimensions.height / 100 + 'px';


    /** state */
    const [xCoordinate, setXCoordinate] = useState(absoluteX);
    const [yCoordinate, setYCoordinate] = useState(absoluteY);
    const [draggable, setDraggable] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [positions, setPositions] = useState({
        x: 0,
        y: 0,
    });
    const [coordinatesPercentage, setCoordinatesPercentage] = useState({
        x: position.x,
        y: position.y,
    });


    /** handlers */
    const handleMouseDown = (
        event: any,
    ) => {
        if (event.target !== element) {
            return;
        }

        if (draggable) {
            setDragging(true);

            const pageX = event.pageX;
            const pageY = event.pageY;

            const positions = {
                x: pageX,
                y: pageY,
            };
            setPositions(positions);
        }
    }

    const incrementLocation = (
        x: number,
        y: number,
        pageX?: number,
        pageY?: number,
    ) => {
        if (!element) {
            return;
        }

        const {
            offsetLeft,
            offsetTop,
        } = element;

        const updatedPositions = {
            x: pageX || positions.x,
            y: pageY || positions.y,
        };
        setPositions(updatedPositions);

        const textXCoordinate = offsetLeft + x;
        const textYCoordinate = offsetTop + y;
        const textXCoord = textXCoordinate + 'px';
        const textYCoord = textYCoordinate + 'px';
        setXCoordinate(textXCoord);
        setYCoordinate(textYCoord);

        const xCoordPercentage = percentageFromValue(
            textXCoordinate,
            imageBoxDimensions.width,
        );
        const yCoordPercentage = percentageFromValue(
            textYCoordinate,
            imageBoxDimensions.height,
        );

        const coordinatesPercentage = {
            x: xCoordPercentage,
            y: yCoordPercentage,
        };
        setCoordinatesPercentage(coordinatesPercentage);
    }


    /** effects */
    /**
     * Handle dragging (mouseup).
     */
    useEffect(() => {
        const handleMouseUp = () => {
            if (draggable) {
                setDragging(false);
            }
        }

        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [
        dragging,
        draggable,
    ]);

    /**
     * Handle dragging (movemove).
     */
    useEffect(() => {
        const handleMouseMove = (event: any) => {
            if (!dragging) {
                return;
            }

            event.preventDefault();

            const pageX = event.pageX;
            const pageY = event.pageY;

            const differenceX = pageX - positions.x;
            const differenceY = pageY - positions.y;

            incrementLocation(
                differenceX,
                differenceY,
                pageX,
                pageY,
            );
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [
        dragging,
        draggable,
        positions,
    ]);


    return {
        xCoordinate,
        yCoordinate,
        draggable,
        setDraggable,
        dragging,
        handleMouseDown,
        coordinatesPercentage,
    };
}


export default useGrab;
/** [END] hook */
