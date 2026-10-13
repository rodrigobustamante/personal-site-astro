// schema.org nodes for the JSON-LD @graph in PortfolioLayout. Every node links
// back to the Person by @id instead of repeating it.
export const PERSON_ID = 'https://rodrigobustamante.cl/#person';

const author = { '@id': PERSON_ID };

/** Breadcrumb trail; each item is [name, absolute URL]. */
export const breadcrumbs = (items: Array<[string, string]>) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});

export const blogPosting = (post: {
  url: string;
  title: string;
  description?: string;
  image: string;
  lang: string;
  publishDate: Date;
  updateDate?: Date;
}) => ({
  '@type': 'BlogPosting',
  '@id': `${post.url}#article`,
  mainEntityOfPage: post.url,
  headline: post.title,
  description: post.description,
  image: post.image,
  inLanguage: post.lang,
  datePublished: post.publishDate.toISOString(),
  dateModified: (post.updateDate ?? post.publishDate).toISOString(),
  author,
  publisher: author,
});

export const caseStudy = (work: { url: string; title: string; description: string; image: string; lang: string }) => ({
  '@type': 'CreativeWork',
  '@id': `${work.url}#work`,
  mainEntityOfPage: work.url,
  name: work.title,
  description: work.description,
  image: work.image,
  inLanguage: work.lang,
  author,
  creator: author,
});
