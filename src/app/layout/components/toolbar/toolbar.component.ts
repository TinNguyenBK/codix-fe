import { CheckNullOrUndefinedOrEmpty } from 'app/core/utils/common-function';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  Inject,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AuthService } from '../../../core/service/auth.service';
import { navigation } from 'app/navigation/navigation';
import { isNullOrUndefined } from 'util';
import { environment } from 'environments/environment';
import * as jwtDecode from 'jwt-decode';
import { DOCUMENT } from '@angular/common';
import { MyProfileService } from '../../../core/service/my-profile.service';
import { MyProfile } from 'app/core/models/my-profile.model';
import { SharedService } from 'app/core/service/commom/shared.service';
import { ToolbarService } from './toolbar.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SocketService } from 'app/core/service/socket.service';
import { Event } from './../../../core/enum/event';
import { CommonDialogComponent } from 'app/main/common-dialog/common-dialog.component';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit, OnDestroy {
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];
  storageUrl = environment.storageUrl;
  userMenuImgUrl = '';
  my_advisor_id = '';
  new_photo_key = '';
  my_reference_uuid = '';

  //Ngrx-store
  numberProducts: Observable<number>;
  total_product: number = 0;
  arrCart: any;
  token: string;

  //news
  quantityNotifi: number;

  //language
  language: string;
  isShowMenu: boolean;
  isShowInvite: boolean;
  is_anomynous_account: boolean = false;
  // Private
  private _unsubscribeAll: Subject<any>;

  ioConnection: any;

  messages: any[] = [];
  entity: string = environment.entity;
  //check language
  checkLanguage = environment.checkLanguage;
  supplierProfile;
  avatarSup;
  colaboratorProfile;
  avatarCol;
  decoded;

  // notification
  PUBNUB_CHANEL = [];
  totalNotification = 0;
  notifications = [];
  sound: HTMLAudioElement;
  userId: number;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {TranslateService} _translateService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _translateService: TranslateService,
    private authService: AuthService,
    private sharedService: SharedService,
    @Inject(DOCUMENT) private document: Document,
    private myProfileService: MyProfileService,
    private toolBarService: ToolbarService,
    public dialog: MatDialog,
    private router: Router,
    private socketService: SocketService,
    private notifier: NotifierService,
    private pubnub: PubNubAngular,
  ) {
   
    // Set the defaults
    this.userStatusOptions = [
      {
        title: 'Online',
        icon: 'icon-checkbox-marked-circle',
        color: '#4CAF50',
      },
      {
        title: 'Away',
        icon: 'icon-clock',
        color: '#FFC107',
      },
      {
        title: 'Do not Disturb',
        icon: 'icon-minus-circle',
        color: '#F44336',
      },
      {
        title: 'Invisible',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#BDBDBD',
      },
      {
        title: 'Offline',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#616161',
      },
    ];

    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us',
      },
      // {
      //   id: "zh",
      //   title: "Chinese",
      //   flag: "zh",
      // },
    ];

    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
    // this.getTotalNotifications();
    // this.getNotifications();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // setup notification sound
    this.sound = new Audio();
    this.sound.src = 'assets/notification/notification-sound.mp3';
    this.sound.load();
    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    this.token = localStorage.getItem('token') || sessionStorage.getItem('token') ;
    if (!isNullOrUndefined(this.token)) {
      this.decoded = jwt_decode(this.token);
      this.isShowMenu = true;
      this.isShowInvite = true;

      //Decode token
      const decoded = jwtDecode(this.token);
      this.userId = decoded.mId;
      //change UserMenu profile photo, get new photo key
      this.toolBarService.change.subscribe((newPhotoKey) => {
        this.new_photo_key = newPhotoKey;
        localStorage.setItem('new_photo_key', this.new_photo_key);
        this.userMenuImgUrl =
          this.new_photo_key == null
            ? 'assets/icons/ICON/UserMenu.svg'
            : this.new_photo_key;
      });
      setTimeout(() => {
        // this.getNotifications();
        // this.getTotalNotifications();
        // this.listen();
      }, 1000);
    } else {
      this.language = 'en';
      this.userMenuImgUrl = 'assets/icons/ICON/UserMenu.svg';
      this.isShowMenu = false;
      this.isShowInvite = false;
      this.sharedService.nextCart(0);
      this.sharedService.sharedMessage.subscribe(
        (message) => (this.total_product = message)
      );
    }

    // this.initIoConnection();
  }

  // listen(): void {
  //   setTimeout(() => {
  //     this.PUBNUB_CHANEL = [`SUPPLIER_${this.userId}`];
  //     this.pubnub.subscribe({
  //       channels: this.PUBNUB_CHANEL,
  //       triggerEvents: ['message'],
  //     });

  //     this.pubnub.getMessage(this.PUBNUB_CHANEL, (msg) => {
  //       this.notificationSubscriptionService.setMessage(msg);
  //       this.sound.play();
  //       if (msg?.message?.pay_load?.mType === 'ORDER') {
  //         const m =
  //           msg?.message?.pn_gcm?.data?.title +
  //             ' - ' +
  //             msg?.message?.pn_gcm?.data?.summary || 'Thông báo đơn hàng';
  //         this.showNotifier(m);
  //         this.getNotifications();
  //         this.getTotalNotifications();
  //       }
  //     });
  //   }, 1000);
  // }

  showNotifier(msg: string, type = 'success'): void {
    this.notifier.show({
      type: 'success',
      message: msg,
    });
  }

  getTotalNotifications(): void {
   
  }

  getNotifications(): void {
   
  }

  markAllNotificationsAsRead(): void {
    
  }

  markNotificationAsRead(notiId): void {
    const isNotiRead = this.notifications.findIndex((noti) => {
      return Number(noti.mId) === Number(notiId) && noti.mStatus === 'READ';
    });
    if (isNotiRead !== -1) {
      return;
    }
  }

  deleteNotification(notiId): void {
  }

  deleteAllNotifications(): void {
  }

  convertTime(date): string {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }

  gotoNotiDetail(noti: any): void {
    switch (noti.mType) {
      case 'ORDER':
        this.markNotificationAsRead(noti.mId);
        this.router.navigate(['order-history/detail'], {
          queryParams: {
            id: JSON.parse(noti.mPayload).mOrderId,
            supplierId: JSON.parse(noti.mReceiverId),
          },
        });
        break;

      default:
        break;
    }
  }

  getNewsNotification(): Promise<any> {
    return new Promise((resolve) => {});
  }

  private initIoConnection(): void {
    // this.socketService.initSocket();

    this.sendMessage('trung dep trai');

    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: any) => {
        if (message == true) {
          this.getNewsNotification();
        }
      });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => {});

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {});
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    // this.socketService.send(message);
  }

  changeLanguages(id) {
    // Use a language
    // this._translateService.use('tr');
    this._translateService.setDefaultLang(id);

    const browserLang = this._translateService.getBrowserLang();
    this._translateService.use(id);

    //update language
    if (!isNullOrUndefined(this.token)) {
    }

    this.language = id;
  }

  moveToNewSList() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/news']));
  }

  moveToContactUs() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/contact-us']));
  }

  moveToRefundPolicy() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/refund-policy']));
  }

  moveToPrivacyPolicy() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/privacy-policy']));
  }

  moveToShippingPolicy() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/shipping-policy']));
  }

  moveToTermsAndCondition() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/term-and-condition-policy']));
  }

  moveToEventPrivacyPolicy() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/event-term-condition']));
  }

  moveToPurchasePrivacyPolicy() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/purchase-term-condition']));
  }

  moveNAEPTermsConditions() {
    if (this.entity === 'SG') {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/naep-terms-conditions-sg']));
    } else if ((this.entity = 'MY')) {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/naep-terms-conditions-my']));
    }
  }

  goToShoppingBag() {
    this.token = localStorage.getItem('token');
    if (isNullOrUndefined(this.token)) {
      const dialogRefLogin = this.dialog.open(FuseConfirmDialogComponent, {
        width: '550px',
        data: {
          message: 'Please register or login to continue.',
        },
      });
      dialogRefLogin.afterClosed().subscribe((data) => {
        if (data === true) {
          this.router.navigate(['/login'], {
            queryParams: { redirect: '/check-out-improve' },
          });
        }
      });
    } else {
      this.router.navigate(['/check-out-improve']);
    }
  }

  invite() {
    const port = this.document.location.port
      ? `:${this.document.location.port}`
      : '';
    const registerURL = `${this.document.location.protocol}//${this.document.location.hostname}${port}/register?contact_uuid=${this.my_reference_uuid}&language=${this.language}`;

    const isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      },
    };
    // const messageText = `I%20would%20like%20to%20invite%20you%20to%20join%20me%20at%20`;
    const messageText = `Welcome%20to%20Club%20Thermomix®.%20Sign%20up%20to%20discover%20more%20about%20Thermomix®%20at%20`;

    if (isMobile.any()) {
      const shareUrl = `whatsapp://send?text=${messageText}${registerURL}`;
      location.href = shareUrl;
    } else {
      window.open(
        `https://web.whatsapp.com/send?l=en&text=${messageText}${encodeURIComponent(
          registerURL
        )}`,
        '_blank'
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], {
      queryParams: { language: this.language },
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  /**
   * Search
   *
   * @param value
   */
  search(value): void {
    // Do your search here...
  }

  /**
   * Set the language
   *
   * @param lang
   */
  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this._translateService.use(lang.id);
  }
}
