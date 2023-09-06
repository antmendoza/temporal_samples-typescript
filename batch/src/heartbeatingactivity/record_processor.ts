
export class Record {

    public readonly offset: any;
    public readonly description: string;
    constructor(offset: number) {
        this.offset = offset;
        this.description = "record number "+ offset;
    }

    hasValue(){
        return this.offset != null;
    }

}

export  function getRecord(offset: any): Record {
    const RECORD_COUNT = 10;
    const recordValue = RECORD_COUNT > offset ? offset : null;
    return new Record(recordValue);
}

export function processRecord(param: Record): Promise<void> {
    // Fake processing logic
    return new Promise((resolve) => {
        setTimeout(resolve, 100);
        return;
    });
}