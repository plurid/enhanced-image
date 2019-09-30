import { newE2EPage } from '@stencil/core/testing';



describe('text-select-image-settings-menu', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<text-select-image-settings-menu></text-select-image-settings-menu>');
        const element = await page.find('text-select-image-settings-menu');
        expect(element).toHaveClass('hydrated');
    });
});
