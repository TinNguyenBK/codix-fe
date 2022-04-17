import { FuseNavigation } from '@fuse/types';
import { environment } from 'environments/environment';

let entity = environment.entity;

export const navigation: FuseNavigation[] = [
  // {
  //   id: 'my_profile',
  //   title: 'My Order',
  //   translate: 'My profile',
  //   type: 'item',
  //   svgIcon: 'customers',
  //   url: '/my-profile',
  // },
  {
    id: 'employee_management',
    title: 'Employee Management',
    translate: 'Employee management',
    type: 'item',
    svgIcon: 'customers',
    url: '/employee-management',
  },
];
