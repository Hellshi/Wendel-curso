# Monitoring and Observability Suggestions and Script:
First analysis
## APM
### Which kind of information you can retrieve from APM? 
* Which service is taking longer to respond? 
* Queries that may be returning more data than expected or even causing delay in between requests?
* Which service throws more errors?

Once you are done analyzing the systems the next step should be **perform an load balance test** you can use autocannon

Once you tested your endpoints it's time to understand "WHY ARE YOU LIKE THIS???". To do this, you should analyze the code and try to understand what is causing leaks, delays or any weird behavior you've found in your previous analysis. It's like your lab practices.

**suggestion: Ox**

Keep your documentation. 

Clinic package can be used to find solutions for your found issues.
