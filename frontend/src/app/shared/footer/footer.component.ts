import { Component, OnInit } from '@angular/core';
import { faTeeth, faGamepad, faFeather, faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faTeeth = faTeeth; 
  faGamepad = faGamepad;  
  faFeather = faFeather;
  faLink = faLink; 

  constructor() { }

  ngOnInit(): void {
  }

}
