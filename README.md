# 🐘 Elephant Race Visualizer

An interactive web application that demonstrates the solution to "The Great Elephant Race" riddle using combinatorial mathematics and binary encodings.

This was made for my blog post: [The Great Elephant Race](https://adamgluck.com/posts/elephant_race).

## 📖 The Problem

**The Riddle:** There are 900 elephants in a race. Bob and Charlie know which elephants are in 1st and 2nd place. You are allowed to ask Bob a question about the race that he will respond to with a number from 1 to n. After that, Charlie will give you the number of either the 1st or 2nd place elephant. You have to use Bob's answer to determine whether Charlie's number is the 1st or 2nd place elephant.

**The Question:** What is the lowest upper bound of n that Bob can give you so that you can determine if the elephant Charlie gave you finished in 1st or 2nd?

## 🧮 The Mathematical Solution

The solution uses **Sperner's Theorem** and binary encodings to create a minimal set of groups that can distinguish between any two elephants.

### Key Concepts

1. **Binary Encodings**: Each elephant gets a unique binary code where each position represents membership in a group
2. **Sperner's Theorem**: The largest possible family of non-overlapping subsets for an N-sized set is `(N choose ⌊N/2⌋)`
3. **Optimal Grouping**: We need to find the minimum N such that `(N choose ⌊N/2⌋) ≥ number_of_elephants`

### For 900 Elephants

- **Minimum Groups Needed**: 12
- **Elephants per Group**: 6 (⌊12/2⌋)
- **Total Valid Encodings**: 924 (12 choose 6)

## 🚀 Features

- **Interactive Visualization**: See how elephants are grouped for any number from 1 to 1,000,000
- **Real-time Calculation**: Uses Web Workers for efficient computation
- **Mathematical Insights**: Displays the minimum groups needed and optimal grouping strategy
- **Responsive Design**: Works on desktop and mobile devices
- **Performance Optimized**: Handles large numbers efficiently
- **Simplified Codebase**: Clean, maintainable code with modern JavaScript practices

## 🛠️ How to Use

### Quick Start
```bash
# Install dependencies (if you want to use bun for development)
bun install

# Start development server
bun run dev

# Or simply open the HTML file in your browser
open src/index.html
```

### Manual Usage
1. **Open the Application**: Load `src/index.html` in any modern web browser
2. **Set Elephant Count**: Use the input field or +/- buttons to set the number of elephants
3. **View Results**: See the optimal grouping strategy and statistics
4. **Explore Groups**: For numbers ≤ 1000, view individual elephant assignments to each group

## 📊 Understanding the Output

The application displays:

- **Total Elephants**: The number of elephants in your race
- **Minimum Groups**: The optimal number of groups needed
- **Elephants per Group**: How many elephants should be in each group (k value)
- **Valid Encodings**: Total possible unique binary encodings
- **Elephant Groups**: Visual representation of which elephants belong to which groups

## 🔬 How It Works

### 1. Finding Minimum Groups
```javascript
const getMinNumGroups = (numElephants) => {
    for (let n = 0; n <= numElephants; n++) {
        if (binomialCoefficient(n, Math.floor(n/2)) >= numElephants) return n;
    }
    throw new Error("No valid k found");
};
```

### 2. Generating Binary Encodings
```javascript
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
```

### 3. Grouping Elephants
Each elephant gets assigned to groups based on their binary encoding:
- Position 1 = Group 1, Position 2 = Group 2, etc.
- '1' means the elephant is in that group, '0' means they're not

## 📁 Project Structure

```
elephant/
├── src/
│   ├── index.html          # Main application interface
│   ├── elephant-worker.js  # Web Worker for calculations
│   └── styles.css          # Application styling
├── package.json            # Project configuration and scripts
└── README.md              # This file
```

## 🌐 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Web Workers**: Required for optimal performance with large numbers
- **Fallback**: Gracefully degrades to synchronous calculation if Web Workers unavailable

## 🧪 Example Usage

### Small Race (10 Elephants)
- **Groups Needed**: 5
- **Elephants per Group**: 2
- **Strategy**: Simple binary encoding with 5 groups

### Medium Race (100 Elephants)
- **Groups Needed**: 9
- **Elephants per Group**: 4
- **Strategy**: 9 groups with balanced distribution

### Large Race (900 Elephants)
- **Groups Needed**: 12
- **Elephants per Group**: 6
- **Strategy**: Optimal grouping using Sperner's Theorem

## 🔍 Mathematical Background

This problem demonstrates several important concepts:

1. **Combinatorial Optimization**: Finding the minimum number of groups
2. **Binary Encoding**: Efficient representation of group membership
3. **Sperner's Theorem**: Mathematical foundation for optimal grouping
4. **Information Theory**: Minimum bits needed to distinguish between options

## 🚀 Development

### Code Simplifications Made
- **Consolidated utility functions** using arrow functions and modern JavaScript
- **Eliminated duplicate code** in DOM manipulation
- **Streamlined CSS** by combining similar selectors
- **Simplified worker logic** with cleaner function definitions
- **Added package.json** for proper project management

### Running the Project
```bash
# Development mode with hot reload
bun run dev

# Or use the start script
bun run start

# Build (static HTML - no build step needed)
bun run build
```

## 📚 Further Reading

- [The Great Elephant Race Blog Post](https://adamgluck.com/posts/elephant_race)
- [Sperner's Theorem](https://en.wikipedia.org/wiki/Sperner%27s_theorem)
- [Combinatorial Mathematics](https://en.wikipedia.org/wiki/Combinatorics)

## 🤝 Contributing

Feel free to:
- Report bugs or issues
- Suggest improvements
- Add new mathematical insights
- Optimize the algorithms
- Help simplify the code further

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Elephant Racing! 🐘🏁**

*Built with vanilla JavaScript, HTML, and CSS. Optimized and simplified for maintainability.*
