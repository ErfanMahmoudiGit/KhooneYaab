export function truncateText(text, maxLength = 23) {
    if (text.length <= maxLength) return text;

    // Find the index of the last space within the maxLength limit
    const indexOfLastSpace = text.lastIndexOf(' ', maxLength);

    // If no space is found within the limit, just truncate at the maxLength
    const truncateIndex = indexOfLastSpace === -1 ? maxLength : indexOfLastSpace;

    return `${text.slice(0, truncateIndex)}...`;
}
