/**
 * lazy load the static array data using language
 * @returns {Promise<T>}
 */
import { getLocale } from '../util/tools'

export const loadArray = () => {
  const locale = getLocale().replace('_', '-')
  console.log('locale',locale);
  return import(`./array/${locale}.js`)
    .then((array) => {
      return array
    })
}
