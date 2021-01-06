const categoriesUrl = 'https://spreadsheets.google.com/feeds/cells/1YAatDTdDVnsRAClCp3Iho3ERTjmX3FOgAPET4qXayfQ/1/public/full?alt=json';
const goodsUrl = 'https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/3/public/full?alt=json';
const botToken = '1506916734:AAEECIE4k2OTSjtUs3vEZMc6_Hpk6x1UUus';
const chatId = '-444730083';
const updatesUrl = 'https://api.telegram.org/bot1506916734:AAEECIE4k2OTSjtUs3vEZMc6_Hpk6x1UUus/getUpdates';

const getData = (url, type) => fetch(url).then((r) => {
  if (r.ok) {
    return r[type]();
  }
  throw new Error(`Error ${r.status}`);
}).catch((e) => console.error(e));

const retrieveData = (data) => (data?.feed?.entry) ?? []; 

const propsCount = 9;

export default class StoreModel {
  constructor() {
    this.customerData = {};
  }

  getCustomerData() {
    return this.customerData;
  }

  setCustomerData(data) {
    this.customerData = data;
  }

  async loadCategories() {
    const shift = 11;
    const response = await getData(categoriesUrl, 'json');
    const data = retrieveData(response);
    const categories = data.slice(shift).reduce((acc, { content }) => {
      if (/\D+/.test(content.$t)) {
        return [...acc, content.$t];
      }
      return acc;
    }, []);
    return categories;
  }
  
  async loadGoods() {
    const response = await getData(goodsUrl, 'json');
    const data = retrieveData(response);
    const goodProps = data.slice(0, propsCount).map(({ content }) => content.$t.toLowerCase());
    const goods = data.slice(propsCount).map(({ content }) => content.$t)
      .map((value, index) => {
        const key = goodProps[index % propsCount];
        return [key, value];
      })
      .reduce((acc, elem, i, arr) => {
        if ((i % propsCount) === 0) {
          const goodData = arr.slice(i, i + propsCount);
          const good = Object.fromEntries(goodData);
          return [...acc, good];
        }
        return acc;
      }, []);
    return goods;
  }

  async sendMessageToOwner(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=MarkdownV2&text=hello, Telegram`;
    await getData(url, 'text');
  }
}