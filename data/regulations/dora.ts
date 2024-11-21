export interface DoraArticle {
  id: string;
  article: string;
  subArticle: string;
  text: string;
}

export const doraArticles: DoraArticle[] = [
  {
    id: '4.1',
    article: 'Article 4',
    subArticle: '4.1',
    text: 'Establish an ICT risk management framework to cover risk identification, protection, detection, recovery, and response.'
  },
  {
    id: '5.1',
    article: 'Article 5',
    subArticle: '5.1',
    text: 'Establish internal governance to manage ICT risks.'
  },
  {
    id: '5.4',
    article: 'Article 5',
    subArticle: '5.4',
    text: 'Allocate budget for ICT security awareness programs and training.'
  },
  {
    id: '7.1',
    article: 'Article 7',
    subArticle: '7.1',
    text: 'Use reliable and resilient ICT systems that can handle stress and peak demand.'
  },
  {
    id: '7.2',
    article: 'Article 7',
    subArticle: '7.2',
    text: 'Ensure systems are technologically resilient under adverse conditions.'
  }
];