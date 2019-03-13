import { newE2EPage } from '@stencil/core/testing';



describe('text-select-image-settings', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<text-select-image-settings></text-select-image-settings>');
        const element = await page.find('text-select-image-settings');
        expect(element).toHaveClass('hydrated');
    });
});
