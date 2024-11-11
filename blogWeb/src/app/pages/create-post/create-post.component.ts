// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import {  Router } from '@angular/router';

// @Component({
//   selector: 'app-create-post',
//   // standalone: true,
//   // imports: [],
//   templateUrl: './create-post.component.html',
//   styleUrls: ['./create-post.component.css']})
// export class CreatePostComponent {
// removeTag(_t37: number) {
// throw new Error('Method not implemented.');
// }
// addTag($event: Event) {
// throw new Error('Method not implemented.');
// }

//   postForm!: FormGroup;
//   tags:string[] = [];

//   constructor(private fb: FormBuilder,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ){}

//   ngOnInit(){
//     this.postForm = this.fb.group({
//       name: [null, Validators.required],
//       content: [null, [Validators.required, Validators.maxLength(5000)]],
//       img:  [null, Validators.required],
//       postedBy : [null, Validators.required]
//     })
//   }

//   add(event:any){
//     const value = (event.value || '').trim();
//     if(value){
//       this.tags.push(value);
//     }

//     event.chipInput!.clear();
//   }

//   remove(tag:any){
//     const index = this.tags.indexOf(tag);

//     if(index>=0){
//       this.tags.splice(index,1);
//     }

    
//   }

//   onFileSelected(event: Event): void {
//     const fileInput = (event.target as HTMLInputElement);
//     const file = fileInput.files?.[0];

//     if (file) {
//         console.log('Selected file:', file);

//         this.postForm.patchValue({
//             img: file
//         });
//         this.postForm.get('img')?.updateValueAndValidity();
//     }

    
// }
// onSubmit(): void {
//   if (this.postForm.valid) {
//       console.log(this.postForm.value);
//   }
// }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
[x: string]: any;
  postForm!: FormGroup;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private postService: PostService,) {}


  ngOnInit() {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
      postedBy: [null, Validators.required]
    });
  }

  addTag(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    input.value = '';
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      this.postForm.patchValue({
        img: file
      });
      this.postForm.get('img')?.updateValueAndValidity();
    }
  }


  onSubmit(): void {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
    }
  }

 

  createPost() {
    const data = this.postForm.value;
    data.tags = this.tags;

    this.postService.createNewPost(data).subscribe(res=>{
      this.snackBar.open("Post Created Successfully !", "ok");
      this.router.navigateByUrl("/")
    }, error=>{
      this.snackBar.open("Something Went Wrong!!", "ok")
    })
  }
}
