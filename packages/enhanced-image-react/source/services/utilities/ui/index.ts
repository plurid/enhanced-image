export const toggleDrawer = (
    drawer: string,
    editorDrawers: string[],
    setEditorDrawers: any,
) => {
    if (editorDrawers.includes(drawer)) {
        const drawers = editorDrawers.filter(eDrawer => eDrawer !== drawer);
        setEditorDrawers(drawers);
    } else {
        const drawers = [
            ...editorDrawers,
            drawer,
        ];
        setEditorDrawers(drawers);
    }
}
