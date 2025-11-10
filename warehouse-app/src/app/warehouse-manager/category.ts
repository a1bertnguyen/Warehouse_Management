import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup,  ReactiveFormsModule, Validator, Validators } from "@angular/forms";
import { CATEGORY } from "../data";

@Component({
    selector:'category',
    imports:[ReactiveFormsModule, CommonModule],
    templateUrl:'./html/category.html',
    styleUrls:['./css/category.css']
})

export class Category{
    showAddCategoryForm = false;
    showAdjustCategoryForm: any | null = null;
    categories = CATEGORY;
    
    addCategoryForm = new FormGroup({
        name: new FormControl('', Validators.required)
    })
    async addCategory(){
        const name = this.addCategoryForm.value.name ?? '';
        if (!name) {
            alert("Please filll in every fields");
            return;
        }
        this.categories.push({
            id: Math.floor(Math.random() * 100000).toString(),  
            name
        })
        this.showAddCategoryForm = false;
    }

    async deleteCategory(id: any){
        this.categories = this.categories.filter(category => category.id !== id);
    }

    selectedCategoryId: any;
    adjustCategoryForm = new FormGroup({
        name: new FormControl('', Validators.required)
    })
    openAdjustCategoryModal(category:any){
        this.showAdjustCategoryForm = category.id;
        this.selectedCategoryId=category.id;
        this.adjustCategoryForm.setValue({
            name: category.name
        });
    }
    async adjustCategory(){
        const name = this.adjustCategoryForm.value.name ?? '';

        if(!name) {
            alert('Please fill in every fields');
            return;
        }

        const category = this.categories.find(u => u.id === this.selectedCategoryId);
        if (category){
            category.name = name;
        }
        this.showAdjustCategoryForm=null;
    }
}