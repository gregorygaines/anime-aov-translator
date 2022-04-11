import { Storage } from '../background/storage';
import { config } from '../config';
import { Log } from '../Logger';

const storage = new Storage();

const BLACK_LISTED_DOMAINS_KEY = "black_listed_domains";

const isDomainAllowListed = async (domain: string) => {
  // @ts-ignore
  const blockListedDomains: string[] | null = await getBlockListedDomains();

  if (blockListedDomains) {
    if (blockListedDomains.includes(domain)) {
      Log.info("Domain blacklisted: ", domain);
      return false;
    }
  }

  return Object.values(config.whiteListedDomains).includes(domain);
}

const getBlockListedDomains = async (): Promise<boolean | object | null | string[]> => {
  return await storage.getItem(BLACK_LISTED_DOMAINS_KEY);
}

export { isDomainAllowListed };