import * as crypto from 'crypto';

export class Utils {
  public static md5(content) {
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
  }
}
