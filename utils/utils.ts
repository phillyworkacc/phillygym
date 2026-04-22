export function ellipsisText (str: string, limit: number) {
   return str.length > limit ? `${str.substring(0,limit)}...` : str;
}