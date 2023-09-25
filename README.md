# Lighthouse Base Web - Skill Education in Schools

## Introduction

![lahi-logo](https://github.com/LAHI-Lighthoue/lighthouse-base-web/assets/108608673/9e4e88b8-60f1-43ba-98b7-72b745f192fc)

👋 Welcome to New Lighthouse, Our Mission is to Integrate Vocational Education/Skill Development Programs into mainstream academia, providing underprivileged students with valuable skills for early employment.


## Architecture

Lighthouse is a multi-layered architecture, with each layer responsible for a specific task. The high-level architecture can be summarized as follows:

- **Frontend:** The Lighthouse frontend is a web application built with Angular. It is responsible for displaying the Lighthouse results and providing a user interface for interacting with the tool.
- **Backend:** The Lighthouse backend is a C# application built with ASP.NET. It is responsible for performing the Lighthouse audits and generating the results report.
- **API Gateway:** The API Gateway is a layer that sits between the front end and the back end. It is responsible for routing requests and responses between the two layers.
- **Database:** The Lighthouse database stores the Lighthouse results and other configuration data.
The Lighthouse architecture is designed to be scalable and extensible. The front end and back end can be scaled independently, and the API Gateway allows for new services to be easily added to the architecture.

Here you can check the New Lighthouse [Architecture](https://docs.google.com/presentation/d/1jgdvISTEu2sPxDKZ6jUHqmb5_ylz20RemXGXS9is2Fk/edit?usp=sharing) to get a better understanding.

## Installation

To set up the codebase you can follow these general steps:

1. Install the necessary software:</br>
   `Node.js`: < v16.13.2 </br>
   `NPM`: < v8.1.2 </br>
   `Visual Studio`: [https://code.visualstudio.com/](https://code.visualstudio.com/)

2. Clone the codebase from [Github](https://github.com/LAHI-Lighthoue/lighthouse-base-web.git)  to your local machine by following command-
   ```sh
   git clone https://github.com/LAHI-Lighthoue/lighthouse-base-web.git
   ```

4. Now we need to download angular Cli by running this command-
   ```sh
   npm install -g @angular/cli
   ```

6. Open a terminal in the project's root directory and run
   ```sh
   npm install
   ```
   to install the project's dependencies.

8. Now to start frontend server we just need to run the following command-
   ```sh
   ng serve
   ```

Now you can visit [http://localhost:4213/login](http://localhost:4213/login) from your browser.

