export type Article = {
    id: string;
    title: string;
    authors: string[];
    journal: string;
    year: number;
    abstract?: string;
    doi?: string;
    pages?: string;
};