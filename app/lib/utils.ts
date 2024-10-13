

export const fetcher = async([url,key]: [url:string,key:string]) => await fetch(url).then(res => res.json())