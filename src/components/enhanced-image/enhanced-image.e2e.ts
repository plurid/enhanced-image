import { newE2EPage } from '@stencil/core/testing';



describe('enhanced-image', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<enhanced-image></enhanced-image>');
        const element = await page.find('enhanced-image');
        expect(element).toHaveClass('hydrated');
    });

    it('renders changes to the name data', async () => {
        const page = await newE2EPage();

        await page.setContent('<enhanced-image></enhanced-image>');
        const component = await page.find('enhanced-image');
        const element = await page.find('enhanced-image >>> div');
        expect(element.textContent).toEqual(``);

        component.setProperty('src', 'test');
        await page.waitForChanges();
        expect(element.textContent).toEqual(`test`);
    });
});
