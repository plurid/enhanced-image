import { Component } from '@stencil/core';



@Component({
    tag: 'select-image',
    styleUrl: 'select-image.css',
    shadow: true
})
export class SelectImage {
    render() {
        return (
            <div>SelectImage Works
                <text-image />
                <text-image />
            </div>
        );
    }
}
