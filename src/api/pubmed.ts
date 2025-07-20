import { Article } from '../types/pubmed'

// Utility: convert raw XML string into DOM Document
const parseXML = (xml: string): Document => new DOMParser().parseFromString(xml, 'text/xml')

// Utility: extracted text from XML element
const getText = (parent: Element, tag: string): string =>
  parent.getElementsByTagName(tag)?.[0]?.textContent || ''

export const searchPubMed = async (
  filters: { title: string; author: string; journal: string},
  retmax = 10,
  retstart = 0
): Promise<Article[]> => {
  const baseSearchURL = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`
  const baseFetchURL = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi`

  // Build search query string
  const queryTerms: string[] = ['artificial intelligence[Title/Abstract]', 'healthcare[Title/Abstract]']
  if (filters.title) queryTerms.push(`${filters.title}[Title]`)
  if (filters.author) queryTerms.push(`${filters.author}[Author]`)
  if (filters.journal) queryTerms.push(`${filters.journal}[Journal]`)
  const query = queryTerms.join(' AND ')

  // Step 1: ESearch - to get PMIDs
  const searchURL = `${baseSearchURL}?db=pubmed&term=${encodeURIComponent(query)}&retmax=${retmax}&retstart=${retstart}&retmode=json`
  const searchRes = await fetch(searchURL)
  const searchJson = await searchRes.json()
  const pmids = searchJson.esearchresult?.idlist

  if (!pmids || pmids.length === 0) return []

  // Step 2: EFetch - to fetch article metadata by PMIDs
  const fetchURL = `${baseFetchURL}?db=pubmed&id=${pmids.join(',')}&retmode=xml`
  const fetchRes = await fetch(fetchURL)
  const xml = await fetchRes.text()
  const doc = parseXML(xml)

// Step 3: Parse XML to extract article details
  const articles: Article[] = Array.from(doc.getElementsByTagName('PubmedArticle')).map((entry) => {
    const article = entry.getElementsByTagName('Article')[0]
    const journal = article?.getElementsByTagName('Journal')[0]

    return {
      id: getText(entry, 'PMID'),
      title: getText(article, 'ArticleTitle'),
      authors: Array.from(article.getElementsByTagName('Author')).map((a) => {
        const last = getText(a, 'LastName')
        const first = getText(a, 'ForeName')
        return `${first} ${last}`
      }),
      journal: getText(journal, 'Title'),
      year: parseInt(getText(journal, 'Year') || getText(journal, 'PubDate')) || 0,
      doi: getText(article, 'ELocationID'),
      pages: getText(article, 'MedlinePgn'),
      abstract: getText(article.getElementsByTagName('Abstract')[0], 'AbstractText')
    }
  })

  return articles
}
