class LockThief {
    public lockThief(){
        navigator.locks.request('resource', { steal: true }, async lock =>{
            console.log('Lock Steal');
        })
    }
}

const lockThief = new LockThief();
lockThief.lockThief();

export { LockThief }