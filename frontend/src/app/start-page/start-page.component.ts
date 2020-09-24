import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {


  public slides = [
    { title: 'THE BEST CHOICE IS HERE', subtitle: 'Welcome to Sophia, an oasis for all healthy food and organic produce sites, ready to make your online presentation shine.', image: 'https://via.placeholder.com/1920x1080' },
    { title: 'Biggest discount', subtitle: 'Welcome to Mildhill, an oasis for all healthy food and organic produce sites, ready to make your online presentation shine.', image: 'https://via.placeholder.com/1920x1080' },
    { title: 'Biggest sale', subtitle: 'Welcome to Mildhill, an oasis for all healthy food and organic produce sites, ready to make your online presentation shine.', image: 'https://via.placeholder.com/1920x1080' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
