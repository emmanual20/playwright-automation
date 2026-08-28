pipeline {

    agent any

    stages {

        // ==========================================
        // 1. Checkout code from GitHub
        // ==========================================
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }


        // ==========================================
        // 2. Install npm dependencies
        // ==========================================
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm ci'
            }
        }


        // ==========================================
        // 3. Install Playwright browser
        // ==========================================
        stage('Install Playwright Browser') {
            steps {
                echo 'Installing Playwright Chromium...'
                bat 'npx playwright install chromium'
            }
        }


        // ==========================================
        // 4. Run Playwright tests
        // ==========================================
        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests...'

                bat '''
                    npx playwright test
                '''
            }
        }


        // ==========================================
        // 5. Create ZIP of Playwright report
        // ==========================================
        stage('Create Report ZIP') {
            steps {
                echo 'Creating Playwright report ZIP...'

                bat '''
                    if exist playwright-report (
                        powershell -Command "Compress-Archive -Path playwright-report -DestinationPath playwright-report.zip -Force"
                    ) else (
                        echo Playwright report folder not found
                    )
                '''
            }
        }
    }


    // ==========================================
    // POST ACTIONS
    // ==========================================
    post {

        // ------------------------------------------
        // Always execute
        // ------------------------------------------
        always {

            echo 'Archiving Playwright report...'

            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true,
                fingerprint: true
            )

            archiveArtifacts(
                artifacts: 'playwright-report.zip',
                allowEmptyArchive: true,
                fingerprint: true
            )


            // --------------------------------------
            // Send email
            // --------------------------------------
            emailext(

                to: 'emanualreeves@gmail.com',

                subject: """
                    Playwright Test Result - ${currentBuild.currentResult}
                    - Build #${env.BUILD_NUMBER}
                """,

                body: """
                    <html>

                    <body>

                        <h2>🎭 Playwright Automation Report</h2>

                        <hr>

                        <p>
                            <b>Project:</b> ${env.JOB_NAME}
                        </p>

                        <p>
                            <b>Build Number:</b> #${env.BUILD_NUMBER}
                        </p>

                        <p>
                            <b>Status:</b> ${currentBuild.currentResult}
                        </p>

                        <p>
                            <b>Build URL:</b>
                            <a href="${env.BUILD_URL}">
                                Open Jenkins Build
                            </a>
                        </p>

                        <hr>

                        <p>
                            The Playwright test execution has completed.
                        </p>

                        <p>
                            The complete Playwright HTML report
                            is attached as a ZIP file.
                        </p>

                        <hr>

                        <p>
                            <b>Jenkins Job:</b> ${env.JOB_NAME}
                        </p>

                        <p>
                            <b>Build:</b> #${env.BUILD_NUMBER}
                        </p>

                    </body>

                    </html>
                """,

                mimeType: 'text/html',

                attachmentsPattern: 'playwright-report.zip'
            )
        }


        // ------------------------------------------
        // Test passed
        // ------------------------------------------
        success {

            echo '======================================'
            echo '✅ PLAYWRIGHT TESTS PASSED'
            echo '======================================'
        }


        // ------------------------------------------
        // Test failed
        // ------------------------------------------
        failure {

            echo '======================================'
            echo '❌ PLAYWRIGHT TESTS FAILED'
            echo '======================================'
        }


        // ------------------------------------------
        // Aborted
        // ------------------------------------------
        aborted {

            echo '======================================'
            echo '⚠️ PLAYWRIGHT BUILD ABORTED'
            echo '======================================'
        }
    }
}