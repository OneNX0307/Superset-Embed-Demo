import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface GuestResponse {
  token: string;
}

const loginInfo = {
  "password": environment.superset.password,
  "provider": "db",
  "refresh": false,
  "username": environment.superset.username
};

const guestInfo = {
  "user": {
    "username": "admin",
    "first_name": "Superset",
    "last_name": "Admin"
  },
  "resources": [{
    "type": "dashboard",
    "id": environment.superset.dashboardId
  }],
  "rls": [
  ]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.embed();
  }

  private handle() : Observable<string>{
    return this.http.post<LoginResponse>("/api/v1/security/login", loginInfo)
      .pipe(
        switchMap(loginResponse =>
          this.http.post<GuestResponse>("/api/v1/security/guest_token", guestInfo, {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${loginResponse.access_token}`,
            })
          })
            .pipe(
              map(response => response.token)
            )
        )
      );
  }

  private embed() {
    embedDashboard({
      id: environment.superset.dashboardId, // given by the Superset embedding UI
      supersetDomain: environment.superset.baserUrl,
      mountPoint: document.getElementById("superset")!, // any html element that can contain an iframe
      fetchGuestToken: () => this.handle().toPromise() as Promise<string>,//new Promise(resolve => resolve(token)),
      dashboardUiConfig: { hideTitle: true }, // dashboard UI config: hideTitle, hideTab, hideChartControls (optional)
      debug: true
    });
  }

}
