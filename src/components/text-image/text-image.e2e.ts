import { newE2EPage } from '@stencil/core/testing';



describe('image-text', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<image-text></image-text>');
        const element = await page.find('image-text');
        expect(element).toHaveClass('hydrated');
    });
});
