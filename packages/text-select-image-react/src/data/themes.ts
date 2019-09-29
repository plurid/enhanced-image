const themes = {
    night: {
        backgroundColor: 'hsl(220, 2%, 4%)',
        backgroundColorSecondary: 'hsl(220, 2%, 14%)',
        backgroundColorHover: 'hsla(220, 2%, 44%, 0.3)',
        color: 'hsl(220, 2%, 87%)',
        colorSecondary: 'hsl(220, 2%, 67%)',
    },
    dusk: {
        backgroundColor: 'hsl(220, 2%, 15%)',
        backgroundColorSecondary: 'hsl(220, 2%, 25%)',
        backgroundColorHover: 'hsla(220, 2%, 55%, 0.3)',
        color: 'hsl(220, 2%, 93%)',
        colorSecondary: 'hsl(220, 2%, 73%)',
    },
    dawn: {
        backgroundColor: 'hsl(220, 2%, 70%)',
        backgroundColorSecondary: 'hsl(220, 2%, 50%)',
        backgroundColorHover: 'hsla(220, 2%, 40%, 0.3)',
        color: 'hsl(220, 2%, 17%)',
        colorSecondary: 'hsl(220, 2%, 47%)',
    },
    light: {
        backgroundColor: 'hsl(220, 2%, 97%)',
        backgroundColorSecondary: 'hsl(220, 2%, 77%)',
        backgroundColorHover: 'hsla(220, 2%, 55%, 0.3)',
        color: 'hsl(220, 2%, 10%)',
        colorSecondary: 'hsl(220, 2%, 35%)',
    },
    gradient: {
        backgroundColor: 'hsl(325, 70%, 45%)',
        backgroundColorSecondary: 'hsla(325, 70%, 35%, 0.5)',
        backgroundGradient: `
            linear-gradient(217deg, hsla(325, 70%, 45%, 1), hsla(0, 100%, 50%, 0) 60.71%),
            linear-gradient(127deg, hsla(310, 50%, 45%, 1), hsl(285, 60%, 35%) 70.71%)
        `,
        backgroundColorHover: 'hsla(290, 30%, 25%, 0.3)',
        color: 'hsl(220, 2%, 95%)',
        colorSecondary: 'hsl(220, 2%, 75%)',
    },
};


export default themes;
