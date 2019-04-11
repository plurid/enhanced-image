import { newE2EPage } from '@stencil/core/testing';



describe('select-image', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<select-image></select-image>');
        const element = await page.find('select-image');
        expect(element).toHaveClass('hydrated');
    });
});
