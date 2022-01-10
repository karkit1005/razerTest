class LockHolder {
    private p: any;
    private resolve: any;
    private reject: any;
  
    constructor() {
      this.p = new Promise((resolve, reject) => { 
        this.resolve = resolve; 
        this.reject = reject; 
      });
    }
  
    public getLockAndHold(id: string) {
      navigator.locks.request("resource", async lock => {
        console.log("Lock");
        
        let btn:HTMLButtonElement=<HTMLButtonElement>document.createElement("button");
        btn.id = id;
        btn.textContent = "Lock Release";
        btn.addEventListener("click", (e:Event) => this.releaseLock(id));
        
        document.getElementById("container")?.append(btn);
        return this.p;
      })
    }
  
    public releaseLock(id: string) {
      this.resolve();
      console.log("Lock Release!");
  
      document.getElementById(id)?.remove();
    }
  }
    
  const lock = new LockHolder();
  lock.getLockAndHold("btnRelease");
  
  export { LockHolder };