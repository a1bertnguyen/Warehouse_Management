import { Component, inject } from "@angular/core";
import { TRANSACTIONS } from "../data";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute } from "@angular/router";

@Component ({
    imports: [RouterModule, CommonModule],
    templateUrl:"./html/transaction.html",
    styleUrls:["./css/transaction.css"]
})

export class Transaction {
    route: ActivatedRoute = inject(ActivatedRoute);
    transaction_type: string | null = null;
    transactions: any[] = [];

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.transaction_type = params.get("type");

            this.transactions = TRANSACTIONS.filter(t => t.transaction_type === this.transaction_type);
        });
    }

    approve(transaction:any){
        //approve
        this.transactions = this.transactions.filter(t => t.transaction_id !== transaction.transaction_id);
    }

    reject(transaction:any){
        //reject
        this.transactions = this.transactions.filter(t => t.transaction_id !== transaction.transaction_id);
    }
}