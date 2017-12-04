import { VideosService } from './../videos.service';
import { Video } from './../video';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  providers: [VideosService]
})
export class VideosComponent implements OnInit {
  videos: Observable<Video[]>;
  constructor(private videosService: VideosService) { }

  ngOnInit() {
    this.videos = this.videosService.getAll();
    console.log(this.videos);
  }

}
