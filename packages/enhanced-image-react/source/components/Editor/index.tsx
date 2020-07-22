/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';


/** external */
import {
    Context,
} from '../../services/utilities';


/** internal */
import {
    StyledTextEditor,
    StyledOutside,
} from './styled';
/** [END] imports */



/** [START] component */
export interface TextEditorProperties {
    positions: {
        x: number;
        y: number;
    };
    drawers: string[];
    toggleDrawer: (
        drawer: string,
    ) => void;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    fullWidth: boolean;
}

const TextEditor: React.FC<TextEditorProperties> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,
        transparentUI,

        imageBoxDimensions,
    } = context;


    /** properties */
    const {
        positions,
        drawers,
        toggleDrawer,
        setWidth,
        fullWidth,
    } = properties;


    /** references */
    const editor = useRef<HTMLDivElement>(null);


    /** state */
    const [outside, setOutside] = useState(<></>);
    const [outsideKind, setOutsideKind] = useState('');
    const [outsideTopBased, setOutsideTopBased] = useState(false);
    const [outsideLeft, setOutsideLeft] = useState(100);


    /** handlers */
    const renderOutside = (
        outside: JSX.Element,
        left: number = 0,
    ) => {
        setOutside(outside);

        const itemLeft = positions.x + left;
        const editorScrollLeft = editor.current
            ? editor.current.scrollLeft
            : 0;

        const outsideLeft = itemLeft - editorScrollLeft;

        setOutsideLeft(outsideLeft);
    }


    /** effects */
    /** Editor width. */
    useEffect(() => {
        if (editor.current) {
            setWidth(editor.current.offsetWidth);
        }
    }, [
        editor,
        drawers.length,
    ]);

    /** Outside top based. */
    useEffect(() => {
        if (positions.y > -34) {
            setOutsideTopBased(false);
        } else {
            setOutsideTopBased(true);
        }
    }, [
        positions.y,
    ]);


    /** render */
    return (
        <>
            <StyledTextEditor
                theme={theme}
                ref={editor}
                transparentUI={transparentUI}
                imageBoxDimensions={imageBoxDimensions}
                fullWidth={fullWidth}
                style={{
                    left: positions.x + 'px',
                    top: positions.y + 'px',
                }}
            >
            </StyledTextEditor>

            <StyledOutside
                theme={theme}
                topBased={outsideTopBased}
                style={{
                    left: outsideLeft + 'px',
                    top: outsideTopBased
                        ? '0'
                        : (positions.y + 34) + 'px',
                }}
            >
                {outside}
            </StyledOutside>
        </>
    );
};


export default TextEditor;
/** [END] component */
