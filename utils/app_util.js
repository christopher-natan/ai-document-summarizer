import path from "path";

/**
 * ALl app utility functions should reside here
 */
export class AppUtil {
    static toKey(text) {
        return text.toLowerCase().trim().split(' ').join('-');
    }
    static getFileExtension(file) {
        return path.extname(file).substring(1);
    }

    static getObjectFirstValue(objects) {
        const values = Object.values(objects);
        return values[0];
    }
}
