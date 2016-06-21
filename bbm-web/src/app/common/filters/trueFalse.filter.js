export default function() {
    return function(text) {
        if (text) {
            return 'Yes';
        }
        return 'No';
    }
}