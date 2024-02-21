import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) { }
  goToCreatePostPage() {
    this.router.navigate(['/postfeed/createpost'])


  }
  goToProfile(){
    this.router.navigateByUrl('/profile');
  }
  goToHomePage(){
    this.router.navigateByUrl('/postfeed');
  }
}
