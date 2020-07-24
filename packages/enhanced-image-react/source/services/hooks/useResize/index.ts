/** [START] imports */
/** libraries */
import {
    useState,
    useEffect,
} from 'react';


/** external */


/** internal */
/** [END] imports */



/** [START] hook */
const useResize = (
    updateSize: (
        xDifference: number,
        yDifference: number,
    ) => void,
) => {
    /** state */
    const [resizing, setResizing] = useState(false);
    const [positions, setPositions] = useState({
        x: 0,
        y: 0,
    });


    /** handlers */
    const handleMouseDown = (
        event: any,
    ) => {
        setResizing(true);

        const pageX = event.pageX;
        const pageY = event.pageY;

        const positions = {
            x: pageX,
            y: pageY,
        };
        setPositions(positions);
    }


    /** effects */
    /**
     * Handle resizing (mouseup).
     */
    useEffect(() => {
        const handleMouseUp = () => {
            if (resizing) {
                setResizing(false);
            }
        }

        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [
        resizing,
    ]);

    /**
     * Handle resizing (movemove).
     */
    useEffect(() => {
        const handleMouseMove = (event: any) => {
            if (!resizing) {
                return;
            }

            event.preventDefault();

            const pageX = event.pageX;
            const pageY = event.pageY;

            const differenceX = pageX - positions.x;
            const differenceY = pageY - positions.y;

            updateSize(
                differenceX,
                differenceY,
            );
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [
        resizing,
        positions,
    ]);


    return {
        resizing,
        handleMouseDown,
    };
}


export default useResize;
/** [END] hook */
