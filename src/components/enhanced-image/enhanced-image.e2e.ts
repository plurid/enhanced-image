import { newE2EPage } from '@stencil/core/testing';



describe('enhanced-image', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<enhanced-image></enhanced-image>');
        const element = await page.find('enhanced-image');
        expect(element).toHaveClass('hydrated');
    });
});
