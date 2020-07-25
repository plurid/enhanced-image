/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';


/** external */
import Drawer from '#components/Editor/components/Drawer';

import {
    Context,
} from '#services/utilities';


/** internal */
/** [END] imports */



/** [START] component */
export interface TransformDrawerProperties {
    /** required */
    /** - values */
    drawers: string[];
    /** - methods */
    toggleDrawer: (
        drawer: string,
    ) => void;

    /** optional */
    /** - values */
    /** - methods */
}

const TransformDrawer: React.FC<TransformDrawerProperties> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,
    } = context;


    /** properties */
    const {
        /** required */
        /** - values */
        drawers,
        /** - methods */
        toggleDrawer,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <Drawer
            theme={theme}
            title="Transform"
            expand={drawers.includes('TRANSFORM')}
            toggleExpand={() => toggleDrawer('TRANSFORM')}
        >
            {/* <StyledTransformSliders>
                <Slider
                    value={currentVersion.transform.perspective + 1}
                    valueType="transform.perspective"
                    changeValue={updateField}
                    theme={theme}
                    transparentUI={transparentUI}
                    Icon={PluridIconSpace}
                    renderOutside={renderOutside}
                    min={1}
                    step={10}
                    max={2001}
                    show={transformSlider}
                    setShow={setTransformSlider}
                />

                <Slider
                    value={currentVersion.transform.rx + 1}
                    valueType="transform.rx"
                    changeValue={updateField}
                    theme={theme}
                    transparentUI={transparentUI}
                    Icon={() => (
                        <div>
                            Rx
                        </div>
                    )}
                    renderOutside={renderOutside}
                    min={1}
                    max={361}
                    show={transformSlider}
                    setShow={setTransformSlider}
                />

                <Slider
                    value={currentVersion.transform.ry + 1}
                    valueType="transform.ry"
                    changeValue={updateField}
                    theme={theme}
                    transparentUI={transparentUI}
                    Icon={() => (
                        <div>
                            Ry
                        </div>
                    )}
                    renderOutside={renderOutside}
                    min={1}
                    max={361}
                    show={transformSlider}
                    setShow={setTransformSlider}
                />

                <Slider
                    value={currentVersion.transform.rz + 1}
                    valueType="transform.rz"
                    changeValue={updateField}
                    theme={theme}
                    transparentUI={transparentUI}
                    Icon={() => (
                        <div>
                            Rz
                        </div>
                    )}
                    renderOutside={renderOutside}
                    min={1}
                    max={361}
                    show={transformSlider}
                    setShow={setTransformSlider}
                />

                <Slider
                    value={currentVersion.transform.sx + 1}
                    valueType="transform.sx"
                    changeValue={updateField}
                    theme={theme}
                    transparentUI={transparentUI}
                    Icon={() => (
                        <div>
                            Sx
                        </div>
                    )}
                    renderOutside={renderOutside}
                    min={1}
                    max={361}
                    show={transformSlider}
                    setShow={setTransformSlider}
                />

                <Slider
                    value={currentVersion.transform.sy + 1}
                    valueType="transform.sy"
                    changeValue={updateField}
                    theme={theme}
                    transparentUI={transparentUI}
                    Icon={() => (
                        <div>
                            Sy
                        </div>
                    )}
                    renderOutside={renderOutside}
                    min={1}
                    max={361}
                    show={transformSlider}
                    setShow={setTransformSlider}
                />
            </StyledTransformSliders> */}
        </Drawer>
    );
}


export default TransformDrawer;
/** [END] component */
