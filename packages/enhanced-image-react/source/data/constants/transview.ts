export const transviewAvailableLanguages = [
    'Auto-Detect',
    'English',
    'French',
    'German',
    'Romanian',
];

export const transviewTargetLanguages = transviewAvailableLanguages.filter(
    language => language === 'Auto-Detect',
);
