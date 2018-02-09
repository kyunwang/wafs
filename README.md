# Web App From Scratch
The course repo for 'Web App From Scratch'

## Advantages and disadvantages of JavaScript libraries/frameworks
### Pro:
- Frameworks/Libraries make development quicker and usually easier
- Efficiency. Doing a lot with just a few lines code
- Some frameworks, which are strict/opinionated, set practices you have to keep. This way you will have consistent codebases
- More with Less / Save time / Not reinventing
- A collection of general (ready made) solutions you don't have to type out every single time (also a con as we usually have specific problems)
- Community around a framework/library can be really beneficial to you. And being part of one can make you grow as developer and person too.


### Con:
- The time a library/framework stays is really versatile. It can be really popular for a few year but can be 'old' afterwards and not be supported anymore.
- Learning curve of new a new framework/library can take time and money.
- Can give unnecessary kb the you just need a part of it. (E.g. jQuery for Ajax only)
- A framework is hard to transition away from. You will be heavily dependant of the framework if you need to maintain a project for a long time (E.g. years)
- You are dependant to the maintainers
- Usually really reliant to the hype around it

### Sources:
- https://www.planningforaliens.com/blog/2016/06/09/when-to-use-a-js-framework/
- https://opensource.com/article/17/6/javascript-frameworks 
- https://code.tutsplus.com/tutorials/should-you-use-a-php-framework-five-pros-and-cons--cms-28905
- https://jaxenter.com/pros-cons-using-framework-135901.html
- https://blog.hellojs.org/javascript-frameworks-why-and-when-to-use-them-43af33d0608d
- https://davidwalsh.name/6-reasons-to-use-javascript-libraries-frameworks
- https://code.tutsplus.com/tutorials/should-you-use-a-php-framework-five-pros-and-cons--cms-28905

## Advantages and disadvantages of client-side single page web apps
### Pro
- Emulates a natural flow because no reloads/extra wait time of whole page loads of the browser is needed
- (Can feel) Feels like a native application
- Can utilise the backend(API) for both the SPA and Native/Mobile apps (self standing)
- No need to download multiple pages 
- Files are only loaded once throughout the visit - makes it feel quick
- No server renders needed
- Easier to deploy in production as you will only need three files: index.html, bundled css and bundled js (frontend)

### Con
- Heavily reliant to Javascript
- Hard to integrate SEO (client side)
- First loads can take some time depending on the application size (code splitting can help here)
- Danger of XSS. Attackers can inject client side script
- Too many choices for frameworks/libraries to choose from (Can be good and bad)	
- Memoryleaks in js can impact performance or crash the whole application 
- Larger applications may be harder to maintain & maintaining between SPA and Backend
- Debugging can be hell & tracing code can be hard as you probably will be using multiple third party dependencies
- You will be reliant to third-party dependencies

### Sources
- https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58 
- https://www.youtube.com/watch?v=F_BYg2QGsC0
- https://blog.angular-university.io/why-a-single-page-application-what-are-the-benefits-what-is-a-spa/
- https://www.scalablepath.com/blog/single-page-applications/

## Best practices

- Don't use global variables/objects
- Declare variables at top of scope
- Use short clear meaningful names (English)
- Work in strict mode
- camelCase your code if(code != Constructor || CONSTANTS)
- Place external scripts at the bottom of the page
- Indent your code
- Always code comment
- Share and show off your work!
