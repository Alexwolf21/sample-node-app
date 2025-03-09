pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
        IMAGE_NAME = "sample-app"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Use "bat" for Windows, "sh" for Linux/macOS.
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker rm -f sample-app || echo "Container not found"'
                    // Run the new container on the "my_network" Docker network
                    sh "docker run -d --name sample-app --network my_network -p 3000:3000 ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
