export function slugify(text: string): string {
    return text
        .toString()
        .normalize('NFD') // remove acentos
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')       // espaços viram "-"
        .replace(/[^\w\-]+/g, '')   // remove caracteres especiais
        .replace(/\-\-+/g, '-');    // remove múltiplos "-"
}