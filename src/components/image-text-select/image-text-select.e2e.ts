import { newE2EPage } from '@stencil/core/testing';



describe('image-text-select', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<image-text-select></image-text-select>');
        const element = await page.find('image-text-select');
        expect(element).toHaveClass('hydrated');
    });
});
