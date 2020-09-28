import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UserService } from '../services/user/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public isLogin: Boolean;

  subscription: Subscription;

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService : UserService, 
    public translate: TranslateService) {}

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked);
  }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');

    this.subscription = this.userService.isLoginUser$
    .subscribe(isLoggedIn => this.isLogin = isLoggedIn);
  }

  logout() {
    this.userService.logoutUser();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
