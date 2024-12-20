import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('links') linksElement!: ElementRef;
  isEnabled: boolean = false;
  changeView(){
    this.isEnabled = !this.isEnabled;
  }

  constructor(private location: Location){
    console.log(this.location.path())
  }

  ngAfterViewInit(){
    const allLinks = this.linksElement.nativeElement.childNodes;
    const currentUrl = this.location.path().replace("/", "");
    allLinks.forEach((element:any) => {
      if(element.id === currentUrl) element.classList.add("current-url")
    });
  }
}
