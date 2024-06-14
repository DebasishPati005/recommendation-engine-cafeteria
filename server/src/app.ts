import crypto from 'crypto';

function generatePassword(password: string) {
    const salt = crypto.randomBytes(10).toString('hex');

    const hash = crypto
        .pbkdf2Sync(password, salt, 100, 16, 'sha512')
        .toString('hex');
    return { hash, salt };
}

const hash = generatePassword('user@12345');

console.log({ ...hash });
