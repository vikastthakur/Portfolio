import { madhuParmar } from './madhu-parmar';
import { vikasKumar } from './vikas-kumar';
import { abhishekSingh } from './abhishek-singh';
import { yourName } from './your-name-template';

export const portfolios = [madhuParmar, vikasKumar, abhishekSingh, yourName];

export function getPortfolioBySlug(slug) {
  return portfolios.find((portfolio) => portfolio.slug === slug) || portfolios[0];
}