function funcHasStraight(diceValues, length) {
    return diceValues.sort((a, b) => a - b).reduce((acc, curr, index, arr) => {
        if (index <= arr.length - length) {
            const isStraight = arr.slice(index, index + length - 1).every((value, i) => value + 1 === arr[index + i + 1]);
            return acc || isStraight;
        }
        return acc;
    }, false);
}

/**
 * 
 * @param {number[]} diceValues 
 */
function getConsecutiveLength(diceValues) {
    let consecutive = 1;
    diceValues
        .sort((a,b)=>a-b)
        .reduce((prev, curr) => {
            if (prev + 1 === curr) {
                consecutive += 1;
            }
            return curr;
        })
    return consecutive;
}

// Example usage:
const diceValues = [2, 3, 5, 4, 6, 7]; // Example array of dice values
// const straightLength = 4; // Specify the length of the straight
// const hasStraight = funcHasStraight(diceValues, straightLength);
// console.log(hasStraight); // Output will be true or false

const numConsecutive = getConsecutiveLength(diceValues)
console.log(numConsecutive); // Output will be true or false
