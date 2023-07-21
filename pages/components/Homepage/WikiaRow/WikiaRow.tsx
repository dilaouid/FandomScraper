import WikiaCard from "../WikiaCard/WikiaCard";

export const WikiaRow = () => {
    return(['naruto'].map((wikia: string) => {
        return (
            <WikiaCard wikia={wikia} />
        );
    }));
};