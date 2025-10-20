import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MOCK_USERS } from "../data";
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector:'manage-user',
    imports:[ReactiveFormsModule, CommonModule],
    templateUrl:'./html/manageUser.html',
    styleUrls:['./css/manageUser.css']
})

export class manageUser{
    users = MOCK_USERS;
    showAddUserForm = false;
    showAdjustUserForm: number | null = null;

    addUserForm = new FormGroup({
        email: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required)
    })

    async addUser(){
        const email = this.addUserForm.value.email ?? '';
        const role = this.addUserForm.value.role ?? '';

        if(!email || !role){
            alert("Please fill in every fields");
            return;
        }
        this.users.push({
            id: Math.floor(Math.random() * 100000),  
            role, email,
            createdOn: new Date().toISOString().split('T')[0]
        })
    }

    async deleteUser(id: any){
        this.users = this.users.filter(user => user.id !== id);
    }

    selectedUserId: any;
    adjustUserForm = new FormGroup({
        email: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required)
    })
    openAdjustUserModal(user: any) {
        this.showAdjustUserForm = user.id;
        this.selectedUserId = user.id;
        this.adjustUserForm.setValue({
            email: user.email,
            role: user.role
        });
    }
    async adjustUser(id: any){
        const email = this.adjustUserForm.value.email ?? '';
        const role = this.adjustUserForm.value.role ?? '';

        if(!email || !role){
            alert("Please fill in every fields");
            return;
        }
        
        const user = this.users.find(u => u.id === this.selectedUserId);
        if (user){
            user.email=email;
            user.role=role;
        }
        this.showAdjustUserForm=null;
    }
}