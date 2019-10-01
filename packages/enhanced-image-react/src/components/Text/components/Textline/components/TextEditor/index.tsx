import React, {
    useContext,
    useRef,
    useEffect,
} from 'react';

import {
    StyledTextEditor,
    StyledVerticalDivider,
} from './styled';

import Context from '../../../../../../services/utilities/context';

import ButtonDropdown from './components/ButtonDropdown';
import ButtonIncrements from './components/ButtonIncrements';
// import ButtonTimeIncrements from './components/ButtonTimeIncrements';
import ButtonInput from './components/ButtonInput';
import ButtonToggle from './components/ButtonToggle';
import ButtonsColors from './components/ButtonsColors';
import ButtonClick from './components/ButtonClick';

import { selectableFonts } from '../../../../../../data/constants/fonts';

import SelectTextIcon from '../../../../../../assets/icons/text-editor/select-text';
import GrabIcon from '../../../../../../assets/icons/text-editor/grab';
import ViewableIcon from '../../../../../../assets/icons/text-editor/viewable';
import FontSizeIcon from '../../../../../../assets/icons/text-editor/font-size';
import LinkIcon from '../../../../../../assets/icons/text-editor/link';
import BoldIcon from '../../../../../../assets/icons/text-editor/bold';
import ItalicIcon from '../../../../../../assets/icons/text-editor/italic';
import LetterSpacingIcon from '../../../../../../assets/icons/text-editor/letter-spacing';
import WordSpacingIcon from '../../../../../../assets/icons/text-editor/word-spacing';
import DuplicateIcon from '../../../../../../assets/icons/text-editor/duplicate';
import DeleteIcon from '../../../../../../assets/icons/text-editor/delete';

// import {
//     percentageFromValue,
//     valueFromPercentage,
// } from '../../utils/percentage';

import {
    ImageTextVersionTextline,
} from '../../../../../../data/interfaces';



interface TextEditorProperties {
    data: ImageTextVersionTextline;
}

const TextEditor: React.FC<TextEditorProperties> = (properties) => {
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,

        editableText,
        setEditableText,

        imageBoxDimensions,
    } = context;

    const editor = useRef<HTMLDivElement>(null);

    const {
        data,
    } = properties;

    return (
        <StyledTextEditor
            theme={theme}
            ref={editor}
        >
            <ButtonToggle
                theme={theme}
                toggle={() => setEditableText(show => !show)}
                toggled={editableText}
                icon={SelectTextIcon}
            />

            <ButtonToggle
                theme={theme}
                // toggle={toggleTextDraggable}
                // toggled={textDraggable}
                toggle={() => {}}
                toggled={false}
                icon={GrabIcon}
            />

            <ButtonToggle
                theme={theme}
                // toggle={toggleTextViewable}
                // toggled={textViewable}
                toggle={() => {}}
                toggled={false}
                icon={ViewableIcon}
                // icon={textViewable ? ViewableIcon : NotViewableIcon}
            />

            <StyledVerticalDivider
                theme={theme}
            >
                &nbsp;
            </StyledVerticalDivider>

            <ButtonIncrements
                theme={theme}
                type="fontSize"
                changeValue={() => {}}
                // changeValue={this.updateField}
                value={data.fontSizePercentage * imageBoxDimensions.height / 100}
                icon={FontSizeIcon}
            />

            <ButtonDropdown
                theme={theme}
                type="fontFamily"
                alterStyle="fontFamily"
                selected={data.fontFamily}
                selectables={selectableFonts}
                changeSelected={() => {}}
                // changeSelected={this.updateField}
                toggleEditor={() => {}}
                textDraggable={false}
                toggleTextDraggable={() => {}}
                toggleTextSelected={() => {}}
                // toggleEditor={toggleEditor}
                // textDraggable={textDraggable}
                // toggleTextDraggable={toggleTextDraggable}
                // toggleTextSelected={toggleSelected}
            />

            <ButtonInput
                theme={theme}
                toggle={() => {}}
                // toggle={this.updateField.bind(this, 'link')}
                toggled={data.link}
                icon={LinkIcon}
                value={data.linkTo}
                valueType="linkTo"
                changeValue={() => {}}
                // changeValue={this.updateField}
            />

            <ButtonToggle
                theme={theme}
                toggle={() => {}}
                // toggle={this.updateField.bind(this, 'bold')}
                toggled={data.fontWeight === 'bold'}
                icon={BoldIcon}
            />

            <ButtonToggle
                theme={theme}
                toggle={() => {}}
                // toggle={this.updateField.bind(this, 'italic')}
                toggled={data.fontStyle === 'italic'}
                icon={ItalicIcon}
            />

            <ButtonIncrements
                theme={theme}
                type="letterSpacing"
                changeValue={() => {}}
                // changeValue={this.updateField}
                value={data.letterSpacingPercentage * imageBoxDimensions.width / 100}
                icon={LetterSpacingIcon}
                step={0.1}
            />

            <ButtonIncrements
                theme={theme}
                type="wordSpacing"
                changeValue={() => {}}
                // changeValue={this.updateField}
                value={data.wordSpacingPercentage * imageBoxDimensions.width / 100}
                icon={WordSpacingIcon}
                step={0.1}
            />

            <ButtonsColors
                changeValue={() => {}}
                // changeValue={this.updateField}
                color={data.color}
            />

            <StyledVerticalDivider
                theme={theme}
            >
                &nbsp;
            </StyledVerticalDivider>

            <ButtonClick
                theme={theme}
                atClick={() => {}}
                // atClick={this.duplicate}
                icon={DuplicateIcon}
            />

            <ButtonClick
                theme={theme}
                atClick={() => {}}
                // atClick={this.delete}
                icon={DeleteIcon}
            />
        </StyledTextEditor>
    );
};


export default TextEditor;





// class TextVideoEditor extends Component<any, any> {
//     static contextType = Context;
//     public editor: any = React.createRef();

//     public componentDidMount() {
//         const {
//             setEditorWidth,
//         } = this.context

//         const editorWidth = this.editor.current.offsetWidth;
//         // console.log('editorWidth', editorWidth);
//         setEditorWidth(editorWidth);
//     }

//     public render() {
//         const {
//             theme,
//             videoBoxWidth,
//             videoBoxHeight,
//         } = this.context;

//         const {
//             toggleTextEditable,
//             textEditable,
//             toggleTextDraggable,
//             textDraggable,
//             toggleTextViewable,
//             textViewable,
//             toggleEditor,
//             toggleSelected,
//             xCoord,
//             yCoord,
//             version,
//             toggleTextAlwaysShow,
//             textAlwaysShow,
//         } = this.props;

//         const {
//             startTime,
//             endTime,
//             color,
//             fontSizePercentage,
//             fontFamily,
//             bold,
//             italic,
//             link,
//             linkTo,
//             wordSpacingPercentage,
//             letterSpacingPercentage,
//         } = version;

//         const fontSize = Math.round(valueFromPercentage(fontSizePercentage, videoBoxHeight));
//         const letterSpacing = valueFromPercentage(letterSpacingPercentage, videoBoxWidth);
//         const wordSpacing = valueFromPercentage(wordSpacingPercentage, videoBoxWidth);

//         return (
//             <StyledTextVideoEditor
//                 theme={theme}
//                 style={{
//                     left: xCoord + 'px',
//                     top: yCoord + 'px',
//                 }}
//                 ref={this.editor}
//             >

//             </StyledTextVideoEditor>
//         );
//     }

//     private updateField = (element: any, value?: any) => {
//         const {
//             updateTextVideoField,
//             videoBoxWidth,
//             videoBoxHeight,
//         } = this.context;

//         const {
//             textId,
//             version,
//         } = this.props;

//         let el = element;
//         let val: string | number | boolean | undefined = value;

//         switch(element) {
//             case 'fontSize':
//                 el = 'fontSizePercentage';
//                 val = percentageFromValue(value, videoBoxHeight);
//                 break;
//             case 'letterSpacing':
//                 el = 'letterSpacingPercentage';
//                 val = percentageFromValue(value, videoBoxWidth);
//                 break;
//             case 'wordSpacing':
//                 el = 'wordSpacingPercentage';
//                 val = percentageFromValue(value, videoBoxWidth);
//                 break;
//             case 'link':
//                 el = 'link';
//                 val = !version.link;
//                 break;
//             case 'bold':
//                 el = 'bold';
//                 val = !version.bold;
//                 break;
//             case 'italic':
//                 el = 'italic';
//                 val = !version.italic;
//                 break;
//             default:
//                 el = element;
//                 val = value;
//         }

//         // console.log(el, val);
//         updateTextVideoField(textId, el, val);
//     }

//     private duplicate = () => {
//         const {
//             duplicateTextVideo,
//             toggleTextEditable,
//             textEditable,
//             toggleTextDraggable,
//             textDraggable,
//         } = this.context;

//         if (textEditable) {
//             toggleTextEditable();
//         }

//         if (textDraggable) {
//             toggleTextDraggable();
//         }

//         const {
//             textId
//         } = this.props;

//         duplicateTextVideo(textId);
//     }

//     private delete = () => {
//         const {
//             deleteTextVideo,
//             toggleTextEditable,
//             textEditable,
//             toggleTextDraggable,
//             textDraggable,
//         } = this.context;

//         if (textEditable) {
//             toggleTextEditable();
//         }

//         if (textDraggable) {
//             toggleTextDraggable();
//         }

//         const {
//             textId,
//         } = this.props;

//         deleteTextVideo(textId);
//     }
// }


// export default TextVideoEditor;
