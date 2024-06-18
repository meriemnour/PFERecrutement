import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/models/offer.model';
import { OfferService } from 'src/app/services/offer.service';

@Component({
    selector: 'app-job-details-page',
    templateUrl: './job-details-page.component.html',
    styleUrls: ['./job-details-page.component.scss']
})
export class JobDetailsPageComponent {

    title = 'Job Details - Jove';
    offer!:Offer;
    constructor(private titleService:Title,private offerService:OfferService,private route:ActivatedRoute) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
        this.route.paramMap.subscribe(params=>{
            
            const idParam=params.get('id');
            if(idParam){
                const id=+idParam;
                if(id){
                    this.offerService.afficherOfferParId(id).subscribe((data)=>{
                        this.offer=data;
                    })
                }
                
            }
            
        })
    }
    getImageUrl(filename:string):string{
        return `http://localhost:8080/api/files/get-image/${filename}`;
    }


    
}