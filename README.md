# Source Code Management Repo For Deployment Pipeline

Sample Node.js Application CI/CD Pipeline

This project demonstrates a streamlined deployment pipeline that leverages a containerized Node.js application and automated CI/CD using Jenkins. It addresses the common "it works on my machine" problem by ensuring consistent builds and deployments.

Repository Structure

Jenkinsfile: Defines the CI/CD pipeline stages used by Jenkins (checkout, build, test, and deploy).

Dockerfile: Contains instructions to containerize the Node.js application.

App.js: The main source code for a simple Node.js web server built with Express.

Package.json: Specifies project metadata, dependencies (such as Express), and scripts for starting the app and running tests.


Prerequisites

Docker: Install Docker Desktop.

Jenkins: Set up Jenkins (preferably running in Docker).

Git: For version control and to clone this repository.


Getting Started

1. Build and Run the Docker Container Locally

1. Build the Docker Image
Open a terminal in the project directory and run:

docker build -t sample-app:latest .


2. Run the Application Container
Start the container (mapping the internal port 3000 to host port 3000):

docker run -d --name sample-app -p 3000:3000 sample-app:latest

Visit http://localhost:3000 to see your application.



2. Set Up the Jenkins Pipeline

The Jenkinsfile defines a pipeline that:

Checks out your latest code from Git.

Builds a Docker image for your Node.js application.

Runs tests to validate the build.

Deploys the container to your environment.


To configure the Jenkins pipeline:

1. Open your Jenkins instance.


2. Create a new Pipeline job (e.g., Sample-App-Pipeline).


3. Under Pipeline script from SCM, set the SCM to Git and enter this repository’s URL.


4. Set the Script Path to Jenkinsfile.


5. Save the job and trigger a build.



3. Monitoring (Optional)

You can integrate Prometheus and Grafana to monitor application metrics. Prometheus scrapes metrics from your sample-app's /metrics endpoint (if instrumented with prom-client) and Grafana visualizes those metrics. (See the project documentation for detailed configuration.)

Application Details

App.js:
Implements a basic Express server that listens on port 3000.


Dockerfile:
Uses node:14 as the base image, copies the application files, installs dependencies, exposes port 3000, and starts the application

Jenkinsfile:
Defines the CI/CD pipeline stages


Conclusion

This project automates the entire deployment pipeline:

Terraform provisions a consistent Docker environment.

Jenkins automates the build, test, and deployment of our Node.js application.

Docker ensures the app runs the same in every environment.

Prometheus & Grafana (if integrated) provide real-time monitoring of application performance.


By integrating these tools, we eliminate environment inconsistencies and streamline the deployment.



