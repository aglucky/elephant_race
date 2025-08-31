const binomialCoefficient = (n, k) => {
    if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0) return 0;
    if (k === 0 || k === n) return 1;
    if (k === 1 || k === n - 1) return n;
    if (k > n) return 0;
    
    const effectiveK = Math.min(k, n - k);
    return Math.round(Array.from({ length: effectiveK }, (_, i) => i).reduce((acc, i) => 
        (acc * (n - i)) / (i + 1), 1
    ));
};

const getMinNumGroups = (numElephants) => {
    for (let n = 0; n <= numElephants; n++) {
        if (binomialCoefficient(n, Math.floor(n/2)) >= numElephants) return n;
    }
    throw new Error("No valid k found");
};

const getEncodings = (minGroups, k) => {
    const validEncodings = [];
    for (let i = 0; i <= Math.pow(2, minGroups); i++) {
        const binaryString = i.toString(2).padStart(minGroups, '0');
        if (binaryString.split('').filter(x => x === "1").length === k) {
            validEncodings.push(binaryString);
        }
    }
    return validEncodings;
};

const calculateGroups = (numElephants) => {
    if (!Number.isInteger(numElephants) || numElephants < 1) {
        throw new Error(`Invalid number of elephants: ${numElephants}`);
    }
    
    const minGroups = getMinNumGroups(numElephants);
    const k = Math.floor(minGroups / 2);
    const encodings = getEncodings(minGroups, k);
    const groups = Array.from({ length: minGroups }, () => []);
    
    for (let group = 0; group < minGroups; group++) {
        for (let elephant = 0; elephant < numElephants; elephant++) {
            if (encodings[elephant] && encodings[elephant][group] === '1') {
                groups[group].push(elephant + 1);
            }
        }
    }
    
    return { numElephants, minGroups, k, encodings: encodings.length, groups };
};

self.addEventListener('message', e => {
    try {
        const result = calculateGroups(e.data.numElephants);
        self.postMessage({ success: true, result });
    } catch (error) {
        self.postMessage({ success: false, error: error.message });
    }
});
