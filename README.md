# Web App From Scratch
The course repo for 'Web App From Scratch' which has a duration of 3 weeks.



Challenges:
- Use vanilla Javascript only
- Try to use CSS Grid as main layout tool
- Microlibs may be used for templating and routing
- Implement BEM CSS class naming


## The used API
This application makes use of the [Kitsu API](https://kitsu.docs.apiary.io/).

**Citation**

> Kitsu is a modern anime discovery platform that helps you track the anime you're watching, discover new anime and socialize with other fans.With the Kitsu API you can do everything the client can do and much more.API path: https://kitsu.io/api/edge


It was really easy to get basic `GET` requests but a lot of the documentation as unclear. Like how to make `POST` requests, as the required header and data has not been documented. The time taken to understand and implemment the API could have been much less if it had been beter documentated or more varied exampled were given.

At the time of using the API authorization was also not possible (At the time of writing a *Password grant has been documented*).


## Microlibs used

### Routing - Routie
*Put link to routie here*

### Templating - Transparency
*Put link to transparency here*

// short
Really abstract and needed time get used to the way it works
Needed to be dynamic so template engines like `Pug` won't cut it

Documentation can't be said to be clear, but the it certainly helps, especially the examples.

*Should I use `template literals` for for custom templates instead?*
Maybe



## Actor and Flow diagram
These diagrams give a overview of the available methods and how the (data)flow goes of the application.

The flow diagrams are made with [draw.io](https://www.draw.io)

### Actor diagram
The actor diagram shows all our *Actors* to give a clear overview of where all the possible methods and properties live and are called.

![The actor diagram of the application](https://github.com/kyunwang/wafs/blob/develop/images/actor-diagram.jpg)

### Flow diagram
These diagrams show a the data flow of the application. In this case it has been divided in three sections.

- **The initial flow**

Initializing the application

![A diagram of the initial flow of the application. The initialization](https://github.com/kyunwang/wafs/blob/develop/images/flow-diagram-initial.jpg)

- **The flow on the overview page**

![A diagram of the flow on the overview page](https://github.com/kyunwang/wafs/blob/develop/images/flow-diagram-overview.jpg)

- **The flow on the user library page**

![A diagram of the flow on the user library page](https://github.com/kyunwang/wafs/blob/develop/images/flow-diagram-library.jpg)

### Need to do
- [x] Clean the templates because I was pretty WET, but want to be DRY (You get it? 😏)
- [x] Add pagination


### Known issues
- Not all api failures have been catched yet
- Pagination in a filtered view does not work correctly yet. (e.g. after selecting *completed* in the user library)

### Future plan
Recreate a similar app but with a **React** or **Vue** and a different API. Preferably one which keeps itself synced with MyAnimeList

# License
MIT - Kang Yun Wang (Kevin Wang)