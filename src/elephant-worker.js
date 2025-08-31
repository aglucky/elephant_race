const binomialCoefficient = (n, k) => {
    if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0) {
        return 0;
    }
    
    if (k === 0 || k === n) return 1;
    if (k === 1 || k === n - 1) return n;
    if (k > n) return 0;
    
    const effectiveK = Math.min(k, n - k);
    const result = Array.from({ length: effectiveK }, (_, i) => i).reduce((acc, i) => {
        return (acc * (n - i)) / (i + 1);
    }, 1);
    return Math.round(result);
};

const getMinNumGroups = (num_elephants) => {
    for (let n = 0; n <= num_elephants; n++) {
        if (binomialCoefficient(n, Math.floor(n/2)) >= num_elephants) {
            return n;
        }
    }
    throw new Error("No valid k found");
};

const getEncodings = (min_groups, k) => {
    let validEncodings = [];
    for (let i = 0; i <= Math.pow(2, min_groups); i++) {
        const binaryString = i.toString(2).padStart(min_groups, '0');
        if (binaryString.split('').filter(x => x == "1").length == k) {
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
    let groups = Array.from({ length: minGroups }, () => []);
    
    // Group the elephants
    for (let group = 0; group < minGroups; group++) {
        for (let elephant = 0; elephant < numElephants; elephant++) {
            if (encodings[elephant] && encodings[elephant][group] === '1') {
                groups[group].push(elephant + 1);
            }
        }
    }
    
    return {
        numElephants,
        minGroups,
        k,
        encodings: encodings.length,
        groups
    };
};

// Listen for messages from the main thread
self.addEventListener('message', function(e) {
    try {
        const { numElephants } = e.data;
        const result = calculateGroups(numElephants);
        self.postMessage({ success: true, result });
    } catch (error) {
        self.postMessage({ 
            success: false, 
            error: error.message 
        });
    }
});
