import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ListService } from 'src/app/core/lists/lists.service';
import { BehaviorSubject } from 'rxjs';
import { List } from '../../models/list.model';
import { ListParticipant } from '../../models/list.model';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.scss']
})
export class ShareListComponent {

  constructor(
    private listService:  ListService,
    public dialogRef:     MatDialogRef<ShareListComponent>,
    private snackBar:     MatSnackBar,
    @Inject(MAT_DIALOG_DATA) 
    public list$:         BehaviorSubject<List>
  ) { }

  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email])

  public addMember() {

    const { lid } = this.list$.getValue()

    this.listService.addParticipant(lid, this.emailFormControl.value)
      .then(_ => {
        this.emailFormControl.reset()
        this.snackBar.open("Usuario invitado 😃", "", { duration: 1500 })
      })
      .catch((error: Error) => {
        const { message } = error
        this.snackBar.open(message, "", { duration: 1500 })
      })
  }
  
  public showDefaultProfilePic(event: any) {
    event.target.src = 'assets/images/placeholder_image.png'
  }

  public delete(event: any, participant: ListParticipant) {
    const { lid, owner } = this.list$.getValue()

    if (owner.uid !== this.listService.user$.getValue().uid) {
      return
    }

    document.getElementById(participant.uid).style.transform = `translate3d(${event.velocity > 0 ? '' : '-'}110%, 0, 0)`
    setTimeout(_ => {
      this.listService.removeParticipant(lid, participant)
    }, 250)
  }

}
