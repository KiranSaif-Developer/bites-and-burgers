// Function to format price to currency
export function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}

// Function to truncate long text (if your burger descriptions get too long)
export function truncateText(text, limit) {
    if (text.length > limit) {
        return text.substring(0, limit) + "...";
    }
    return text;
}