import { BookSearchResult } from "../types";

export async function searchBooks(query: string): Promise<BookSearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Falha na resposta da Open Library");
    }

    const data = await response.json();
    if (!data.docs || !Array.isArray(data.docs)) {
      return [];
    }

    // Map and limit to 5 results
    const results: BookSearchResult[] = data.docs
      .slice(0, 5)
      .map((doc: any) => {
        const title = doc.title || "Título Desconhecido";
        const author = doc.author_name ? doc.author_name[0] : "Autor Desconhecido";
        const openLibraryKey = doc.key;
        let coverUrl: string | undefined = undefined;

        if (doc.cover_i) {
          coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
        }

        return {
          title,
          author,
          coverUrl,
          openLibraryKey,
        };
      });

    return results;
  } catch (error) {
    console.error("Erro ao buscar livros na Open Library:", error);
    // Return empty array on error, the UI will fall back gracefully to manual entry.
    return [];
  }
}
