export interface ReviewDTO {
    contents: string;
    score: number;
    reviewDate: String;
    isBest: boolean;
    name: string;
    productName: string;
    optionName: string;
    imageUrls: string[];
    responses: ReviewResponseDTO[];
}

export interface ReviewResponseDTO {
    name: string;
    responseText: string;
    responseDate: String;
}