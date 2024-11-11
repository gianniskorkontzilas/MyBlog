import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../service/comment.service';


@Component({
  selector: 'app-viewpost',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './viewpost.component.html',
  styleUrl: './viewpost.component.css'
})
export class ViewpostComponent {

  postId = this.activatedRout.snapshot.params['id'];
  postData:any;
  comments:any;

  commentForm!: FormGroup;

  constructor(private postService: PostService,
    private activatedRout: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService
   ){}

    ngOnInit() {
      console.log(this.postId);
      this.getPostByid();

      this.commentForm = this.fb.group({
        postedBy: [null, Validators.required],
        content: [null, Validators.required],
      })
    }

    publishComment() {
      const postedBy= this.commentForm.get('postedBy')?.value;
      const content= this.commentForm.get('content')?.value;

      this.commentService.createComment(this.postId, postedBy, content).subscribe(res=>{
        this.matSnackBar.open("Comment Published Successfully", "OK");
        this.getCommentsByPost();
      }, error=>{
        this.matSnackBar.open("Something Went Wrong!", "OK")
      })
    }

    getCommentsByPost(){
      this.commentService.getAllCommentsByPost(this.postId).subscribe(res=>{
        this.comments = res;
      }, error=>{
        this.matSnackBar.open("Something Went Wrong!!", "OK")
      })
    }
  
    getPostByid() {
      this.postService.getPostById(this.postId).subscribe(res=>{
        this.postData = res;
        console.log(res);
        this.getCommentsByPost();
      }, error=>{
        this.matSnackBar.open("Something Went Wrong!!!!", "OK")
      })
    }

    likePost() {
      this.postService.likePost(this.postId).subscribe((response)=>{
        this.matSnackBar.open("Post Liked Successfully", "Ok");
        this.postData.likeCount += 1;

      }, (error)=>{
        this.matSnackBar.open("Something Went Wrong!!!", "OK")
      } )
    }
    
    
}
