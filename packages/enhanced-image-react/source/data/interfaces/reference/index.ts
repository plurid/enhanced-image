// #region module
export interface EnhancedImageReferenceProperties {
    // #region state
    imageType: any;
    setImageType: any;

    imageBackground: any;
    setImageBackground: any;

    loadedImage: any;
    setLoadedImage: any;
    imageDimensions: any;
    setImageDimensions: any;
    imageBoxDimensions: any;
    setImageBoxDimensions: any;

    showSpinner: any;
    setShowSpinner: any;
    message: any;
    setMessage: any;

    showSettingsButton: any;
    setShowSettingsButton: any;
    showSettingsMenu: any;
    setShowSettingsMenu: any;

    showTooltips: any;
    setShowTooltips: any;

    expandTextDrawer: any;
    setExpandTextDrawer: any;
    expandColorDrawer: any;
    setExpandColorDrawer: any;
    expandTopologyDrawer: any;
    setExpandTopologyDrawer: any;
    expandEntitiesDrawer: any;
    setExpandEntitiesDrawer: any;
    expandVariaDrawer: any;
    setExpandVariaDrawer: any;

    editableText: any;
    setEditableText: any;
    revealedText: any;
    setRevealedText: any;

    editableEntities: any;
    setEditableEntities: any;
    revealedEntities: any;
    setRevealedEntities: any;

    showTransviewSettings: any;
    setShowTransviewSettings: any;
    transviewActive: any;
    setTransviewActive: any;
    transviewSourceLanguage: any;
    setTransviewSourceLanguage: any;
    transviewTargetLanguage: any;
    setTransviewTargetLanguage: any;

    saveImageHref: any;
    setSaveImageHref: any;
    saveImageDownload: any;
    setSaveImageDownload: any;

    imageText: any;
    setImageText: any;
    imageEntities: any;
    setImageEntities: any;

    deletedTexts: any;
    setDeletedTexts: any;

    imageColorsInvert: any;
    setImageColorsInvert: any;
    imageColorsContrast: any;
    setImageColorsContrast: any;
    imageColorsHue: any;
    setImageColorsHue: any;
    imageColorsSaturation: any;
    setImageColorsSaturation: any;
    imageColorsBrightness: any;
    setImageColorsBrightness: any;

    defaultsToggled: any;
    setDefaultsToggled: any;

    previousImageColors: any;
    setPreviousImageColors: any;

    imageTopologyOverflow: any;
    setImageTopologyOverflow: any;
    flipVertical: any;
    setFlipVertical: any;
    flipHorizontal: any;
    setFlipHorizontal: any;
    imageTopologyDrag: any;
    setImageTopologyDrag: any;
    imageTopologyDragging: any;
    setImageTopologyDragging: any;
    imageTopologyX: any;
    setImageTopologyX: any;
    imageTopologyY: any;
    setImageTopologyY: any;
    imageCoordinateX: any;
    setImageCoordinateX: any;
    imageCoordinateY: any;
    setImageCoordinateY: any;
    imageTopologyRotate: any;
    setImageTopologyRotate: any;
    imageTopologyScale: any;
    setImageTopologyScale: any;

    databaseImageID: any;
    setDatabaseImageID: any;
    // #endregion state


    // #region handlers
    handleLoadedImage: any;
    setMessageTimed: any;
    addText: any;
    handleResize: any;
    handleMouseDown: any;
    updateTopologyLocation: any;

    getTextWithApiKey: any;
    getTextWithOwnerToken: any;
    getTextWithImageID: any;
    handleGetText: any;
    getText: any;

    extractTextWithApiKey: any;
    extractTextWithOwnerToken: any;
    extractTextWithImageID: any;
    handleExtractText: any;
    extractText: any;

    saveTextWithApiKey: any;
    saveTextWithOwnerToken: any;
    saveTextWithImageID: any;
    handleSaveText: any;
    saveText: any;

    transviewTextWithApiKey: any;
    transviewTextWithOwnerToken: any;
    transviewTextWithImageID: any;
    handleTransviewText: any;
    transviewText: any;

    addTransviewLanguage: any;
    removeTransviewLanguage: any;
    setActiveTransview: any;
    toggleBackgroundedTransview: any;

    emitAction: any;

    downloadText: any;
    saveImage: any;
    generateImage: any;
    colorizeImage: any;
    cycleImageBackground: any;
    resetDefaultsColor: any;
    resetDefaultsTopology: any;
    viewFullscreen: any;
    shareImage: any;
    viewAbout: any;
    toggleDefaults: any;
    updateVersionContent: any;
    toggleVersionViewable: any;
    duplicateTextItem: any;
    deleteTextItem: any;
    updateTextCoordinates: any;
    updateTextItemField: any;

    addEntity: any;
    convertEntity: any;
    updateEntityField: any;
    duplicateEntity: any;
    obliterateEntity: any;
    // #endregion handlers
}
// #endregion module
