import { Component } from "@angular/core";
import { MOCK_USERS, TRANSACTIONS, PRODUCTS } from "../data";
import { StatChartComponent } from "./stat-chart";

@Component({
    templateUrl: './html/statistic.html',
    imports: [StatChartComponent],
    styleUrls: ['./css/statistic.css']
})

export class Statistic {
    users = MOCK_USERS;
    transactions = TRANSACTIONS;
    products = PRODUCTS;
    
    getUserNumber(){
        let total = 0;
        this.users.map(u => total++);
        return total;
    }

    getSellingOrder(){
        const selling = this.transactions.filter(t => t.transaction_type === "Selling");
        let total = 0;
        selling.map(s => total++);
        return total;
    }

    getSupplyingOrder(){
        const supplying = this.transactions.filter(t => t.transaction_type === "Supplying");
        let total = 0;
        supplying.map(s => total++);
        return total;
    }

    getInventory(){
        let total = 0;
        this.products.map(p => total += p.stock_quantity);
        return total;
    }

    getProductNumber(){
        let total = 0;
        this.products.map(p => total++);
        return total;
    }

    getFewStock(){
        let total = 0;
        const fewStock = this.products.filter(p => p.stock_quantity <= 15);
        fewStock.map(f => total++);
        return total;
    }

    getOutStock(){
        let total = 0;
        const outStock = this.products.filter(p => p.stock_quantity <= 0);
        outStock.map(f => total++);
        return total;
    }
}