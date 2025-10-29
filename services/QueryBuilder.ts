import type { IGetCharactersOptions } from '../types/options.types';

/**
 * Service responsible for building and managing query options
 */
export class QueryBuilder {
    private options: IGetCharactersOptions = {
        base64: false,
        recursive: false,
        withId: true,
        limit: 50,
        offset: 0,
        ignore: [
            'Minor Characters',
            'Unnamed Characters',
            "Citoyen d'Honneur de Mahr",
            'Allies',
            'Attack on Titan Character Encyclopedia FINAL/Civilians',
            'Attack on Titan Character Encyclopedia FINAL/Garrison',
            'Attack on Titan Character Encyclopedia FINAL/Marleyan military'
        ],
        attributes: []
    };

    private keysAttrToArray: string[] = [];

    /**
     * Reset options to default values
     */
    reset(): void {
        this.options = {
            base64: false,
            recursive: false,
            withId: true,
            limit: 50,
            offset: 0,
            ignore: [],
            attributes: []
        };
        this.keysAttrToArray = [];
    }

    /**
     * Set the limit of characters to get
     * @param limit - The limit value
     */
    setLimit(limit: number): void {
        if (limit < 1) {
            throw new Error('Limit must be greater than 0');
        }
        this.options.limit = limit;
    }

    /**
     * Set the offset of characters to get
     * @param offset - The offset value
     */
    setOffset(offset: number): void {
        if (offset < 0) {
            throw new Error('Offset must be greater than 0');
        }
        this.options.offset = offset;
    }

    /**
     * Set the ignored substrings in the characters names
     * @param ignore - The substrings to ignore
     */
    setIgnore(ignore: string[]): void {
        if (!Array.isArray(ignore)) {
            throw new Error('Ignore parameter must be an array');
        }
        this.options.ignore = ignore;
    }

    /**
     * Set the attributes to get in the characters
     * @param attributes - The attributes string (space-separated)
     */
    setAttributes(attributes: string): void {
        if (typeof attributes !== 'string') {
            throw new Error('Attributes parameter must be a string');
        }
        // remove double spaces
        attributes = attributes.replace(/\s\s+/g, ' ')?.trim();
        // split the string into an array
        this.options.attributes = attributes.split(' ');
    }

    /**
     * Set the keys of the attributes that should be converted to an array
     * @param attributes - The attributes string (space-separated)
     */
    setAttrToArray(attributes: string): void {
        if (typeof attributes !== 'string') {
            throw new Error('Attributes to array parameter must be a string');
        }
        attributes = attributes.replace(/\s\s+/g, ' ')?.trim();
        this.keysAttrToArray = attributes.split(' ');
    }

    /**
     * Set base64 option
     * @param base64 - Whether to get images in base64
     */
    setBase64(base64: boolean): void {
        this.options.base64 = base64;
    }

    /**
     * Set recursive option
     * @param recursive - Whether to get all characters recursively
     */
    setRecursive(recursive: boolean): void {
        this.options.recursive = recursive;
    }

    /**
     * Set withId option
     * @param withId - Whether to get the id of the character
     */
    setWithId(withId: boolean): void {
        this.options.withId = withId;
    }

    /**
     * Get the current options
     * @returns The current query options
     */
    getOptions(): IGetCharactersOptions {
        return this.options;
    }

    /**
     * Get the keys that should be converted to arrays
     * @returns The keys to convert to arrays
     */
    getKeysAttrToArray(): string[] {
        return this.keysAttrToArray;
    }
}

