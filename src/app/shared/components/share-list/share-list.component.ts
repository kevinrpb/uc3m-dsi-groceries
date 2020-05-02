import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ListService } from 'src/app/core/lists/lists.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserGender } from '../../models/user.model';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.scss']
})
export class ShareListComponent implements OnInit {

  constructor(
    private listService: ListService,
    public dialogRef: MatDialogRef<ShareListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email])

  ngOnInit() {
  }

  public addMember() {
    this.listService.addParticipant(this.data.lid, this.emailFormControl.value)
  }
  
  public showDefaultProfilePic(event: any, gender: UserGender) {
    event.target.src = `assets/images/placeholder_image_${gender ? gender : 'male'}.png`;
  }

}
