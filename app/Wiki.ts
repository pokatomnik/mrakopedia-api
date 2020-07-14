import Wiki from 'wikijs';
import { MRAKOPEDIA_API_ENDPOINT } from './constants';

export const wiki = Wiki({ apiUrl: MRAKOPEDIA_API_ENDPOINT });
