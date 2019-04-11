import { newE2EPage } from '@stencil/core/testing';



describe('text-image-editor', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<text-image-editor></text-image-editor>');
        const element = await page.find('text-image-editor');
        expect(element).toHaveClass('hydrated');
    });
});
