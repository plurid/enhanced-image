import { newE2EPage } from '@stencil/core/testing';



describe('text-image', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<text-image></text-image>');
        const element = await page.find('text-image');
        expect(element).toHaveClass('hydrated');
    });
});
