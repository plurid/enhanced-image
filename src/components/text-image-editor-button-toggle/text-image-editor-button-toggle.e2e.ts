import { newE2EPage } from '@stencil/core/testing';



describe('text-image-editor-button-toggle', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<text-image-editor-button-toggle></text-image-editor-button-toggle>');
        const element = await page.find('text-image-editor-button-toggle');
        expect(element).toHaveClass('hydrated');
    });
});
