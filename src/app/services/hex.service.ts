import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HexService {

    constructor() { }

    Encode(text) {
        let ch = 0;
        let result = "";
        for (let i = 0; i < text.length; i++) {
            ch = text.charCodeAt(i);
            if (ch > 0xFF) ch -= 0x350;
            let chs = ch.toString(16);
            while (chs.length < 2) chs = "0" + chs;
            result += chs;
        }

        return result;
    }

    // Decode(hex) {
    //     var ch = 0;
    //     var result = "";
    //     hex = trim(hex);
    //     for (var i = 2; i <= hex.length; i += 2) {
    //         ch = parseInt(hex.substring(i - 2, i), 16);
    //         if (ch >= 128) ch += 0x350;
    //         let chs = String.fromCharCode("0x" + ch.toString(16));
    //         result += chs;
    //     }
    //     return result;
    // }
}
