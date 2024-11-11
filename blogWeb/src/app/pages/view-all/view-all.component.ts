import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common'; 

import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css'
})
export class ViewAllComponent implements OnInit {
  allPosts:any[] = [];
  [x: string]: any;

  constructor(private postService: PostService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.getAllPosts();
  }


  getAllPosts(){
    this.postService.getAllPosts().subscribe(res =>{
      console.log(res);
      this.allPosts = res;
    }, error=>{
      this.snackBar.open("Something Went Wrong!!!!", "OK")
    })
  }

}
