import { expect } from "chai";

export function assertValidMetadata(
    metadata: any,
    expected: { wiki: string; lang: string; schemaUrl: string }
): void {
    expect(metadata).to.be.an("object");
    expect(metadata.name).to.equal(expected.wiki);
    expect(metadata.language).to.equal(expected.lang);
    expect(metadata.url).to.equal(expected.schemaUrl);
    expect(metadata.attributes).to.be.an("array");
    expect(metadata.attributes.length).to.be.greaterThan(0);
    expect(metadata.attributes.every((attribute: string) => typeof attribute === "string" && attribute.length > 0)).to.equal(true);
    expect(metadata.availableLanguages).to.be.an("array");
    expect(metadata.availableLanguages).to.include(expected.lang);
}

export function assertValidCharacterList(
    characters: any[],
    expected: { schemaUrl: string; minItems: number; minParsedFields: number }
): void {
    const origin = new URL(expected.schemaUrl).origin;

    expect(characters).to.be.an("array");
    expect(characters.length).to.be.greaterThanOrEqual(expected.minItems);

    for (const character of characters) {
        expect(character).to.be.an("object");
        expect(character.name).to.be.a("string");
        expect(character.name.trim().length).to.be.greaterThan(0);
        expect(character.url).to.be.a("string");
        expect(character.url.startsWith(origin)).to.equal(true);
        expect(character.id).to.be.a("number");
        expect(character.id).to.be.greaterThan(0);
        expect(character.data).to.be.an("object");
        expect(Object.keys(character.data).length).to.be.greaterThanOrEqual(expected.minParsedFields);
    }
}
