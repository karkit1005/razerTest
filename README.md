## Razer Test

### Question 1C - 3 lock_holder.html pages are running in 3 tabs, describe the lock request/lock release behavior
Answer - When the lock request is executed, only the first tab open in the same origin will execute the code. Others tab will wait until the previous tab’s lock is release, then the next tab will execute the code.

### Question 1D - steal the lock from lock holder, and show that how lock holder knows its lock got stolen?
Answer - When load the lock_thief.html, the lock_holder.html where get lock will have an error - Uncaught (in promise) DOMException: Lock broken by another request with the 'steal' option.