export default class Util {
    /**
     * Utility function to determine if a value is between two other values
     * @param value
     * @param min
     * @param max
     * @returns {boolean}
     */
    static isBetween = (value, min, max) => {
        min = parseInt(min);
        max = parseInt(max);

        if(value > max) {
            return false
        }

        if( value < min) {
            return false
        }

        return !(value === max || value === min);

    };

    /**
     * Returns true if the value is Null or undefined false otherwise
     * @param value Object value
     * @returns {boolean}
     */
    static isNullOrUndefined = (value) => {
        return typeof value === 'undefined' || value === null || value.length === 0
    };

    /**
     * Checks for duplicates in an Array
     * @param array
     * @returns {boolean}
     */
    static hasDuplicates = (array) => {
        return (new Set(array)).size !== array.length;
    };
}