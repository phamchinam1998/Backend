export class Random {
    SET = {
        ALPHABET : "0123456789ABCDEFGHIJKLMNOPQRTSUVWXYZ",
        NUMBER : "0123456789",
        UPPERCASE : "0123456789ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrtsuvwxyz"
    }

    randomString(length, chars) {
        const result = [];
        const leng = chars.length;
        for (let i = length; i > 0; --i) {
            result[i] = chars[Math.floor(Math.random() * leng)];
        }
        return result.join('');
    }

    alphabet(l) {
        return this.randomString(l, this.SET.ALPHABET);
    }
    
    number(l) {
        return this.randomString(l, this.SET.NUMBER);
    }

    uppercase(l) {
        return this.randomString(l, this.SET.UPPERCASE);
    }
}

