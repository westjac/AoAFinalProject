export function KMP(pattern, text) {
    let M = pattern.length;
    let N = text.length;
    let lps = new Array(M).fill(0);
    let j = 0;
    let i = 0;
    let calculatedLps = CalculateLPSArray(pattern, M, lps);
    
    while (i < N) {
        if (pattern[j] == text[i]) {
            i += 1;
            j += 1;
        }

        if (j == M) {
            console.log("Found pattern at index " + (i - j));
            j = calculatedLps[j-1];
        }
        else if ((i < N) && (pattern[j] != text[i])) {
            if (j != 0) {
                j = calculatedLps[j-1];
            } else {
                i += 1;
            }
        }
    }
}

function CalculateLPSArray(pattern, M, lps) {
    let size = 0;
    let i = 1;

    while (i < M) {
        if(pattern[i] == pattern[size]) {
            size += 1;
            lps[i] = size;
            i += 1;
        } else {
            if (size != 0) {
                size = lps[size-1];
            } else {
                lps[i] = 0;
                i += 1;
            }
        }
    }

    return lps;
}

//let txt = "ABABDABACDABABCABAB";
//let pat = "ABABCABAB";
//KMP(pat, txt);