export default function capitalizeFirstLetter(inputString) {
    // Check if the string is not empty
    if (inputString.length > 0) {
        // Capitalize the first letter and concatenate the rest of the string
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    } else {
        // Return an empty string if the input is empty
        return inputString;
    }
}