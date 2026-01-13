pipeline {
    agent none
    
    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        S3_BUCKET = 'taller-lectura-prod'
    }
    
    stages {
        stage('Checkout') {
            agent any
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            agent any
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }
        
        stage('Lint') {
            agent any
            steps {
                echo 'Running ESLint...'
                sh 'npm run lint'
            }
        }
        
        stage('Run Tests') {
            agent any
            steps {
                echo 'Running Jest tests...'
                sh 'npm test -- --ci --coverage'
            }
        }
        
        stage('Build Verification') {
            agent any
            steps {
                echo 'Verifying project structure...'
                sh '''
                    echo "Checking required files..."
                    test -f src/index.html || exit 1
                    test -f src/css/styles.css || exit 1
                    test -f src/js/app.js || exit 1
                    test -f src/js/carousel.js || exit 1
                    test -f src/js/downloadCounter.js || exit 1
                    test -f src/js/googleDriveDownloader.js || exit 1
                    echo "✓ All required files present"
                '''
            }
        }
        
        stage('Deploy to AWS S3') {
            agent {
                docker {
                    image 'amazon/aws-cli:latest'
                    args '-u root:root --entrypoint=""'
                    reuseNode true
                }
            }
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to AWS S3...'
                sh '''
                    echo "Starting S3 sync..."
                    aws s3 sync src/ s3://${S3_BUCKET}/ \
                        --delete \
                        --cache-control "max-age=3600" \
                        --exclude ".git/*" \
                        --exclude "node_modules/*" \
                        --exclude "tests/*" \
                        --exclude "*.md"
                    
                    echo "✓ S3 sync complete"
                    
                    # List uploaded files
                    echo "Files in S3:"
                    aws s3 ls s3://${S3_BUCKET}/ --recursive | head -10
                '''
            }
        }
    }
    
    post {
        success {
            echo ' =========================================='
            echo ' Pipeline completed successfully!'
            echo ' =========================================='
            echo ' Live Site:'
            echo '   http://taller-lectura-prod.s3-website-us-east-1.amazonaws.com'
            echo '=========================================='
        }
        failure {
            echo ' =========================================='
            echo ' Pipeline failed!'
            echo ' Check logs above for details'
            echo ' =========================================='
        }
        always {
            echo ' Cleaning up workspace...'
        }
    }
}
