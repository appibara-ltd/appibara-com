export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ManualRedaction extends BoundingBox {
    id: string;
}

export interface AiSuggestion extends BoundingBox {
    id: string;
    text: string;
    type: string;
    confidence: number;
}