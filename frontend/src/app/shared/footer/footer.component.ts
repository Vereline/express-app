import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebook; 
  faGoogle = faGoogle;  
  faTwitter = faTwitter;
  faLinkedin = faLinkedin; 

  constructor() { }

  ngOnInit(): void {
  }

}
