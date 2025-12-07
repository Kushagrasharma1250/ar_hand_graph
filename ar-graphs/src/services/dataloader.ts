// src/services/dataLoader.ts
export async function parseCSV(file: File): Promise<number[]> {
  const text = await file.text();
  return text
    .trim()
    .split('\n')
    .map((line) => Number(line.split(',').pop() || 0));
}