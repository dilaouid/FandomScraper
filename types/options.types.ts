export interface IGetCharactersOptions {
    /**
     * The limit of characters to get (optional). Default: 100000
     */
    limit: number;

    /**
     * The offset of characters to get (optional). Default: 0
     */
    offset: number;

    /**
     * If the scraper should get all the characters recursively (optional). Default: false
     */
    recursive?: boolean;

    /**
     * If the scraper should get the images in base64 (optional). Default: false
     */
    base64?: boolean;

    /**
     * If the scraper should get the id of the character (optional). The id is the pageId of the wikia. Default: false
     */
    withId?: boolean;

    /**
     * The substrings to ignore in the characters names (optional). Default: []
     */
    ignore?: string[];

    /**
     * The substrings to ignore in the characters names (optional). Default: []
     */
    attributes?: string[];
}

export interface IGetCharacterOptions {
    /**
     * The name of the character you want to get.
     */
    name?: string;

    /**
     * If the scraper should get the images in base64 (optional). Default: false
     */
    base64?: boolean;

    /**
     * If the scraper should get the id of the character (optional). The id is the pageId of the wikia. Default: true
     */
    withId?: boolean;

    /**
     * The attributes to get in the character (optional). Default are the attributes of the schema.
     */
    attributes?: string[];
}

