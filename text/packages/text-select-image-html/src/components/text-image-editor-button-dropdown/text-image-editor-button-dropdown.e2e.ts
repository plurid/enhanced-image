import { newE2EPage } from '@stencil/core/testing';



describe('text-image-editor-button-dropdown', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<text-image-editor-button-dropdown></text-image-editor-button-dropdown>');
        const element = await page.find('text-image-editor-button-dropdown');
        expect(element).toHaveClass('hydrated');
    });
});
