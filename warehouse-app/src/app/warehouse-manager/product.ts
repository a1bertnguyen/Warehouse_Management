import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CATEGORY, PRODUCTS } from "../data";

@Component({
    imports:[ReactiveFormsModule, CommonModule],
    templateUrl: './html/product.html',
    styleUrls:['./css/product.css']
})

export class Product{
    showAddItemForm = false;
    showAdjustItemForm: any | null = null;
    products = this.sortProductsByExpiry(PRODUCTS);
    selectedFile?: File | null = null;

    addItemForm = new FormGroup({
        id: new FormControl('', Validators.required),
        sku: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        expire_date: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
    });

    onFileSelected(event: Event, add: boolean) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.selectedFile = file;
        if (add) this.addItemForm.patchValue({ image: file.name });
        else this,this.adjustItemForm.patchValue({ image: file.name });
        }
    }

    async addItem() {
        const form = this.addItemForm.value;

        const id = form.id?.trim() ?? '';
        const sku = form.sku?.trim() ?? '';
        const name = form.name?.trim() ?? '';
        const price = Number(form.price) || 0;
        const description = form.description?.trim() ?? '';
        const categoryInput = form.category?.trim() ?? '';
        const quantity = Number(form.quantity) || 0;
        const expire_date = new Date(form.expire_date ?? new Date());

        if (this.addItemForm.invalid || !this.selectedFile) {
            alert("Please fill all fields and select an image");
            return;
        }

        const matchedCategory = CATEGORY.find(c => c.id === categoryInput || c.name.toLowerCase() === categoryInput.toLowerCase());

        if (!matchedCategory) {
            alert('Cannot find category');
            return;
        }

        const image_url = URL.createObjectURL(this.selectedFile);

        this.products.push({
            product_id: id,
            name: name,
            description: description,
            sku: sku,
            price: price,
            stock_quantity: quantity,
            expire_date: expire_date,
            created_at: new Date(),
            image_url,
            category_id: matchedCategory.id,
            category_name: matchedCategory.name
        })
        this.products = this.sortProductsByExpiry(this.products);
        this.showAddItemForm = false;
        this.selectedFile = undefined;
    }

    async deleteItem(id:any){
        this.products = this.products.filter(u => u.product_id !== id);
    }

    selectedItemId: any;
    adjustItemForm = new FormGroup({
        id: new FormControl('', Validators.required),
        sku: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        expire_date: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
    })
    openAdjustItemModal(item: any){
        this.showAdjustItemForm = item.product_id;
        this.selectedItemId = item.product_id;
        this.adjustItemForm.setValue({
            id: item.product_id,
            sku: item.sku,
            name: item.name,
            price: item.price.toString(),
            description: item.description,
            category: item.category_name,
            quantity: item.stock_quantity.toString(),
            expire_date: item.expire_date.toISOString().split('T')[0],
            image: item.image_url.split('/').pop() ?? 'existing image'
        })
    }
    async adjustItem(){
        const form = this.adjustItemForm.value;

        if (this.adjustItemForm.invalid) {
            alert("Please fill all fields");
            return;
        }

        const matchedCategory = CATEGORY.find(c => c.id === form.category || c.name.toLowerCase() === (form.category ?? '').toLowerCase());

        if (!matchedCategory) {
            alert('Cannot find category');
            return;
        }

        const product = this.products.find(u => u.product_id ===this.selectedItemId);
        if(product){
            let image_url = product.image_url;
            if (this.selectedFile)
            image_url = URL.createObjectURL(this.selectedFile);

            product.product_id = form.id ?? product.product_id;
            product.sku = form.sku ?? product.sku;
            product.name = form.name ?? product.name;
            product.price = Number(form.price) || product.price;
            product.description = form.description ?? product.description;
            product.category_id = matchedCategory.id;
            product.category_name = matchedCategory.name;
            product.stock_quantity = Number(form.quantity) || product.stock_quantity;
            product.expire_date = new Date(form.expire_date ?? product.expire_date);
            product.image_url = image_url;
        }
        this.products = this.sortProductsByExpiry(this.products);
        this.showAdjustItemForm = null;
        this.selectedItemId = null;
        this.adjustItemForm.reset();
        this.selectedFile = undefined;
    }

    getExpiringSoon(date: Date): string {
        const today = new Date();
        const expire = new Date(date);
        const diffDays = (expire.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays <= 0) return "#b91c1c"
        if (diffDays <= 7) return "#dc9326ff"
        if (diffDays <= 15) return "#f4f461ff"
        return "#F3F4F5"
    }

    sortProductsByExpiry(products: any[]) {
        return products.sort((a, b) => {
            const dateA = new Date(a.expire_date).getTime();
            const dateB = new Date(b.expire_date).getTime();
            return dateA - dateB;
        });
    }
}