import { newE2EPage } from '@stencil/core/testing';



describe('text-select-image', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<text-select-image></text-select-image>');
        const element = await page.find('text-select-image');
        expect(element).toHaveClass('hydrated');
    });
});
