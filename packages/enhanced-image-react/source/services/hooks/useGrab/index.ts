/** [START] imports */
/** libraries */
import {
    useState,
    useEffect,
} from 'react';

/** external */
/** internal */
/** [END] imports */



const useGrab = (
    absoluteX: string,
    absoluteY: string,
    element: any,
) => {
    /** state */
    const [xCoordinate, setXCoordinate] = useState(absoluteX);
    const [yCoordinate, setYCoordinate] = useState(absoluteY);
    const [draggable, setDraggable] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [positions, setPositions] = useState({
        x: 0,
        y: 0,
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
    };
}


export default useGrab;
