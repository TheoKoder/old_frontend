import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "../../services/api.service";
import { UIService } from "./ui.service";
import { SnackbarService } from "../../services/snackbar.service";


export abstract class TableComponent {
    isLoading = false;
    per_page: number = 5;
    page_size: number = 5;
    search: string = '';
    totalItems: any;
    totalPages: any = 0;
    nextPageUrl: any;
    isDataAvailable: boolean = false;
    previousPageUrl: any;
    result: any;
    page: number = 1;

    // Check/use device-dail-report as example to implement in other HTML pages to use dynamic headers
    Headers: any;

    constructor(
        private api: ApiService,
        public uidialog: MatDialog,
        private uiservice: UIService,
        private _snackbar: SnackbarService
    ) {

    }

    abstract onComplete(): string;

    reset(){
        this.isLoading = false;
        this.per_page = 5;
        this.page_size = 5;
        this.search = '';
        this.totalPages = 0;
        this.isDataAvailable = false;
        this.page = 1;
        this.result = [];
    }

    block(){
        this.isLoading = true;
        this.uiservice.openDialog();
    }
    unblock(){
        this.isLoading = false
        this.uiservice.closeDialog();
    }

    calculateTotalPages() {
        console.log(this.totalItems + "/" + this.per_page)
        if (this.totalItems < this.per_page) {
            this.totalPages = 1;
        } else {
            this.totalPages = Math.ceil(this.totalItems / this.per_page);
        }
        console.log(this.totalPages)
    }
    nextPage() {
        if (this.nextPageUrl) {
            this.loadItemsFromUrl(this.nextPageUrl);
            this.page++;
        }
    }


    previousPage() {
        if (this.previousPageUrl) {
            this.loadItemsFromUrl(this.previousPageUrl);
            this.page--;
        }
    }

    loadItems(routeName: string, customParams: { [key: string]: any } = {}) {
        this.reset();
        this.block();
        this.api.getApiLaravel(routeName, customParams).subscribe({
            next: data => {
                console.log(data)
                this.result = data.data;
                this.totalItems = data.pagination.total;
                this.nextPageUrl = data.pagination.nextPageUrl;
                this.previousPageUrl = data.pagination.previousPageUrl;
                this.isDataAvailable = this.result && this.result.length > 0;
                this.per_page = data.pagination.perPage;
                this.calculateTotalPages()
                if (this.result.length > 0) {
                    const keys = Object.keys(this.result[0]);
                    this.Headers = keys;
                    console.log(this.Headers)
                }
                this.unblock()
            },
            error: err => {
                this._snackbar.openSnackbar(
                    'Error loading server, please try again later',
                    err
                );
                console.log(err.error.message)
                this.unblock()
            },
            complete: () => this.onComplete()

        })
        // this.api.getApiLaravel(routeName, customParams).subscribe((data: any) => {
        //     this.result = data.data;
        //     this.totalItems = data.pagination.total;
        //     this.nextPageUrl = data.pagination.nextPageUrl;
        //     this.previousPageUrl = data.pagination.previousPageUrl;
        //     this.isDataAvailable = this.result && this.result.length > 0;
        //     this.calculateTotalPages()
        //     if (this.result.length > 0) {
        //         const keys = Object.keys(this.result[0]);
        //         this.Headers = keys;
        //     }
        //     this.isLoading = false
        //     this.uiservice.closeDialog(this.dialog);
        // }, error => {
        //     this._snackbar.openSnackbar(
        //         'Error loading server, please try again later',
        //         error
        //     );
        //     this.isLoading = false
        //     this.uiservice.closeDialog(this.dialog);
        // });
    }


    private loadItemsFromUrl(url: string) {
        this.block()
        this.api.getNextPage(url).subscribe({
            next: data => {
                this.result = data.data;
                this.totalItems = data.pagination.total;
                this.nextPageUrl = data.pagination.nextPageUrl;
                this.previousPageUrl = data.pagination.previousPageUrl;
                this.unblock()
            },
            error: err => {
                this._snackbar.openSnackbar(
                    'Error loading server, please try again later',
                    err
                );
                this.unblock()
            },
            complete: () => this.onComplete()
        })
    }
    padZero(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }
    genCSV(csvReport: any[],reportName: string): void {
        if (!csvReport || csvReport.length === 0) {
            console.error('No data available for the CSV report.');
            return;
        }
        if (csvReport.length > 0) {
            const filteredData = csvReport
            const keys = Object.keys(filteredData[0]);
            let csvContent = keys.map(key => `"${key}"`).join(',') + '\n';
            csvContent += filteredData.map((item: any) => keys.map(key => `"${item[key]}"`).join(',')).join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${reportName}.csv`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        } else {
            this._snackbar.openSnackbar(
                'No Data Found',"none"
            );
        }
    }
}