import { Component, Prop } from '@stencil/core';

import aboutIcon from '../../assets/about-icon.svg';
import addTextIcon from '../../assets/add-text-icon.svg';



@Component({
    tag: 'text-select-image-settings-menu',
    styleUrl: 'text-select-image-settings-menu.css',
    shadow: true,
})
export class TextSelectImageSettingsMenu {
    @Prop() private toggleMenu: () => void;
    @Prop() private editable: boolean;
    @Prop() private toggleEditable: () => void;

    @Prop() private addText: () => void;

    public render() {
        return (
            <div class="text-select-image-settings-menu">
                <ul>
                    <li>
                        <text-select-image-button-checkmark
                            toggle={this.toggleEditable}
                            text="Edit"
                            checked={this.editable}
                        />
                    </li>
                    <li>
                        <text-select-image-button-item
                            atClick={this.add}
                            icon={addTextIcon}
                            text="Add text"
                        />
                    </li>
                    <hr class="text-select-image-hr"/>
                    <li>
                        <text-select-image-button-item
                            atClick={this.about}
                            icon={aboutIcon}
                            text="About TSI"
                        />
                    </li>
                </ul>
            </div>
        );
    }

    private add = () => {
        this.toggleMenu();
        this.addText();
    }

    private about = () => {
        const aboutURL = 'https://github.com/plurid/text-select-image';
        window.open(aboutURL, '_blank');
    }
}
