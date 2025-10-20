import { Component } from "@angular/core";
import { SUPPLLIER } from "../data";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from "@angular/forms";

@Component({
    selector: 'supplier',
    imports:[ReactiveFormsModule, CommonModule],
    templateUrl: './html/supplier.html',
    styleUrls:['./css/supplier.css']
})

export class Supplier{
    showAddItemForm = false;
    showAdjustItemForm: number | null = null;
    suppliers = SUPPLLIER;

    addItemForm = new FormGroup({
        name: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required)
    })
    async addItem(){
        const name = this.addItemForm.value.name ?? '';
        const contact = this.addItemForm.value.contact ?? '';

        if(!name || !contact){
            alert('Please fill in every fields');
            return;
        }

        this.suppliers.push({
            id: Math.floor(Math.random() * 100000),  
            name, contact
        })
        this.showAddItemForm = false;
    }

    async deleteItem(id:any){
        this.suppliers = this.suppliers.filter(u => u.id !== id);
    }

    seletedItemId: any;
    adjustItemForm = new FormGroup({
        name: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required)
    })
    openAdjustItemModal(item: any){
        this.showAdjustItemForm = item.id;
        this.seletedItemId = item.id;
        this.adjustItemForm.setValue({
            name: item.name,
            contact: item.contact
        })
    }
    async adjustItem(){
        const name = this.adjustItemForm.value.name ?? '';
        const contact = this.adjustItemForm.value.contact ?? '';

        if(!name || !contact){
            alert('please fill in every fields');
            return;
        }

        const supplier = this.suppliers.find(u => u.id ===this.seletedItemId);
        if(supplier){
            supplier.name = name;
            supplier.contact = contact;
        }
        this.showAdjustItemForm = null;
    }
}