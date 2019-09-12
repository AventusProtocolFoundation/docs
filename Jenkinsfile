pipeline {
    agent {
        docker {
            image 'node:11.6.0'
            args '-u root'
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        TOKEN = credentials('github-adrian-token-secret-text')
        GIT_USER = "${TOKEN}:x-oauth-basic"
        USE_SSH = 'false'
        EMAIL = 'aventus@aventus.io'
    }

    stages {
        stage('Setup') {
            steps {
                sh 'cd website && yarn'
            }
        }

        stage('Publish') {
            when { branch 'master' }
            steps {
                sh 'cd website && yarn publish-gh-pages'
            }
        }
    }
}
