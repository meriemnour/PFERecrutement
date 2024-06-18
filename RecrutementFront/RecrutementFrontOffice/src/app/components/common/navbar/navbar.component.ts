import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/register-request.model';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
    dropdownOpen = false;
    // Navbar Sticky
    isSticky: boolean = false;
    uploadProgress:number |null=null;
    imagePreview:string|ArrayBuffer|null=null;
    fileToUpload:File | null=null;
    currentUser!:User;

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    constructor(
        public router: Router,
        public authService:AuthService,
        private fileService:FileService
    ) { }
    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (data)=>{
                this.currentUser=data;
            },
            error: (error)=>console.error('Error fetching user data:', error)
        })
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }
    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      }
	// Tabs 1
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }
    getImageUrl(filename:string):string{
        return `http://localhost:8082/api/files/get-image/${filename}`;
    }
	// Tabs 2
    currentInnerTab = 'innerTab1';
    switchInnerTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentInnerTab = tab;
    }

    // Modal Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }
    login(data:{email:string,password:string}):void{
        this.authService.login(data.email,data.password).subscribe({
            next: (success)=>{
                this.isOpen = false;
                console.log("login success")
                this.router.navigate(['/'])
            },
            error: (error)=>{
                console.error('Login failed:',error);
            }
        })
    }
    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
      }
    onFileSelected(event:Event){
        const element =event.currentTarget as HTMLInputElement;
        let fileList:FileList | null =element.files;
        if(fileList){
          this.fileToUpload=fileList[0];
          const reader=new FileReader();
          reader.onload=()=>{
            this.imagePreview=reader.result;
          }
          reader.readAsDataURL(this.fileToUpload);
        }
      }
    register(data:any){
        console.log(data.valid)
        
        if(data && this.fileToUpload){
            console.log(this.fileToUpload)
            this.fileService.uploadFile(this.fileToUpload).subscribe(
              response=>{
                console.log("File uploaded:",response);
                data.image_profile=this.fileToUpload?.name;
                console.log(data)
                this.authService.register(data).subscribe({
                    next: (success)=>{
                        this.currentTab = 'tab1';
                    },
                    error: (error)=>{
                        console.error('Signup failed:',error);
                    }
                });
            })
        }
    }
}

