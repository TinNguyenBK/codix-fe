import { FuseNavigation } from '@fuse/types';
import { environment } from 'environments/environment';

let entity = environment.entity;

export const navigation: FuseNavigation[] = [
  {
    id: 'order_history_supplier',
    title: 'My Order',
    translate: 'My profile',
    type: 'item',
    svgIcon: 'customers',
    url: '/my-profile',
  },
];
