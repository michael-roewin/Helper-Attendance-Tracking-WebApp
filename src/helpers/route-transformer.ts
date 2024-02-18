export function routeTransformer(path: string, routeParams: {[index: string]: string}): string {

  let url = path;

  if (typeof routeParams === 'object') {
    for (const routeParam in routeParams) {
      if (routeParams[routeParam]) {
        url = url.replace(`:${routeParam}`, routeParams[routeParam]);
      }
    }
  }

  return url;
}