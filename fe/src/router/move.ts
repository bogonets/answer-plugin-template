import type {Dictionary} from 'vue-router/types/router';
import type {RawLocation} from 'vue-router';
import router, {routeNames} from '@/router/index';
import _ from 'lodash';

export type ParamsType = Dictionary<string>;
export type QueryType = Dictionary<string | (string | null)[] | null | undefined>;

export function moveToBack() {
  router.back();
}

export function moveTo(name: string, params?: ParamsType, query?: QueryType) {
  if (router.currentRoute.name === name) {
    const paramsEqual = _.isEqual(params, router.currentRoute.params);
    const queryEqual = _.isEqual(query, router.currentRoute.query);
    if (paramsEqual && queryEqual) {
      return;
    }
  }

  const rawLocation = {
    name: name,
    params: params,
    query: query,
  } as RawLocation;

  router.push(rawLocation).catch(reason => {
    if (reason.name !== 'NavigationDuplicated') {
      throw reason;
    }
  });
}

export function moveToMainHome() {
  moveTo(routeNames.mainHome);
}

export function moveToMainAbout() {
  moveTo(routeNames.mainAbout);
}

// TODO: More Routing APIs
