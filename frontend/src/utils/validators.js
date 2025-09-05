export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 64;

export const isName = (v) => {
    const name = v.trim();
    return (
        name.length >= 3 &&
        name.length <= 16 &&
        /^[\p{L}]+$/u.test(name)
    );
};

export const isStrongPassword = (v) => {
    return (
        v.length >= 8 &&
        /[a-zA-Z]/.test(v) &&
        /[A-Z]/.test(v) &&
        /\d/.test(v)
    );
};

export const passMatches = (password, confirm_password) => password === confirm_password;
