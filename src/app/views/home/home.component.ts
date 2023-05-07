import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HomeMediaRowComponent} from "./home-media-row/home-media-row.component";

export type HomeMediaItem = {
  id: string;
  thumbnail?: string;
  title: string;
  subtitle?: string;
  episodeNumber?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    HomeMediaRowComponent
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  continueWatching: HomeMediaItem[] = [
    {id: 'one', title: 'Kimetsu no Yaiba', subtitle: 'Yoriichi Type Zero', episodeNumber: 'S4 • E3'},
    {id: 'one1', title: 'Kimetsu no Yaiba 2', subtitle: 'Yoriichi Type Zero', episodeNumber: 'S4 • E3'},
    {id: 'one2', title: 'Kimetsu no Yaiba 3', subtitle: 'Yoriichi Type Zero', episodeNumber: 'S4 • E3'},
    {id: 'one3', title: 'Kimetsu no Yaiba 4', subtitle: 'Yoriichi Type Zero', episodeNumber: 'S4 • E3'},
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

}
