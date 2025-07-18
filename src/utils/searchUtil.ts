import Fuse from 'fuse.js';

export const searchProductsUsingFuse = (
    query: string,
    productsJson
) => {
    const excludeWords = [
        'the',
        'a',
        'an',
        'in',
        'on',
        'at',
        'with',
        'from',
        'by',
        'for',
        'of',
        'to',
        'and',
        'or',
        'but',
        'so',
        'yet',
        'brand',
        'product',
        'item',
        'model',
        'type',
        'series',
        'version',
        'new',
        'old',
        'best',
        'good',
        'popular',
        'cheap',
    ];

    const updatedData = productsJson?.map((item) => ({
        ...item,
        searchableText: [
            item.title,
            item.description,
            item.category,
            item.warrantyInformation,
            item.shippingInformation,
            item.availabilityStatus,


            // item.name,
            // item.brand,
            // item.category,
            // ...item.tags.map((t) => t.tag_name?.split(',')).flat(),
        ]
            .join(' ')
            .toLowerCase()
            .replace(/[^a-z0-9 ]/gi, ''), // removes special characters
    }));

    const fuse = new Fuse(updatedData, {
        keys: ['searchableText'],
        threshold: 0.4,
        ignoreLocation: true,
        includeScore: true,
        ignoreDiacritics: true,
        includeMatches: true,
        shouldSort: true,
        useExtendedSearch: true,
        matchAllTokens: true,
    });
    const processedQuery = query
        .toLowerCase()
        .replace(/[^a-z0-9 ]/gi, '')
        .split(' ')
        .filter((word) => word && !excludeWords.includes(word));

    const cleanedQuery = processedQuery.join(' ');

    const results = fuse.search(cleanedQuery);

    const searchResult = results.map((r) => r.item)

    return searchResult
}

