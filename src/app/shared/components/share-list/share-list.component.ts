import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ListService } from 'src/app/core/lists/lists.service';
import { BehaviorSubject } from 'rxjs';
import { List } from '../../models/list.model';
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
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public list$: BehaviorSubject<List>
  ) { }

  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email])

  ngOnInit() {
  }

  public addMember() {
    const { lid } = this.list$.getValue();

    this.listService.addParticipant(lid, this.emailFormControl.value)
      .then(_ => {
        this.snackBar.open("Usuario invitado 😃", "", { duration: 1500 })
      })
      .catch((error: Error) => {
        const { message } = error;

        this.snackBar.open(message, "", { duration: 1500 })
      })
  }
  
  public showDefaultProfilePic(event: any, gender: UserGender) {
    event.target.src = `assets/images/placeholder_image_${gender ? gender : 'male'}.png`;
  }

}
