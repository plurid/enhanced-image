import { newE2EPage } from '@stencil/core/testing';



describe('image-select', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<image-select></image-select>');
        const element = await page.find('image-select');
        expect(element).toHaveClass('hydrated');
    });
});
