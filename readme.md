# Event bus

 this is a basic implementation of microservices  and how they work behind the scene.
 this implementation is only for learning purpose and can't be used in a real world application.

## What is Microservice architecture

it's the architecture where you split your app into its minimal components, where each microservice is responsible for only one thing.
by doing so we reach a level of independency between features allowing our app to still being able to function even if one service went down for any reason.

## Characteristics of Microservice architecture

1. Microservice architectural style is an approach to developing a single application as a suite of small services.
2. Services are built around business capabilities , independently deployable and packaged, each running in its own process.
3. Each Service should have separate database layer.
4. Each Service can have independent codebase, CI/CD tooling sets.
5. Each Service can be tested in isolation without dependent on other services.
6. Each service can pick the best technology stack for its use cases (no need to stick into one framework throughout the entire application).
7. Each Service should have monitoring and troubleshooting capabilities for operation team
8. Services should implement Retry functionality in case of network failure or system failure
9. Each Service can implement independent security mechanism
10. practice explicit as a requirement.
11. Services can use HTTP(Rest) or messaging for communication or any other lightweight communication protocol.
12. Well understood Distribution Transaction management
13. Presenting API
14. Clean and Clear Separation of Stateless and Stateful Services
15. Each Service can be run without waiting for other service to go online
16. Service can use different language,framework and technologies
17. Maintain Independent Revisions and Build Environments to maintains compatibility with other services.

## What is this Code for ?

as mentioned before this is a simple implementation of how microservices communicate with each other and to apply this idea i built a ridiculously simple blog which consist of :

1. Post Service: which is responsible of creating new posts and storing them.
2. Comments Service: which is in charge of creating, updating and storing comments.
3. Moderation Service: which is responsible of moderating newly created comments for bad words.
4. Query Service: which is responsible of join the data to return the posts with its associated comments.
5. Event-Bus: this is what makes the communication between services possible since it receive the event fired by the service X and then broadcast it to all registered service, and only those who cares about it would handle it.
6. Client[Still in progress]: the UI application that uses these services.
7. Gateway: the gateway that redirects all the incoming requests to the service that is responsible of it.

## How the communication between services works?

first we got the event bus running and listening for any incoming events through the ```/events``` endpoint using POST requests after that it sends that event to all the registered services

```js
 // for now i'm just storing registered services in a simple js object for simplicity
 const hosts = [
  {
    id: "posts",
    url: "http://localhost:3000/events",
  },
  {
    id: "comments",
    url: "http://localhost:3001/events",
  },
  {
    id: "query",
    url: "http://localhost:3003/events",
  },
  {
    id: "moderation",
    url: "http://localhost:3004/events",
  },
];
```

all the services have their own ```/events``` endpoint that allows them to receive the events broadcasted by the event  bus.
services only handles event they care for
