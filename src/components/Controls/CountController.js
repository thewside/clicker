export default class CountController {
    "use strict"
        constructor(count, setCount, overdrive, setOverdrive, overdriveCount, setOverdriveCount) {

        this.count = count;
        this.setCount = setCount;
        this.overdrive = overdrive;
        this.setOverdrive = setOverdrive;
        this.overdriveCount = overdriveCount;
        this.setOverdriveCount = setOverdriveCount;
        this.overdriveLength = overdriveCount;

        this.maxScore = 0;
        this.countMode = 1;
        this.overdriveTime = 10000;
        this.chance = 5 / 100;
        this.clicks = 0;
        this.clickInterval = 1000;
        this.maxClicksInInterval = 3;
    };

    throttle(){
        if(!this.date) {
            this.date = Number(new Date())
        };
        if(Number(new Date()) > this.date + this.clickInterval) {
            this.date = this.date = Number(new Date());
            this.clicks = 0;
            this.clicks++;
            this.controlCount();
            return
        };

        if(this.clicks === 3) {
            return
        };
        
        this.clicks++;
        this.controlCount();
    }

    maxCount(){
            return this.maxScore
    }

    resetOverdriveCount(){
            clearInterval(this.overdriveInterval);
            this.overdriveInterval = null;
            this.setOverdriveCount(()=>{
                this.overdriveCount = this.overdriveLength;
                return this.overdriveLength;
            });
            this.setOverdrive(()=>{
                this.overdrive = false;
                this.countMode = 1;
                return false
            });
       
    }

    controlCount(){

        if(this.overdriveCount <= 0 ) {
            this.resetOverdriveCount()
        };
        this.setCount(prev => {
            this.maxScore = prev + this.countMode;
            return prev + this.countMode
        });

        if(this.overdriveInterval) return

        if(Math.random() < this.chance){
        // if(true){
            this.countMode = 2;
            this.setOverdrive(()=>{
                this.overdrive = true;
                return true
            });

            this.overdriveInterval = setInterval(()=>{
                if(this.overdriveCount === 0 ) {
                    this.resetOverdriveCount()
                };
                this.setOverdriveCount(prev=>{
                    this.overdriveCount = this.overdriveCount - 1 <= 0 ? 0 : this.overdriveCount - 1;
                    return prev - 1 <= 0 ? 0 : prev - 1;
                });
            }, 1000);
        };
    };
};
