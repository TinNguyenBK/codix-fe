import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { filter } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from 'app/core/service/auth.service';
import { environment } from 'environments/environment';
import { CheckNullOrUndefinedOrEmpty } from '../../../app/core/utils/common-function';

@Component({
  selector: 'fuse-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuseNavigationComponent implements OnInit {
  @Input()
  layout = 'vertical';

  @Input()
  navigation: any;

  navigations = [];

  is_anomynous_account: boolean = false;

  decoded: any;
  // Private
  private _unsubscribeAll: Subject<any>;

  checkRecruitment: boolean = true;
  entity = environment.entity;

  /**
   *
   * @param {ChangeDetectorRef} _changeDetectorRef
   * @param {FuseNavigationService} _fuseNavigationService
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseNavigationService: FuseNavigationService,
    private _authService: AuthService
  ) {
    // Set the private defaults
    let token = localStorage.getItem('token');
    this._unsubscribeAll = new Subject();
    let url: string;
    let tokenParam: any;
    let decrypt: any;
    let isRegistered;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (!isNullOrUndefined(token)) {
      this.decoded = jwt_decode(token);
    }
    // Load the navigation either from the input or from the service
    this.navigation =
      this.navigation || this._fuseNavigationService.getCurrentNavigation();

    // Subscribe to the current navigation changes
    this._fuseNavigationService.onNavigationChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
        this.checkEnableByRole();
      });

    // Subscribe to navigation item
    merge(
      this._fuseNavigationService.onNavigationItemAdded,
      this._fuseNavigationService.onNavigationItemUpdated,
      this._fuseNavigationService.onNavigationItemRemoved
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  checkEnableByRole() {
    // await this.naepService.checkRecruitment().subscribe( data => {
    let arrRemove = [];
    let isShow: boolean = true;
    let token = localStorage.getItem('token');
    if (!isNullOrUndefined(token)) {
      this.checkMenu();
      // this.naepService.checkRecruitment().subscribe( data => {
      //         this.checkRecruitment = data
      //         this.checkMenu()
      // })
    } else {
      this.checkRecruitment = false;
      this.checkMenu();
    }

    // })
  }

  checkMenu() {
    let arrRemove = [];
    let isShow: boolean = true;
    this.navigation.forEach((item) => {
      isShow = true;
      if (!isNullOrUndefined(this.decoded?.mRole)) {
        if (this.decoded.mRole.indexOf('COLLABORATOR') !== -1) {
          if (
            item.id === 'store' ||
            item.id === 'contact_list' ||
            item.id === 'order_history_collaborator' ||
            item.id === 'commonly_product' ||
            item.id === 'hot_product' ||
            item.id === 'reports' ||
            item.id === 'wallet'
          ) {
            isShow = true;
          } else {
            isShow = false;
          }
        } else if (this.decoded.mRole.indexOf('SUPPLIER') !== -1) {
          if (
            item.id === 'order_history_supplier' ||
            item.id === 'product_library' ||
            item.id === 'private_info_product' ||
            item.id === 'ware_house_supplier' ||
            item.id === 'debit_management' ||
            item.id === 'depts'
          ) {
            isShow = true;
          } else {
            isShow = false;
          }
        }
        if (!isShow) {
          arrRemove.push(item.id);
        }
      } else {
        return;
      }
    });

    let listTerm;
    let arr;
    if (this.entity === 'SG') {
      arr = this.navigation.filter(function (item) {
        if (item.id === 'terms_and_conditions') {
          listTerm = item.children.filter(
            (e) => arrRemove.indexOf(e.id) === -1
          );
          item.children = [] = listTerm;
        }
        return arrRemove.indexOf(item.id) === -1;
      });

      if (environment.production === true) {
        // remove host gift
        arr = arr.filter((item) => {
          if (item.id === 'advisor') {
            let temp;
            temp = item.children.filter((e) => e.id !== 'host_gift');
            item.children = temp;
          }
          return arrRemove.indexOf(item.id) === -1;
        });
      }
    } else {
      arr = this.navigation.filter(function (item) {
        return arrRemove.indexOf(item.id) === -1;
      });
    }

    this.navigations = arr;
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
}
