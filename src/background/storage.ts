import CryptoJS from 'crypto-js';
import localforage from 'localforage';
import { Log } from '../Logger';

class Storage {
  readonly DB_NAME = 'AnimeOAV';
  readonly PRIVATE_KEY_KEY = 'private_key';
  readonly ENTROPY = 'jioMNCIONHF*(IOU#":K<;dofjspaifnildahf"{}Df32';
  db;

  // Generate private key if it doesn't exist
  constructor() {
    this.db = localforage.createInstance({
      name: this.DB_NAME,
    });

    // Check for private key
    this.getItem(this.PRIVATE_KEY_KEY).then((item) => {
      if (item) {
        return;
      }

      Log.info("Generating private key");

      const privateKey = this._generateSecretKey();

      this.storeItem(this.PRIVATE_KEY_KEY, privateKey).then((result) => {

        },
      ).catch((err) => {
        Log.error("Can't create private key: " + err)
      });
    });
  }

  _generateSecretKey = () => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key512Bits = CryptoJS.PBKDF2(this.ENTROPY, salt, { keySize: 512 / 32, iterations: 1000 });
    return key512Bits.toString(CryptoJS.enc.Base64);
  };

  getItem = async (key: string, secret?: boolean): Promise<boolean | null | object> => {
    return await this.db.getItem(key);
  };

  storeItem = async (key: string, value: string, secret?: boolean): Promise<Object> => {
    return await this.db.setItem(key, value);
  };
}

export { Storage };